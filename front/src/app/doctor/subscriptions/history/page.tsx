'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/ui/custom/breadcrumb"

const subscriptionData = [
    {
        id: 1,
        plan: "Basic",
        doctor: "Admin",
        payment: "$1200",
        paymentType: "Online",
        paymentStatus: "Paid",
        date: "2024-03-19 to 2032-04-19",
        isActive: true,
    },
    {
        id: 2,
        plan: "Advanced",
        doctor: "Admin",
        payment: "$1800",
        paymentType: "Online",
        paymentStatus: "Pending",
        date: "2023-02-10 to 2024-02-10",
        isActive: false,
    },
]

export default function SubscriptionTable() {
    return (
        <div className="p-6">
            <Breadcrumb title="Subscription History" />
            <div className="p-6 space-y-6 rounded-md border bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableCaption>A list of your past subscriptions.</TableCaption>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Subscription Name</TableHead>
                            <TableHead>Doctor Name</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Payment Type</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Validity</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subscriptionData.map((sub, index) => (
                            <TableRow key={sub.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{sub.plan}</TableCell>
                                <TableCell>{sub.doctor}</TableCell>
                                <TableCell>{sub.payment}</TableCell>
                                <TableCell>{sub.paymentType}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={sub.paymentStatus === "Paid" ? "success" : "destructive"}
                                    >
                                        {sub.paymentStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>{sub.date}</TableCell>
                                <TableCell>
                                    <Badge variant={sub.isActive ? "success" : "outline"}>
                                        {sub.isActive ? "Currently Available" : "Expired"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
