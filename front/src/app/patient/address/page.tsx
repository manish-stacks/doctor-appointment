'use client';

import { Edit, Trash, Plus } from "lucide-react";

const addresses = [
    {
        id: 1,
        address: 'Marchioninistraße, Munich, Germany',
    },
];

export default function AddressPage() {
    return (
        <div className="p-6">
            <div className="min-h-screen">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Your Addresses</h2>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg inline-flex items-center transition-colors duration-200">
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Address
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>10 entries</option>
                                    <option>25 entries</option>
                                    <option>50 entries</option>
                                </select>
                            </div>
                            <div className="relative">
                                <input
                                    type="search"
                                    className="w-full sm:w-64 bg-gray-50 border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Search addresses..."
                                />
                                <svg className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {addresses.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.address}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                            <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                                                <Edit className="w-4 h-4 mr-1" />
                                                Edit
                                            </button>
                                            <button className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700">
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
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <p className="text-sm text-gray-600">
                                Showing {addresses.length} of {addresses.length} entries
                            </p>
                            <div className="flex items-center space-x-2">
                                <button disabled className="px-3 py-1 rounded-lg border border-gray-200 text-sm text-gray-400 bg-gray-50">
                                    Previous
                                </button>
                                <button className="px-3 py-1 rounded-lg bg-blue-600 text-sm text-white">1</button>
                                <button disabled className="px-3 py-1 rounded-lg border border-gray-200 text-sm text-gray-400 bg-gray-50">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
