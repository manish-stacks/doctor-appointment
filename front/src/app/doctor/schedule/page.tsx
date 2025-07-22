'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/ui/custom/breadcrumb"

type DayOfWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

const days: DayOfWeek[] = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

const scheduleData: Record<DayOfWeek, string> = {
    Sunday: "09:00 Am - 05:00 Pm",
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: ""
}

export default function SchedulePage() {
    const [selectedDay, setSelectedDay] = useState<DayOfWeek>("Sunday")

    return (
        <div className="p-4">
            <Breadcrumb title="Doctor Schedule" />
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-medium mb-4">Schedule Timings</h2>

                    <div className="flex border-b overflow-x-auto">
                        {days.map(day => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`px-4 py-2 font-medium text-sm whitespace-nowrap
                ${selectedDay === day ? 'text-black border-b-2 border-blue-500 bg-blue-50' : 'text-blue-600'}`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <div>
                            {scheduleData[selectedDay] ? (
                                <div className="bg-blue-500 text-white px-4 py-2 rounded-full inline-block text-sm font-medium">
                                    {scheduleData[selectedDay]}
                                </div>
                            ) : (
                                <div className="text-gray-500 italic">No schedule for {selectedDay}</div>
                            )}
                        </div>
                        <Button variant="destructive">
                            <span className="mr-2">✎</span> Edit Slot
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}
