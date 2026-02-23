'use client';

import { AxiosInstance } from '@/lib/helper/Axios.instance';
import { useEffect, useState } from 'react';
import Breadcrumb from '../global/breadcrumb';

export default function PaymentTable({ title, endpoint }: any) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        AxiosInstance.get(endpoint).then(res => {
            setData(res.data.data || res.data);
        });
    }, []);

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

                <table className="w-full border">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Commission</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.transactionId}</td>
                                <td>₹{item.amount}</td>
                                <td>₹{item.platformCommission}</td>
                                <td>{item.paymentStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}