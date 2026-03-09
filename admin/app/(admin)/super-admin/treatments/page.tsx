'use client';

import { useEffect, useState } from 'react';
import { AxiosInstance } from '@/lib/helper/Axios.instance';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/global/pagination';
import Breadcrumb from '@/components/global/breadcrumb';
import toast from 'react-hot-toast';

export default function TreatmentsPage() {

    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);

    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const fetchData = async () => {

        const res = await AxiosInstance.post('/treatments/list', {
            page,
            limit: 10
        });

        setData(res.data.data);
        setTotalPages(res.data.lastPage);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const handleCreate = async () => {

        await AxiosInstance.post('/treatments', {
            name,
            categoryId
        });

        toast.success('Treatment Created');

        setOpen(false);

        fetchData();
    };

    const handleEdit = async () => {

        await AxiosInstance.put(`/treatments/${editData.id}`, {
            name
        });

        toast.success('Updated');

        setOpen(false);

        fetchData();
    };

    const deleteTreatment = async (id: number) => {

        await AxiosInstance.delete(`/treatments/${id}`);

        toast.success('Deleted');

        fetchData();
    };

    const toggleStatus = async (id: number) => {
        try {
            await AxiosInstance.patch(`/treatments/${id}/toggle-status`);
            toast.success("Status Updated");
            fetchData();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="p-4">

            <Breadcrumb title="Treatments" />

            <div className="p-6 space-y-4 rounded-md border bg-white shadow-sm">

                <div className="flex justify-between">

                    <h2 className="text-2xl font-bold">Treatments</h2>

                    <Button onClick={() => {
                        setEditData(null);
                        setName('');
                        setOpen(true);
                    }}>
                        Create Treatment
                    </Button>

                </div>

                <Table>

                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>

                        {data.map((item: any) => (

                            <TableRow key={item.id}>

                                <TableCell>{item.name}</TableCell>

                                <TableCell>
                                    {item.status ? 'Active' : 'Inactive'}
                                </TableCell>

                                <TableCell className="flex gap-2">

                                    <Button size="sm" onClick={() => {
                                        setEditData(item);
                                        setName(item.name);
                                        setOpen(true);
                                    }}>
                                        Edit
                                    </Button>


                                    <button
                                        onClick={() => toggleStatus(item.id)}
                                        className={`relative w-12 h-6 rounded-full transition ${item.isActive ? "bg-green-500" : "bg-gray-400"
                                            }`}
                                    >
                                        <span
                                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${item.isActive ? "translate-x-6" : ""
                                                }`}
                                        />
                                    </button>

                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => deleteTreatment(item.id)}
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


            {/* Modal */}

            {open && (

                <div className="fixed inset-0 flex items-center justify-center bg-black/50">

                    <div className="bg-white p-6 rounded-md w-[400px] space-y-4">

                        <h3 className="text-xl font-bold">
                            {editData ? 'Edit Treatment' : 'Create Treatment'}
                        </h3>

                        <input
                            className="border w-full px-3 py-2 rounded"
                            placeholder="Treatment Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {!editData && (
                            <input
                                className="border w-full px-3 py-2 rounded"
                                placeholder="Category Id"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
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