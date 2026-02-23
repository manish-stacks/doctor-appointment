'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AxiosInstance } from '@/lib/helper/Axios.instance';
import Breadcrumb from '@/components/global/breadcrumb';

export default function AllPlansPage() {
    const [plans, setPlans] = useState([]);
    const title = "All Subscription Plans";
    const [search, setSearch] = useState('');
    const fetchPlans = async () => {
        const res = await AxiosInstance.get('/subscription');
        setPlans(res.data);
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const toggleStatus = async (id: number) => {
        await AxiosInstance.put(`/subscription/${id}/toggle`);
        fetchPlans();
    };

    const deletePlan = async (id: number) => {
        await AxiosInstance.delete(`/subscription/${id}`);
        fetchPlans();
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


                <table className="w-full border">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Validity</th>
                            <th>Appointments</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {plans.map((plan: any) => (
                            <tr key={plan.id}>
                                <td>{plan.name}</td>
                                <td>₹{plan.price}</td>
                                <td>{plan.validity} Months</td>
                                <td>{plan.totalAppointment}</td>
                                <td>{plan.isActive ? 'Active' : 'Inactive'}</td>
                                <td className="flex gap-2">
                                    <Button size="sm" onClick={() => toggleStatus(plan.id)}>
                                        Toggle
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => deletePlan(plan.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}