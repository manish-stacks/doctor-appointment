'use client'

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/ui/custom/breadcrumb"
import Pagination from "@/components/ui/custom/pagination"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye } from "lucide-react"
import { AxiosInstance } from "@/helpers/Axios.instance"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Patient {
  id: number
  totalAppointments: string
  patientEmail: string
  patientId: number
  patientName: string
  patientPhone: string
  patientUniqId: string
}
export default function PatientsPage() {

  const [patients, setPatients] = useState<Patient[]>([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false);

  const fetchPatients = async () => {
    try {
      setLoading(true)

      const res = await AxiosInstance.get(
        `/patient/my-patients?search=${search}&page=${page}`
      )

      setPatients(res.data.data || res.data)
      setTotalPages(res.data.totalPages || 1)

    } catch (error) {
      console.error("Error fetching patients:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1)
      fetchPatients()
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [search])


  useEffect(() => {
    fetchPatients()
  }, [page])


  const handleExport = async (type: "csv" | "pdf") => {
    setExporting(true);
    try {
      const res = await AxiosInstance.get(
        `/patient/export?type=${type}&search=${search}`,
        {
          responseType: "blob", 
        }
      );

      const blob = new Blob([res.data], {
        type:
          type === "csv"
            ? "text/csv"
            : "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `patients.${type}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Export failed:", error);
    }finally{
      setExporting(false);
    }
  };


  return (
    <div className="p-4">
      <Breadcrumb title="Patients" />

      <div className="p-6 space-y-6 rounded-md border bg-white shadow-sm">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>{exporting ? "Exporting..." : "Export ▼"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            placeholder="Search by name / email / mobile"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Patient</th>
                <th className="p-4">Email</th>
                <th className="p-4">Mobile</th>
                <th className="p-4 text-center">Appointments</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading && (
                <tr>
                  <td colSpan={6} className="p-6 text-center">
                    Loading patients...
                  </td>
                </tr>
              )}

              {!loading && patients.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center">
                    No patients found
                  </td>
                </tr>
              )}

              {!loading && patients.map((patient, index) => (
                <tr key={patient.patientId} className="border-t hover:bg-gray-50">

                  <td className="p-4">
                    {(page - 1) * 10 + index + 1}
                  </td>

                  <td className="p-4 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {patient.patientName?.[0] || "P"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-blue-600 font-medium">
                      {patient.patientName}{patient.patientUniqId && ` (${patient.patientUniqId})`}
                    </span>
                  </td>

                  <td className="p-4">
                    {patient.patientEmail || "-"}
                  </td>

                  <td className="p-4">
                    {patient.patientPhone || "-"}
                  </td>

                  <td className="p-4 text-center">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                      {patient.totalAppointments}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <Link href={`/doctor/patients/${patient.patientId}`} >
                      <Eye className="cursor-pointer text-blue-600 hover:scale-110 transition" />
                    </Link>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            setPage={setPage}
          />
        )}

      </div>
    </div>
  )
}
