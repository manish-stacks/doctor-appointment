'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AxiosInstance } from '@/lib/helper/Axios.instance';
import { toast } from 'sonner';
import Pagination from '../global/pagination';
import { Button } from '../ui/button';
import Breadcrumb from '../global/breadcrumb';


export default function DoctorTable({ title, filterType }: any) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        const res = await AxiosInstance.post('/doctor/list', {
            page,
            limit: 10,
            type: filterType,
        });

        setData(res.data.data);
        setTotalPages(res.data.lastPage);
    };

    useEffect(() => {
        fetchData();
    }, [page, filterType]);

    const approveDoctor = async (id: number) => {
        await AxiosInstance.put(`doctor/${id}/approve`);
        toast.success('Doctor Approved');
        fetchData();
    };

    const toggleActive = async (id: number) => {
        await AxiosInstance.put(`doctor/${id}/toggle-active`);
        toast.success('Status Updated');
        fetchData();
    };

    const togglePopular = async (id: number) => {
        await AxiosInstance.put(`/doctor/${id}/toggle-popular`);
        toast.success('Popular Updated');
        fetchData();
    };

    return (
        <div className="p-4">
            <Breadcrumb title={title} />
            <div className="p-6 space-y-4 rounded-md border bg-white shadow-sm">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{title}</h2>
                </div>

                <div className="flex justify-end">
                    <input
                        placeholder="Search by Name / Email"
                        className="border rounded px-3 py-1"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Hospital</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Approved</TableHead>
                            <TableHead>Popular</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((item: any) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.hospital?.name}</TableCell>
                                <TableCell>{item.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{item.isVerified ? 'Approved' : 'Pending'}</TableCell>
                                <TableCell>{item.isPopular ? 'Yes' : 'No'}</TableCell>
                                <TableCell className="flex gap-2">
                                    {!item.isVerified && (
                                        <Button size="sm" onClick={() => approveDoctor(item.id)}>
                                            Approve
                                        </Button>
                                    )}
                                    <Button size="sm" onClick={() => toggleActive(item.id)}>
                                        Toggle Active
                                    </Button>
                                    <Button size="sm" onClick={() => togglePopular(item.id)}>
                                        Toggle Popular
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Pagination totalPages={totalPages} page={page} setPage={setPage} />
            </div>
        </div>
    );
}