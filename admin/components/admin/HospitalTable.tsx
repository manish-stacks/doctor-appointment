'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AxiosInstance } from '@/lib/helper/Axios.instance';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import Pagination from '../global/pagination';
import Breadcrumb from '../global/breadcrumb';


export default function HospitalTable({ title, filterType }: any) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        const res = await AxiosInstance.post('/hospital/list', {
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

    const approveHospital = async (id: number) => {
        await AxiosInstance.put(`/hospital/${id}/approve`);
        toast.success('Hospital Approved');
        fetchData();
    };

    const toggleStatus = async (id: number) => {
        await AxiosInstance.put(`/hospital/${id}/toggle`);
        toast.success('Status Updated');
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
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Approved</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((item: any) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{item.isVerified ? 'Approved' : 'Pending'}</TableCell>
                                <TableCell className="flex gap-2">
                                    {!item.isVerified && (
                                        <Button size="sm" onClick={() => approveHospital(item.id)}>
                                            Approve
                                        </Button>
                                    )}
                                    <Button size="sm" variant="outline" onClick={() => toggleStatus(item.id)}>
                                        Toggle Status
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