'use client';

import { useEffect, useState } from 'react';
import { AxiosInstance } from '@/lib/helper/Axios.instance';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/global/pagination';
import Breadcrumb from '@/components/global/breadcrumb';
import toast from 'react-hot-toast';


export default function CategoriesPage() {

    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);

    const [name, setName] = useState('');
    const [image, setImage] = useState<any>(null);

    const fetchData = async () => {

        try {

            const res = await AxiosInstance.post('/categories/list', {
                page,
                limit: 10,
                search
            });

            setData(res.data.data);
            setTotalPages(res.data.lastPage);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, search]);

    const handleCreate = async () => {

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

        await AxiosInstance.post('/categories', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        toast.success('Category Created');

        setOpen(false);
        setName('');
        setImage(null);

        fetchData();
    };

    const handleEdit = async () => {

        const formData = new FormData();
        formData.append('name', name);

        if (image) {
            formData.append('image', image);
        }

        await AxiosInstance.put(`/categories/${editData.id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        toast.success('Category Updated');

        setOpen(false);
        fetchData();
    };

    const deleteCategory = async (id: number) => {

        if (!confirm("Delete this category?")) return;

        await AxiosInstance.delete(`/categories/${id}`);

        toast.success('Deleted Successfully');

        fetchData();
    };

    const openCreate = () => {
        setEditData(null);
        setName('');
        setImage(null);
        setOpen(true);
    };

    const openEdit = (item: any) => {
        setEditData(item);
        setName(item.name);
        setImage(null);
        setOpen(true);
    };

    return (
        <div className="p-4">

            <Breadcrumb title="Categories" />

            <div className="p-6 space-y-4 rounded-md border bg-white shadow-sm">

                <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-bold">Categories</h2>

                    <Button onClick={openCreate}>
                        Create Category
                    </Button>

                </div>

                {/* SEARCH */}

                <input
                    placeholder="Search category..."
                    className="border px-3 py-2 rounded w-[300px]"
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                />

                <Table>

                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>

                        {data.map((item: any) => (

                            <TableRow key={item.id}>

                                <TableCell>{item.name}</TableCell>

                                <TableCell>
                                    <img src={item.image} className="h-10" />
                                </TableCell>

                                <TableCell className="flex gap-2">

                                    <Button size="sm" onClick={() => openEdit(item)}>
                                        Edit
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => deleteCategory(item.id)}
                                    >
                                        Delete
                                    </Button>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

                <Pagination totalPages={totalPages} page={page} setPage={setPage} />

            </div>

            {/* MODAL */}

            {open && (

                <div className="fixed inset-0 flex items-center justify-center bg-black/50">

                    <div className="bg-white p-6 rounded-md w-[400px] space-y-4">

                        <h3 className="text-xl font-bold">
                            {editData ? 'Edit Category' : 'Create Category'}
                        </h3>

                        <input
                            className="border w-full px-3 py-2 rounded"
                            placeholder="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="file"
                            onChange={(e: any) => setImage(e.target.files[0])}
                        />

                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                className="h-16"
                            />
                        )}

                        <div className="flex justify-end gap-2">

                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>

                            <Button onClick={editData ? handleEdit : handleCreate}>
                                Save
                            </Button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}