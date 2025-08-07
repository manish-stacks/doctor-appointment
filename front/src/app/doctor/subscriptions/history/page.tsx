'use client'
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/ui/custom/breadcrumb";
import { AxiosInstance } from "@/helpers/Axios.instance";

interface Subscription {
    id: number;
    planName: string;
    startDate: string;
    endDate: string;
    amount: string;
    paymentType: string;
    paymentStatus: string;
    appointmentLimit: number;
    usedAppointments: number;
    status: string;
    isActive: string;
    subscription:{
        name: string;
    }
}
export default function SubscriptionTable() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const res = await AxiosInstance.get("doctor-subscription/get-all");
                setSubscriptions(res.data || []);
            } catch (error) {
                console.error("Error fetching subscriptions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);

    return (
        <div className="p-6">
            <Breadcrumb title="Subscription History" />
            <div className="p-6 space-y-6 rounded-md border bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableCaption>
                        {loading ? "Loading subscriptions..." : "A list of your past subscriptions."}
                    </TableCaption>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Subscription Name</TableHead>
                            <TableHead>Appointment</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Payment Type</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Validity</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subscriptions.length > 0 ? (
                            subscriptions.map((sub, index) => (
                                <TableRow key={sub.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{sub.subscription.name}</TableCell>
                                    <TableCell>{sub.appointmentLimit - sub.usedAppointments}</TableCell>
                                    <TableCell>{`${sub.amount}`}</TableCell>
                                    <TableCell>{sub.paymentType}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={sub.paymentStatus === "1" ? "success" : "destructive"}
                                        >
                                            {sub.paymentStatus === "1" ? "Paid" : "Unpaid"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {`${new Date(sub.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} 
                                        to 
                                        ${new Date(sub.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={sub.isActive ? "success" : "outline"}>
                                            {sub.isActive ? "Currently Available" : "Expired"}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            !loading && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center text-gray-500">
                                        No subscriptions found.
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
