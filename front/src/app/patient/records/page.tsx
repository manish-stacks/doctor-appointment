'use client';

import Breadcrumb from "@/components/patient/Breadcrumb";
import { EyeIcon } from "lucide-react";

const orders = [
    {
        id: 1,
        laboratory: 'LabCorp (Demo)',
        prescriptionImg: 'https://doctro.saasmonks.in/report_prescription/upload/6801e9d9b6964.png',
        date: '2025-04-22',
        time: '08:15 am',
        paymentType: 'COD',
        amount: 50,
        report: 'Report Not Available',
    },
    {
        id: 2,
        laboratory: 'LabCorp (Demo)',
        prescriptionImg: 'https://doctro.saasmonks.in/report_prescription/upload/6801e9d9b6964.png',
        date: '2025-04-22',
        time: '08:15 am',
        paymentType: 'COD',
        amount: 50,
        report: 'Report Not Available',
    },
    {
        id: 3,
        laboratory: 'LabCorp (Demo)',
        prescriptionImg: 'https://doctro.saasmonks.in/report_prescription/upload/6801e9d9b6964.png',
        date: '2025-04-18',
        time: '12:45 pm',
        paymentType: 'COD',
        amount: 50,
        report: 'Report Not Available',
    },
    {
        id: 4,
        laboratory: 'LabCorp (Demo)',
        prescriptionImg: 'https://doctro.saasmonks.in/report_prescription/upload/6801e9d9b6964.png',
        date: '2025-04-18',
        time: '12:45 pm',
        paymentType: 'COD',
        amount: 50,
        report: 'Report Not Available',
    },
    {
        id: 5,
        laboratory: 'Quest Diagnostics',
        prescriptionImg: '',
        date: '2025-04-16',
        time: '01:30 pm',
        paymentType: 'COD',
        amount: 1500,
        report: 'Report Not Available',
    },
];

export default function Records() {
    return (
        <div className="p-4">
            <Breadcrumb title="Records" />
            <div className="min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
                    <div className="flex justify-between mb-3" >
                        <div className="flex items-center gap-2">
                            <span>Show</span>
                            <select className="border rounded px-2 py-1">
                                <option>10</option>
                            </select>
                            <span>Entries</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Search:</span>
                            <input type="text" className="border rounded px-2 py-1" />
                        </div>
                    </div>

                    <table className="min-w-full text-sm text-gray-700">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="py-3 px-4">#</th>
                                <th className="py-3 px-4">Laboratory Name</th>
                                <th className="py-3 px-4">Prescription</th>
                                <th className="py-3 px-4">Date & Time</th>
                                <th className="py-3 px-4">Payment Type</th>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4">Report</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id} className="border-b">
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">{order.laboratory}</td>
                                    <td className="py-3 px-4">
                                        {order.prescriptionImg ? (
                                            <img
                                                src={order.prescriptionImg}
                                                alt="Prescription"
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        ) : (
                                            <span className="text-gray-400">Prescription Not Available</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div>{order.date}</div>
                                        <div className="text-blue-600">{order.time}</div>
                                    </td>
                                    <td className="py-3 px-4">{order.paymentType}</td>
                                    <td className="py-3 px-4">${order.amount.toFixed(2)}</td>
                                    <td className="py-3 px-4">{order.report}</td>
                                    <td className="py-3 px-4">
                                        <button className="flex items-center gap-2 border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white">
                                            <EyeIcon />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
