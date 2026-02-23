'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AxiosInstance } from '@/lib/helper/Axios.instance';
import { toast } from 'sonner';
import Breadcrumb from '../global/breadcrumb';
import { Button } from '../ui/button';
import Pagination from '../global/pagination';


export default function AppointmentAdminTable({ title, filterType }: any) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        const res = await AxiosInstance.post('/appointment/list', {
            page,
            limit: 10,
            type: filterType,
            search,
        });

        setData(res.data.data);
        setTotalPages(res.data.lastPage);
    };

    useEffect(() => {
        fetchData();
    }, [page, filterType]);

    const updateStatus = async (id: number, status: string) => {
        await AxiosInstance.put(`/appointment/${id}/status`, { status });
        toast.success('Status Updated');
        fetchData();
    };

    const markPaid = async (id: number) => {
        await AxiosInstance.put(`/appointment/${id}/mark-paid`);
        toast.success('Marked as Paid');
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
                            <TableHead>ID</TableHead>
                            <TableHead>Patient</TableHead>
                            <TableHead>Doctor</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((item: any) => (
                            <TableRow key={item.id}>
                                <TableCell>#{item.appointmentId}</TableCell>
                                <TableCell>{item.patientName}</TableCell>
                                <TableCell>{item.doctor?.name}</TableCell>
                                <TableCell>{item.date} {item.time}</TableCell>
                                <TableCell>{item.appointmentStatus}</TableCell>
                                <TableCell>{item.paymentStatus}</TableCell>
                                <TableCell className="flex gap-2">
                                    {item.paymentStatus !== 'Paid' && (
                                        <Button size="sm" onClick={() => markPaid(item.id)}>
                                            Mark Paid
                                        </Button>
                                    )}
                                    <Button size="sm" onClick={() => updateStatus(item.id, 'Completed')}>
                                        Complete
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => updateStatus(item.id, 'Cancelled')}>
                                        Cancel
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