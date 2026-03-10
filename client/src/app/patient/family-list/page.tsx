'use client';

import { ConfirmModal } from "@/components/ui/custom/ConfirmModal";
import Pagination from "@/components/ui/custom/pagination";
import { AxiosInstance } from "@/helpers/Axios.instance";
import { Edit, Trash, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface Family {
    id: number;
    name: string;
    age: number;
    gender: string;
    relation: string;
}


export default function FamilyPage() {
    const [family, setFamily] = useState<Family[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Family | null>(null);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(10);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const getFamily = async () => {
        const res = await AxiosInstance.get('/patient/my-family', {
            params: { page, limit, search },
        });

        setFamily(res.data.data);
        setTotalPages(res.data.totalPages);
    };

    useEffect(() => {
        getFamily();
    }, [page, search, limit]);


    const saveFamily = async (data: Omit<Family, 'id'>) => {
        if (editing) {
            await AxiosInstance.put(`/patient/my-family/${editing.id}`, data);
        } else {
            await AxiosInstance.post('/patient', data);
        }

        setOpen(false);
        setEditing(null);
        getFamily();
    };
    const deleteFamily = async () => {
        if (!deleteId) return;

        await AxiosInstance.delete(`/patient/my-family/${deleteId}`);
        setDeleteId(null);
        getFamily();
    };


    return (
        <div className="p-6">
            <div className="min-h-screen">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Family List</h2>
                    <button
                        onClick={() => {
                            setEditing(null);
                            setOpen(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg inline-flex items-center transition-colors duration-200">
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Family
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <select
                                    onChange={(e) => setLimit(parseInt(e.target.value))}
                                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value={10}>10 entries</option>
                                    <option value={25}>25 entries</option>
                                    <option value={50}>50 entries</option>
                                </select>
                            </div>
                            <div className="relative">
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="search"
                                    className="w-full sm:w-64 bg-gray-50 border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Search addresses..."
                                />
                                <svg className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relation</th>
                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {family && family.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.age}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.gender}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.relation}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                            <button
                                                onClick={() => {
                                                    setEditing(item);
                                                    setOpen(true);
                                                }}
                                                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                                                <Edit className="w-4 h-4 mr-1" />
                                                Edit
                                            </button>
                                            <button onClick={() => setDeleteId(item.id)} className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700">
                                                <Trash className="w-4 h-4 mr-1" />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 border-t border-gray-100">
                        <Pagination
                            totalPages={totalPages}
                            page={page}
                            setPage={setPage}
                        />

                    </div>
                </div>
            </div>
            {open && (
                <FamilyModal
                    initialData={editing}
                    onClose={() => setOpen(false)}
                    onSave={saveFamily}
                />
            )}
            {deleteId && (
                <ConfirmModal
                    title="Delete family member?"
                    description="Are you sure you want to delete this family member?"
                    onCancel={() => setDeleteId(null)}
                    onConfirm={deleteFamily}
                />
            )}

        </div>
    );
}


function FamilyModal({
    initialData,
    onClose,
    onSave,
}: {
    initialData: Family | null;
    onClose: () => void;
    onSave: (data: Omit<Family, 'id'>) => void;
}) {
    const [form, setForm] = useState({
        name: initialData?.name || '',
        age: initialData?.age || '',
        gender: initialData?.gender || '',
        relation: initialData?.relation || '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6">
                <h3 className="text-xl font-semibold mb-4">
                    {initialData ? 'Edit Family Member' : 'Add Family Member'}
                </h3>

                <div className="space-y-3">
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border rounded-lg px-4 py-2" />
                    <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" className="w-full border rounded-lg px-4 py-2" />
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                    >
                        <option value="" disabled>
                            Select gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <select
                        name="relation"
                        value={form.relation}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                    >
                        <option value="" disabled>
                            Select relation
                        </option>
                        <option value="Brother">Brother</option>
                        <option value="Son">Son</option>
                        <option value="Sister">Sister</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Other">Other</option>
                    </select>

                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 border rounded-lg">
                        Cancel
                    </button>
                    <button
                        disabled={!form.gender || !form.relation}
                        onClick={() => onSave(form)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
