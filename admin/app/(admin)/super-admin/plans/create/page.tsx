'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosInstance } from '@/lib/helper/Axios.instance';
import Breadcrumb from '@/components/global/breadcrumb';

export default function CreatePlanPage() {
    const router = useRouter();
    const title = "Create Subscription Plan";

    const [form, setForm] = useState({
        name: '',
        price: '',
        validity: '',
        totalAppointment: '',
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await AxiosInstance.post('/subscription', form);
        router.push('/super-admin/plans');
    };

    return (
        <div className="p-4">
            <Breadcrumb title={title} />
            <div className="p-6 space-y-4 rounded-md border bg-white shadow-sm">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{title}</h2>
                </div>

                

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input placeholder="Plan Name" className="border p-2 w-full"
                        onChange={(e) => setForm({ ...form, name: e.target.value })} />

                    <input placeholder="Price" type="number" className="border p-2 w-full"
                        onChange={(e) => setForm({ ...form, price: e.target.value })} />

                    <input placeholder="Validity (Months)" type="number" className="border p-2 w-full"
                        onChange={(e) => setForm({ ...form, validity: e.target.value })} />

                    <input placeholder="Total Appointments" type="number" className="border p-2 w-full"
                        onChange={(e) => setForm({ ...form, totalAppointment: e.target.value })} />

                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Create Plan
                    </button>
                </form>
            </div>
        </div>
    );
}