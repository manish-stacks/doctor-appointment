import Breadcrumb from '@/components/ui/custom/breadcrumb';
import { Eye } from 'lucide-react';
import React from 'react'

const Appointments = () => {
    const appointments = [
        {
            id: '#669413',
            doctorName: "Dr. Anastasia Ivanova",
            date: "2025-04-24",
            time: "11:30 Am",
            amount: "$2500.00",
            report: "Image Not Available",
            paymentStatus: "Remaining",
            status: "Cancelled"
        },
        {
            id: '#779406',
            doctorName: "Dr. Fatima Khan",
            date: "2025-04-18",
            time: "09:15 Am",
            amount: "$1900.00",
            report: "Image Not Available",
            paymentStatus: "Remaining",
            status: "Cancelled"
        },
        {
            id: '#508290',
            doctorName: "Dr. John Smith",
            date: "2025-04-18",
            time: "09:30 Am",
            amount: "$2000.00",
            report: "Image Not Available",
            paymentStatus: "Remaining",
            status: "Cancelled"
        },
        {
            id: '#317884',
            doctorName: "Dr. John Smith",
            date: "2025-04-16",
            time: "12:15 Pm",
            amount: "$2000.00",
            report: "Image Not Available",
            paymentStatus: "Paid",
            status: "Completed"
        },
        {
            id: '#761153',
            doctorName: "Dr. Maria Garcia",
            date: "2025-04-16",
            time: "10:00 Am",
            amount: "$1500.00",
            report: "Image Not Available",
            paymentStatus: "Remaining",
            status: "Cancelled"
        },
        {
            id: '#969696',
            doctorName: "Dr. Maria Garcia",
            date: "2025-04-24",
            time: "01:00 Pm",
            amount: "$1500.00",
            report: "Image Not Available",
            paymentStatus: "Remaining",
            status: "Cancelled"
        }
    ];

    return (
        <div className="p-4">
            <Breadcrumb title="Appointments" />

            {/* Search and entries section */}
            <div className="bg-white py-8 px-4 rounded-lg shadow my-6">
                <div className="flex justify-between " >
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
                <div className="overflow-x-auto mt-5">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left">#</th>
                                <th className="p-3 text-left">Appointment Id</th>
                                <th className="p-3 text-left">Report Or Patient Image</th>
                                <th className="p-3 text-left">Amount</th>
                                <th className="p-3 text-left">Doctor Name</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Payment Status</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">View Appointment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <tr key={appointment.id} className="border-b">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{appointment.id}</td>
                                    <td className="p-3">{appointment.report}</td>
                                    <td className="p-3">{appointment.amount}</td>
                                    <td className="p-3">{appointment.doctorName}</td>
                                    <td className="p-3">
                                        <div>{appointment.date}</div>
                                        <div className="text-blue-400">{appointment.time}</div>
                                    </td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded ${appointment.paymentStatus === "Remaining" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"
                                            }`}>
                                            {appointment.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded ${appointment.status === "Cancelled" ? "bg-red-100 text-red-500" : "bg-gray-100"
                                            }`}>
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <Eye size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Appointments