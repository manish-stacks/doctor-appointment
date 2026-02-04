"use client";
import Receipt from '@/components/Receipt';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/ui/custom/breadcrumb';
import Pagination from '@/components/ui/custom/pagination';
import { AxiosInstance } from '@/helpers/Axios.instance';
import { AppointmentDetails } from '@/types/appointment';
import { Download, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';



type PaymentStatus = 'Remaining' | 'Paid';
type AppointmentStatus = 'Available' | 'Booked' | 'Hold' | 'Approved' | 'Rescheduled' | 'Completed' | 'CancelledByUser' | 'Cancelled' | 'CancelledByDoctor';



const statusBadge: Record<PaymentStatus | AppointmentStatus, string> = {
    Available: 'bg-green-100 text-green-600',
    Booked: 'bg-blue-100 text-blue-600',
    Hold: 'bg-yellow-100 text-yellow-600',
    Approved: 'bg-purple-100 text-purple-600',
    Rescheduled: 'bg-orange-100 text-orange-600',
    Completed: 'bg-gray-100 text-gray-800',
    CancelledByUser: 'bg-red-100 text-red-600',
    Cancelled: 'bg-red-100 text-red-600',
    CancelledByDoctor: 'bg-red-100 text-red-600',
    Remaining: 'bg-red-100 text-red-600',
    Paid: 'bg-green-100 text-green-600',
};


const Appointments = () => {
    const router = useRouter();
    const [appointments, setAppointments] = useState<AppointmentDetails[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetails>();

    const fetchAppointments = async () => {
        const res = await AxiosInstance.post('/appointment/patient/appointments', {
            page,
            limit: 10,
            search,
        });

        setAppointments(res.data.data);
        setTotalPages(res.data.lastPage);
    };
    useEffect(() => {
        fetchAppointments();
    }, [page, search]);


    const handleDownload = (appointment: AppointmentDetails) => {
        setSelectedAppointment(appointment);

        setTimeout(() => {
            const printArea = document.getElementById("print-area");
            if (!printArea) return;

            const original = document.body.innerHTML;
            document.body.innerHTML = printArea.innerHTML;
            window.print();
            document.body.innerHTML = original;
            window.location.reload();
        }, 300);
    };
    const handleToChange = async (status: string, id: number) => {
        try {
            await AxiosInstance.put(`/appointment/${id}/status`, {
                status,
            });
            toast.success("Appointment status updated successfully.");
            fetchAppointments();
        } catch (error) {
            toast.error("Failed to update appointment status.");
            console.error("Error updating appointment status:", error);
            return;
        }

    }


    return (
        <>
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
                            <input
                                type="text"
                                placeholder="Search by Doctor / ID / Status"
                                className="border rounded px-2 py-1"
                                onChange={(e) => setSearch(e.target.value)}
                            />

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
                                        <td className="p-3">#{appointment?.appointmentId}</td>
                                        <td className="p-3 flex items-center gap-2">
                                            {appointment?.images && appointment.images.length > 0 ? (
                                                appointment.images.map((img, index) => (
                                                    <a key={index} href={img} target="_blank" download>
                                                        <img src={img} className="h-10 border" />
                                                    </a>
                                                ))
                                            ) : (
                                                "No Image Uploaded"
                                            )}
                                        </td>
                                        <td className="p-3">₹{appointment.finalAmount}</td>
                                        <td className="p-3">Dr. {appointment.doctor?.name}</td>
                                        <td className="p-3">
                                            <div>{appointment.date}</div>
                                            <div className="text-blue-400">{appointment.time}</div>
                                        </td>
                                        <td className="p-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge[appointment?.paymentStatus]}`}>
                                                {appointment.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge[appointment?.appointmentStatus]}`}>
                                                {appointment.appointmentStatus}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => router.push(`/patient/appointments/${appointment.appointmentId}`)}
                                                    className="px-3 py-1 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>

                                                <button
                                                    onClick={() => handleDownload(appointment)}
                                                    className="px-3 py-1 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                                >
                                                    <Download className="w-5 h-5" />
                                                </button>
                                                {
                                                    appointment.appointmentStatus !== 'CancelledByUser' && appointment.appointmentStatus !== 'Cancelled' && appointment.appointmentStatus !== 'Completed' && appointment.appointmentStatus !== 'CancelledByDoctor' && appointment.appointmentStatus !== 'Approved' && (
                                                        <>
                                                            <Button
                                                                onClick={() => handleToChange("CancelledByUser", appointment.id)}
                                                                variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                                ✖ Cancel
                                                            </Button>
                                                        </>
                                                    )
                                                }

                                            </div>
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* pagination */}
                    <Pagination totalPages={totalPages} page={page} setPage={setPage} />

                </div>

            </div>
            <div className="hidden">
                {selectedAppointment && <Receipt booking={selectedAppointment} />}
            </div>
            
        </>
    )
}

export default Appointments