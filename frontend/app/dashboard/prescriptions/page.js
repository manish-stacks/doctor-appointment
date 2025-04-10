import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

export default function PrescriptionsPage() {
  // Sample prescription data
  const prescriptions = [
    {
      id: 1,
      patient: "Alice Johnson",
      medication: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times daily",
      duration: "7 days",
      date: "Mar 10, 2023",
    },
    {
      id: 2,
      patient: "Bob Smith",
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "30 days",
      date: "Mar 8, 2023",
    },
    {
      id: 3,
      patient: "Carol Williams",
      medication: "Albuterol",
      dosage: "90mcg",
      frequency: "As needed",
      duration: "30 days",
      date: "Mar 5, 2023",
    },
    {
      id: 4,
      patient: "David Brown",
      medication: "Ibuprofen",
      dosage: "400mg",
      frequency: "3 times daily",
      duration: "10 days",
      date: "Mar 1, 2023",
    },
    {
      id: 5,
      patient: "Eve Davis",
      medication: "Sumatriptan",
      dosage: "50mg",
      frequency: "As needed",
      duration: "30 days",
      date: "Feb 28, 2023",
    },
    {
      id: 6,
      patient: "Frank Miller",
      medication: "Cyclobenzaprine",
      dosage: "10mg",
      frequency: "3 times daily",
      duration: "14 days",
      date: "Feb 25, 2023",
    },
    {
      id: 7,
      patient: "Grace Wilson",
      medication: "Alprazolam",
      dosage: "0.5mg",
      frequency: "Twice daily",
      duration: "14 days",
      date: "Feb 20, 2023",
    },
    {
      id: 8,
      patient: "Henry Taylor",
      medication: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      duration: "30 days",
      date: "Feb 15, 2023",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Prescriptions</h1>
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search prescriptions..." className="pl-8" />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Prescription
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prescription History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Patient</th>
                  <th className="text-left py-3 px-4 font-medium">Medication</th>
                  <th className="text-left py-3 px-4 font-medium">Dosage</th>
                  <th className="text-left py-3 px-4 font-medium">Frequency</th>
                  <th className="text-left py-3 px-4 font-medium">Duration</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription) => (
                  <tr key={prescription.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">{prescription.patient.charAt(0)}</span>
                        </div>
                        <span className="font-medium">{prescription.patient}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{prescription.medication}</td>
                    <td className="py-3 px-4">{prescription.dosage}</td>
                    <td className="py-3 px-4">{prescription.frequency}</td>
                    <td className="py-3 px-4">{prescription.duration}</td>
                    <td className="py-3 px-4">{prescription.date}</td>
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

