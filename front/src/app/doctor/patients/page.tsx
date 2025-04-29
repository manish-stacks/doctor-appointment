'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { Eye, Pencil, Trash2, CalendarPlus } from "lucide-react"
import Breadcrumb from "@/components/Breadcrumb"

const patients = [
    {
        id: 1,
        name: "Vincent Patient",
        email: "Confidential",
        status: true,
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        id: 2,
        name: "Premium Patient",
        email: "Confidential",
        status: true,
        avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    }
]

export default function PatientsPage() {
    const [search, setSearch] = useState("")

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-4">
            <Breadcrumb title="Patients" />

            <div className="p-6 space-y-6 rounded-md border bg-white shadow-sm overflow-hidden">
                <div className="flex justify-end items-end">
                    <Button variant="link" size="sm" className="flex items-center gap-2" >Add New</Button>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <Button>Export</Button>
                    </div>
                    <Input
                        placeholder="Search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-64"
                    />
                </div>

                <div className="overflow-x-auto rounded-md border">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-4"><input type="checkbox" /></th>
                                <th className="p-4">#</th>
                                <th className="p-4">User Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((patient, index) => (
                                <tr key={patient.id} className="border-t">
                                    <td className="p-4"><input type="checkbox" /></td>
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4 flex items-center gap-2">
                                        <Avatar>
                                            <AvatarImage src={patient.avatar} />
                                            <AvatarFallback>{patient.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-blue-600">{patient.name}</span>
                                    </td>
                                    <td className="p-4">{patient.email}</td>
                                    <td className="p-4">
                                        <Switch checked={patient.status} />
                                    </td>
                                    <td className="p-4 flex gap-2 text-blue-600">
                                        <Eye className="cursor-pointer" />
                                        <Pencil className="cursor-pointer text-green-600" />
                                        <Trash2 className="cursor-pointer text-red-600" />
                                        <CalendarPlus className="cursor-pointer" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600">
                    <div>Showing 1 to {filteredPatients.length} of {patients.length} entries</div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationLink isActive>1</PaginationLink>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}
