'use client'
import { useEffect, useState } from "react";
import {
    Table, TableBody, TableCaption, TableCell,
    TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/ui/custom/breadcrumb";
import { AxiosInstance } from "@/helpers/Axios.instance";
import Pagination from "@/components/ui/custom/pagination";

interface Subscription {
    id: number;
    startDate: string;
    endDate: string;
    amount: string;
    paymentType: string;
    paymentStatus: string;
    appointmentLimit: number;
    usedAppointments: number;
    isActive: boolean;
    subscription: {
        name: string;
    };
}

export default function SubscriptionTable() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 10;

    useEffect(() => {
        fetchSubscriptions();
    }, [page]);

    const fetchSubscriptions = async () => {
        setLoading(true);
        try {
            const res = await AxiosInstance.get(
                `doctor-subscription/get-all?page=${page}&limit=${limit}`
            );

            setSubscriptions(res.data.data || []);
            setTotalPages(res.data.meta.totalPages || 1);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <Breadcrumb title="Subscription History" />

            <div className="p-6 space-y-6 rounded-md border bg-white shadow-sm overflow-hidden">
                <Table>


                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Subscription Name</TableHead>
                            <TableHead>Appointments Left</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Payment Type</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Validity</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {subscriptions.length ? (
                            subscriptions.map((sub, index) => (
                                <TableRow key={sub.id}>
                                    <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                                    <TableCell>{sub.subscription.name}</TableCell>
                                    <TableCell>
                                        {sub.appointmentLimit - sub.usedAppointments}
                                    </TableCell>
                                    <TableCell>
                                        {Number(sub.amount) === 0 ? "Free" : `₹${sub.amount}`}
                                    </TableCell>
                                    <TableCell className=" capitalize">{sub.paymentType}</TableCell>
                                    <TableCell>
                                        <Badge variant={sub.paymentStatus == "1" ? "success" : "destructive"}>
                                            {sub.paymentStatus == "1" ? "Paid" : "Unpaid"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(sub.startDate).toLocaleDateString()} –{" "}
                                        {new Date(sub.endDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={sub.isActive ? "success" : "outline"}>
                                            {sub.isActive ? "Active" : "Expired"}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            !loading && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center text-gray-500">
                                        No subscriptions found
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>

                <Pagination
                    totalPages={totalPages}
                    page={page}
                    setPage={setPage}
                />
            </div>
        </div>
    );
}
