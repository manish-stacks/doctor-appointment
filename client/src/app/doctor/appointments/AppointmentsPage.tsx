'use client';

import { Calendar, Download, Eye } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Breadcrumb from '@/components/ui/custom/breadcrumb';
import { AppointmentDetails } from '@/types/appointment';
import { useEffect, useState } from 'react';
import { AxiosInstance } from '@/helpers/Axios.instance';
import { useRouter, useSearchParams } from 'next/navigation';

import Pagination from '@/components/ui/custom/pagination';
import toast from 'react-hot-toast';
import { ConfirmModal } from '@/components/ui/custom/ConfirmModal';
import { generateReceiptPdf } from '@/helpers/generateReceipt';
import { generatePrescriptionPdf } from '@/helpers/generatePrescriptionPdf';

export type PaymentStatus = 'Remaining' | 'Paid';
export type AppointmentStatus = 'Available' | 'Booked' | 'Hold' | 'Approved' | 'Rescheduled' | 'Completed' | 'CancelledByUser' | 'Cancelled' | 'CancelledByDoctor';


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



export default function AppointmentsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const patientId = searchParams.get("patientId");
    const [appointments, setAppointments] = useState<AppointmentDetails[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<() => void>(() => { });
    const [confirmTitle, setConfirmTitle] = useState("");
    const [confirmDescription, setConfirmDescription] = useState("");


    const fetchAppointments = async () => {
        const res = await AxiosInstance.post('/appointment/doctor/appointments', {
            page,
            limit: 10,
            search,
            patientId: patientId || '',
        });

        setAppointments(res.data.data);
        setTotalPages(res.data.lastPage);
    };
    useEffect(() => {
        fetchAppointments();
    }, [page, search, patientId]);


    const handleToChange = (status: AppointmentStatus, id: number) => {

        setConfirmTitle(`Change Status to ${status}?`);
        setConfirmDescription(`Are you sure you want to change appointment status to ${status}?`);

        setConfirmAction(() => async () => {
            try {
                await AxiosInstance.put(`/appointment/${id}/status`, { status });
                toast.success("Appointment status updated successfully.");
                fetchAppointments();
            } catch (error) {
                toast.error("Failed to update appointment status.");
                console.error(error);
            } finally {
                setConfirmOpen(false);
            }
        });

        setConfirmOpen(true);
    };



    return (
        <div className="p-4">
            <Breadcrumb title="Appointments" />
            <div className="p-6 space-y-4 rounded-md border bg-white shadow-sm overflow-hidden">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>

                </div>
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

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>Export ▼</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div >
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100 text-left">
                                <TableHead className="w-[50px]">#</TableHead>
                                <TableHead>Appointment ID</TableHead>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Patient Image</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                                <TableHead>View</TableHead>
                                <TableHead>Prescription</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>#{item?.appointmentId}</TableCell>
                                    <TableCell>{item?.patientName}</TableCell>
                                    <TableCell className="text-gray-500 italic flex items-center gap-2">
                                        {item.images && item.images.length > 0 ? (
                                            item.images.map((img, index) => (
                                                <a key={index} href={img} target="_blank" download>
                                                    <img src={img} className="h-10 border" />
                                                </a>
                                            ))
                                        ) : (
                                            "No Image Uploaded"
                                        )}
                                    </TableCell>
                                    <TableCell>₹{item.finalAmount}</TableCell>
                                    <TableCell>
                                        <div>{item.date}</div>
                                        <div className="text-xs text-gray-500">{item.time}</div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge[item?.paymentStatus]}`}>
                                            {item.paymentStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge[item?.appointmentStatus]}`}>
                                            {item.appointmentStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            item.appointmentStatus === "Booked" || item.appointmentStatus === "Hold" ? (
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => handleToChange("Approved", item.id)}
                                                        variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                                                        ✔ Accept
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleToChange("CancelledByDoctor", item.id)}
                                                        variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                        ✖ Cancel
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleToChange("Rescheduled", item.id)}
                                                        variant="outline" size="sm" className="text-purple-600 hover:text-purple-700">
                                                        <Calendar /> Reschedule
                                                    </Button>
                                                </div>
                                            ) : item.appointmentStatus === "Approved" ? (
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => handleToChange("Completed", item.id)}
                                                        variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                                                        ✔ Complete
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleToChange("Rescheduled", item.id)}
                                                        variant="outline" size="sm" className="text-purple-600 hover:text-purple-700">
                                                        <Calendar /> Reschedule
                                                    </Button>
                                                </div>
                                            ) : (
                                                "No Actions Available"
                                            )}

                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => router.push(`/doctor/appointments/${item.appointmentId}`)} variant="ghost" size="icon" className='cursor-pointer'>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button onClick={() => generateReceiptPdf(item)} variant="ghost" size="icon" className='cursor-pointer'>
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            item?.prescriptions && item?.prescriptions.length > 0 ? (
                                                <Button variant="link" size="sm" onClick={() => generatePrescriptionPdf(item, item.prescriptions)}>
                                                    Show Prescription
                                                </Button>
                                            ) : (
                                                "No Prescription Uploaded"
                                            )
                                        }

                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Pagination totalPages={totalPages} page={page} setPage={setPage} />
            </div>


            {
                confirmOpen &&
                <ConfirmModal
                    variant="info"
                    title={confirmTitle}
                    description={confirmDescription}
                    onConfirm={confirmAction}
                    onCancel={() => setConfirmOpen(false)}
                    confirmLabel="Yes"
                    cancelLabel="Cancel"
                />
            }


        </div>
    );
}
