'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, DollarSign, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid dark:bg-black gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <Users className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Patients</p>
                  <h3 className="text-2xl font-bold">248</h3>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Clock className="h-6 w-6 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg. Consultation</p>
                  <h3 className="text-2xl font-bold">24 min</h3>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-yellow-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Revenue (Month)</p>
                  <h3 className="text-2xl font-bold">$12,450</h3>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Appointments</h2>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>You have 8 upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">{String.fromCharCode(65 + i)}</span>
                      </div>
                      <div>
                        <p className="font-medium">Patient {String.fromCharCode(65 + i)}</p>
                        <p className="text-sm text-gray-500">General Checkup</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Tomorrow</p>
                      <p className="text-sm text-gray-500">{9 + i}:00 AM</p>
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
              <CardDescription>You have 12 appointments today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">{String.fromCharCode(69 + i)}</span>
                      </div>
                      <div>
                        <p className="font-medium">Patient {String.fromCharCode(69 + i)}</p>
                        <p className="text-sm text-gray-500">Follow-up</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Today</p>
                      <p className="text-sm text-gray-500">{1 + i}:00 PM</p>
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
              <CardDescription>You had 24 appointments this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">{String.fromCharCode(73 + i)}</span>
                      </div>
                      <div>
                        <p className="font-medium">Patient {String.fromCharCode(73 + i)}</p>
                        <p className="text-sm text-gray-500">Consultation</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Yesterday</p>
                      <p className="text-sm text-gray-500">{10 + i}:00 AM</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>You have 248 registered patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">{String.fromCharCode(77 + i)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Patient {String.fromCharCode(77 + i)}</p>
                    <p className="text-sm text-gray-500">Last visit: {i + 1} days ago</p>
                  </div>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {["Cardiology", "Checkup", "Follow-up", "Emergency"][i]}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Prescriptions</CardTitle>
            <CardDescription>You wrote 36 prescriptions this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">{String.fromCharCode(81 + i)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Patient {String.fromCharCode(81 + i)}</p>
                    <p className="text-sm text-gray-500">
                      {["Amoxicillin", "Lisinopril", "Metformin", "Atorvastatin"][i]}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">{i + 1} days ago</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

