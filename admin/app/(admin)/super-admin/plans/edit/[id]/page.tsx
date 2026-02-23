'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AxiosInstance } from '@/lib/helper/Axios.instance';
import Breadcrumb from '@/components/global/breadcrumb';

export default function EditPlanPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<any>({});
  const title = "Edit Subscription Plan";
  useEffect(() => {
    AxiosInstance.get('/subscriptions')
      .then(res => {
        const plan = res.data.find((p: any) => p.id == id);
        setForm(plan);
      });
  }, []);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    await AxiosInstance.put(`/subscription/${id}`, form);
    router.push('/super-admin/plans');
  };

  return (
    <div className="p-4">
      <Breadcrumb title={title} />
      <div className="p-6 space-y-4 rounded-md border bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>


        <form onSubmit={handleUpdate} className="space-y-4">
          <input value={form.name || ''} className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <input type="number" value={form.price || ''} className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, price: e.target.value })} />

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Update Plan
          </button>
        </form>
      </div>
    </div>
  );
}