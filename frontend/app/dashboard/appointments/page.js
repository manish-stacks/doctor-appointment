import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Plus } from "lucide-react"

export default function AppointmentsPage() {
    // Sample appointment data
    const appointments = [
        {
            id: 1,
            patient: "Alice Johnson",
            type: "General Checkup",
            date: "Today",
            time: "9:00 AM",
            status: "Confirmed",
        },
        {
            id: 2,
            patient: "Bob Smith",
            type: "Follow-up",
            date: "Today",
            time: "10:30 AM",
            status: "Checked In",
        },
        {
            id: 3,
            patient: "Carol Williams",
            type: "Consultation",
            date: "Today",
            time: "1:00 PM",
            status: "Waiting",
        },
        {
            id: 4,
            patient: "David Brown",
            type: "Emergency",
            date: "Today",
            time: "3:30 PM",
            status: "Confirmed",
        },
        {
            id: 5,
            patient: "Eve Davis",
            type: "General Checkup",
            date: "Tomorrow",
            time: "9:00 AM",
            status: "Confirmed",
        },
        {
            id: 6,
            patient: "Frank Miller",
            type: "Follow-up",
            date: "Tomorrow",
            time: "11:00 AM",
            status: "Confirmed",
        },
        {
            id: 7,
            patient: "Grace Wilson",
            type: "Consultation",
            date: "Tomorrow",
            time: "2:00 PM",
            status: "Confirmed",
        },
        {
            id: 8,
            patient: "Henry Taylor",
            type: "General Checkup",
            date: "Mar 15, 2023",
            time: "10:00 AM",
            status: "Confirmed",
        },
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case "Confirmed":
                return "bg-blue-100 text-blue-800"
            case "Checked In":
                return "bg-green-100 text-green-800"
            case "Waiting":
                return "bg-yellow-100 text-yellow-800"
            case "Completed":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Appointments</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Appointment
                </Button>
            </div>

            <Tabs defaultValue="all">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Appointments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {appointments.map((appointment) => (
                                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-lg font-medium text-gray-600">{appointment.patient.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">{appointment.patient}</p>
                                                <p className="text-sm text-gray-500">{appointment.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                                                    <p className="text-sm text-gray-500">{appointment.date}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                                    <p className="text-sm text-gray-500">{appointment.time}</p>
                                                </div>
                                            </div>
                                            <div
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                                            >
                                                {appointment.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="today" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Today's Appointments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {appointments
                                    .filter((appointment) => appointment.date === "Today")
                                    .map((appointment) => (
                                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-lg font-medium text-gray-600">{appointment.patient.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium">{appointment.patient}</p>
                                                    <p className="text-sm text-gray-500">{appointment.type}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="text-right">
                                                    <div className="flex items-center">
                                                        <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                                        <p className="text-sm text-gray-500">{appointment.time}</p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                                                >
                                                    {appointment.status}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="upcoming" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Appointments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {appointments
                                    .filter((appointment) => appointment.date !== "Today" && appointment.status !== "Completed")
                                    .map((appointment) => (
                                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-lg font-medium text-gray-600">{appointment.patient.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium">{appointment.patient}</p>
                                                    <p className="text-sm text-gray-500">{appointment.type}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="text-right">
                                                    <div className="flex items-center">
                                                        <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                                                        <p className="text-sm text-gray-500">{appointment.date}</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                                        <p className="text-sm text-gray-500">{appointment.time}</p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                                                >
                                                    {appointment.status}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="past" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Past Appointments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-10 text-gray-500">No past appointments to display</div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

