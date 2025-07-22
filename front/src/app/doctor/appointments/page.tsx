'use client';

import { Eye } from 'lucide-react';
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

type PaymentStatus = 'Remaining' | 'Paid';
type AppointmentStatus = 'Cancelled' | 'Completed' | 'Approved';

type Appointment = {
    id: string;
    amount: string;
    date: string;
    time: string;
    paymentStatus: PaymentStatus;
    status: AppointmentStatus;
};

const appointments: Appointment[] = [
    {
        id: '#508290',
        amount: '$2000.00',
        date: '2025-04-18',
        time: '09:30 AM',
        paymentStatus: 'Remaining',
        status: 'Cancelled',
    },
    {
        id: '#317884',
        amount: '$2000.00',
        date: '2025-04-16',
        time: '12:15 PM',
        paymentStatus: 'Paid',
        status: 'Completed',
    },
    {
        id: '#227812',
        amount: '$2000.00',
        date: '2025-04-23',
        time: '10:45 AM',
        paymentStatus: 'Paid',
        status: 'Completed',
    },
    {
        id: '#182319',
        amount: '$2000.00',
        date: '2025-04-14',
        time: '11:30 AM',
        paymentStatus: 'Remaining',
        status: 'Approved',
    },
];

const statusBadge: Record<PaymentStatus | AppointmentStatus, string> = {
    Remaining: 'bg-red-100 text-red-600',
    Paid: 'bg-green-100 text-green-600',
    Cancelled: 'bg-pink-100 text-pink-600',
    Completed: 'bg-gray-100 text-gray-800',
    Approved: 'bg-blue-100 text-blue-600',
};

export default function AppointmentTable() {
    return (
        <div className="p-4">
            <Breadcrumb title="Appointments" />
            <div className="p-6 space-y-4 rounded-md border bg-white shadow-sm overflow-hidden">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
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

                <div >
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100 text-left">
                                <TableHead className="w-[50px]">#</TableHead>
                                <TableHead>Appointment ID</TableHead>
                                <TableHead>Patient Image</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                                <TableHead>View</TableHead>
                                <TableHead>Prescription</TableHead>
                                <TableHead>Zoom</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell className="text-gray-500 italic">No Image</TableCell>
                                    <TableCell>{item.amount}</TableCell>
                                    <TableCell>
                                        <div>{item.date}</div>
                                        <div className="text-xs text-gray-500">{item.time}</div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge[item.paymentStatus]}`}>
                                            {item.paymentStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge[item.status]}`}>
                                            {item.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                                                ✔ Accept
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                ✖ Cancel
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="link" size="sm">
                                            Show Prescription
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="link" size="sm">
                                            Create Meeting
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
