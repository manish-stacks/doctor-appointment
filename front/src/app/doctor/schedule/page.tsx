'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/ui/custom/breadcrumb"
import { Input } from "@/components/ui/input"
import { AxiosInstance } from "@/helpers/Axios.instance"
import toast from "react-hot-toast"


type DayOfWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

const days: DayOfWeek[] = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

export default function SchedulePage() {
    const [selectedDay, setSelectedDay] = useState<DayOfWeek>("Sunday")
    const [schedule, setSchedule] = useState<Record<DayOfWeek, string>>({
        Sunday: "",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: "",
    })
    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState("")

    // ✅ Fetch schedule on mount
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const res = await AxiosInstance.get('/time-slot')
                if (res.data) {
                    setSchedule(res.data)
                }
            } catch (err) {
                console.error("Failed to load schedule:", err)
                toast.error("Failed to load schedule.")
            }
        }
        fetchSchedule()
    }, [])

    const handleEditClick = async () => {
        if (isEditing) {
            const updated = inputValue.trim()
            try {
                const updatedSchedule = {
                    ...schedule,
                    [selectedDay]: updated
                }
                // Optionally, send update to server
                await AxiosInstance.put('/time-slot', {
                    day: selectedDay,
                    time: updated
                })
                setSchedule(updatedSchedule)
                toast.success("Schedule updated successfully")
            } catch (err) {
                toast.error("Update failed")
                console.error(err)
            }
        } else {
            setInputValue(schedule[selectedDay])
        }
        setIsEditing(!isEditing)
    }

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
                                onClick={() => {
                                    setSelectedDay(day)
                                    setIsEditing(false)
                                }}
                                className={`px-4 py-2 font-medium text-sm whitespace-nowrap
                                ${selectedDay === day ? 'text-black border-b-2 border-blue-500 bg-blue-50' : 'text-blue-600'}`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <div>
                            {isEditing ? (
                                <Input
                                    className="w-[250px]"
                                    placeholder="e.g. 10:00 AM - 4:00 PM"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                            ) : schedule[selectedDay] ? (
                                <div className="bg-blue-500 text-white px-4 py-2 rounded-full inline-block text-sm font-medium">
                                    {schedule[selectedDay]}
                                </div>
                            ) : (
                                <div className="text-gray-500 italic">No schedule for {selectedDay}</div>
                            )}
                        </div>
                        <Button variant={isEditing ? "default" : "destructive"} onClick={handleEditClick}>
                            {isEditing ? "💾 Save" : "✎ Edit Slot"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
