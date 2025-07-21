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
import Breadcrumb from "@/components/Breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { userDetails, useUserStore } from "@/store/useUserStore"
import { AxiosInstance } from "@/helpers/Axios.instance"

type Hospital = {
  id: number
  name: string
  phone: string
  address: string
  facility: string
  isVerified: number
  isActive: number
}

interface formData {
  name: string
  phone: string
  address: string
  facility: string
  userId?: number
}

export default function Hospitals() {
  const getUserDetails = useUserStore((state) => state.getUserDetails)
  const [userdata, setUserData] = useState<userDetails | null>(null)
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [formData, setFormData] = useState<formData>({
    name: "",
    phone: "",
    address: "",
    facility: ""
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchHospitals = async (userId: string | number) => {
    try {
      const response = await AxiosInstance.get(`/hospital/myHospitals/${userId}`);
      setHospitals(response.data || [])
    } catch (error) {
      console.error("Failed to fetch hospitals", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userdata) return

    try {
      const payload = { ...formData, userId: Number(userdata.id) }
      await AxiosInstance.post('/hospital', payload)
      fetchHospitals(userdata.id)
      setFormData({ name: "", phone: "", address: "", facility: "" }) // Reset form
      setIsDialogOpen(false) // ✅ Close modal
    } catch (error) {
      console.error("Failed to add hospital", error)
    }
  }

  useEffect(() => {
    const details = getUserDetails()
    setUserData(details)
    if (details?.id) {
      fetchHospitals(details.id)
    }
  }, [getUserDetails])

  return (
    <div className="p-6">
      <Breadcrumb title="Hospitals" />
      <div className="p-6 space-y-6 rounded-md border bg-white shadow-sm overflow-hidden">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 text-white rounded-full text-sm font-medium">
              Add Hospital
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Hospital</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="facility">No. of Facilities</Label>
                <Input
                  id="facility"
                  value={formData.facility}
                  onChange={(e) => setFormData({ ...formData, facility: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Table>
          <TableCaption>A list of your hospitals.</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>No of Facility</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hospitals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                  No hospitals found.
                </TableCell>
              </TableRow>
            ) : (
              hospitals.map((sub, index) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{sub.name}</TableCell>
                  <TableCell>{sub.phone}</TableCell>
                  <TableCell>{sub.address}</TableCell>
                  <TableCell>{sub.facility}</TableCell>
                  <TableCell>
                    <Badge variant={sub.isVerified === 1 ? "success" : "destructive"}>
                      {sub.isVerified === 1 ? "Verified" : "Not Verified"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={sub.isActive ? "success" : "outline"}>
                      {sub.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
