import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

export default function PatientsPage() {
  // Sample patient data
  const patients = [
    {
      id: 1,
      name: "Alice Johnson",
      age: 42,
      gender: "Female",
      phone: "(555) 123-4567",
      lastVisit: "Mar 10, 2023",
      condition: "Hypertension",
    },
    {
      id: 2,
      name: "Bob Smith",
      age: 35,
      gender: "Male",
      phone: "(555) 234-5678",
      lastVisit: "Mar 8, 2023",
      condition: "Diabetes",
    },
    {
      id: 3,
      name: "Carol Williams",
      age: 28,
      gender: "Female",
      phone: "(555) 345-6789",
      lastVisit: "Mar 5, 2023",
      condition: "Asthma",
    },
    {
      id: 4,
      name: "David Brown",
      age: 50,
      gender: "Male",
      phone: "(555) 456-7890",
      lastVisit: "Mar 1, 2023",
      condition: "Arthritis",
    },
    {
      id: 5,
      name: "Eve Davis",
      age: 33,
      gender: "Female",
      phone: "(555) 567-8901",
      lastVisit: "Feb 28, 2023",
      condition: "Migraine",
    },
    {
      id: 6,
      name: "Frank Miller",
      age: 45,
      gender: "Male",
      phone: "(555) 678-9012",
      lastVisit: "Feb 25, 2023",
      condition: "Back Pain",
    },
    {
      id: 7,
      name: "Grace Wilson",
      age: 38,
      gender: "Female",
      phone: "(555) 789-0123",
      lastVisit: "Feb 20, 2023",
      condition: "Anxiety",
    },
    {
      id: 8,
      name: "Henry Taylor",
      age: 55,
      gender: "Male",
      phone: "(555) 890-1234",
      lastVisit: "Feb 15, 2023",
      condition: "High Cholesterol",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Patients</h1>
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search patients..." className="pl-8" />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Age</th>
                  <th className="text-left py-3 px-4 font-medium">Gender</th>
                  <th className="text-left py-3 px-4 font-medium">Phone</th>
                  <th className="text-left py-3 px-4 font-medium">Last Visit</th>
                  <th className="text-left py-3 px-4 font-medium">Condition</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">{patient.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium">{patient.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{patient.age}</td>
                    <td className="py-3 px-4">{patient.gender}</td>
                    <td className="py-3 px-4">{patient.phone}</td>
                    <td className="py-3 px-4">{patient.lastVisit}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {patient.condition}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

