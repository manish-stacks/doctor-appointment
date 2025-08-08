'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/ui/custom/breadcrumb"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/custom/dialog"
import { Trash2 } from "lucide-react"
import { AxiosInstance } from "@/helpers/Axios.instance"
import toast from "react-hot-toast"


type DayOfWeek =
    | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

type TimeSlot = { start: string; end: string }

type Schedule = {
    [key in DayOfWeek]: {
        active: boolean;
        slots: TimeSlot[];
    }
}

const days: DayOfWeek[] = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

export default function SchedulePage() {
    const [selectedDay, setSelectedDay] = useState<DayOfWeek>("Sunday")
    const [schedule, setSchedule] = useState<Schedule>(() => {
        const emptyDay = { active: true, slots: [{ start: "", end: "" }] }
        return days.reduce((acc, day) => {
            acc[day] = emptyDay
            return acc
        }, {} as Schedule)
    })
    const [loading, setLoading] = useState(false)

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalSlots, setModalSlots] = useState<TimeSlot[]>([])
    const [modalActive, setModalActive] = useState(true)

    // Fetch schedule from API
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true)
                const res = await AxiosInstance.get("/time-slot")
                if (res.data) setSchedule(res.data)
            } catch (err) {
                console.error(err)
                toast.error("Failed to load schedule.")
            } finally {
                setLoading(false)
            }
        }
        fetchSchedule()
    }, [])

    const openEditModal = () => {
        setModalSlots(schedule[selectedDay]?.slots || [{ start: "", end: "" }])
        setModalActive(schedule[selectedDay]?.active ?? true)
        setIsModalOpen(true)
    }

    const handleSlotChange = (index: number, field: keyof TimeSlot, value: string) => {
        const updated = [...modalSlots]
        updated[index][field] = value
        setModalSlots(updated)
    }

    const addSlot = () => {
        setModalSlots([...modalSlots, { start: "", end: "" }])
    }

    const removeSlot = (index: number) => {
        const updated = [...modalSlots]
        updated.splice(index, 1)
        setModalSlots(updated)
    }

    const saveSlots = async () => {
        const updatedSchedule = {
            ...schedule,
            [selectedDay]: {
                active: modalActive,
                slots: modalSlots
            }
        }
        setSchedule(updatedSchedule)
        setIsModalOpen(false)

        // Send update to API
        try {
            await AxiosInstance.put("/time-slot", {
                day: selectedDay,
                active: modalActive,
                slots: modalSlots
            })
            toast.success("Schedule updated successfully!")
        } catch (err) {
            toast.error("Failed to save schedule.")
            console.error(err)
        }
    }


    if (loading) return <div>Loading...</div>
    return (
        <div className="p-4">
            <Breadcrumb title="Doctor Schedule" />

            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-medium mb-4">Schedule Timings</h2>

                    {/* Day Tabs */}
                    <div className="flex border-b overflow-x-auto">
                        {days.map(day => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`px-4 py-2 font-medium text-sm whitespace-nowrap
                ${selectedDay === day
                                        ? 'text-black border-b-2 border-blue-500 bg-blue-50'
                                        : 'text-blue-600'}`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    {/* Schedule Display */}
                    <div className="flex justify-between items-center mt-6">
                        <div>
                            {schedule[selectedDay]?.slots?.length > 0 &&
                                schedule[selectedDay].slots[0].start ? (
                                <div className="space-y-1">
                                    {schedule[selectedDay].slots.map((slot, i) => (
                                        <div
                                            key={i}
                                            className="bg-blue-500 text-white px-4 py-1 rounded-full inline-block text-sm font-medium mr-2"
                                        >
                                            {slot.start} - {slot.end}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-500 italic">
                                    No schedule for {selectedDay}
                                </div>
                            )}
                        </div>

                        <Button variant="destructive" onClick={openEditModal}>
                            <span className="mr-2">✎</span> Edit Slot
                        </Button>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Edit Time Slot</DialogTitle>
                    </DialogHeader>

                    <div className="flex items-center mb-4">
                        <span className="mr-2">Day Status</span>
                        <Switch checked={modalActive} onCheckedChange={setModalActive} />
                    </div>

                    {modalSlots.map((slot, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <Input
                                type="time"
                                placeholder="Start Time"
                                value={slot.start}
                                onChange={(e) => handleSlotChange(index, "start", e.target.value)}
                            />
                            <Input
                                type="time"
                                placeholder="End Time"
                                value={slot.end}
                                onChange={(e) => handleSlotChange(index, "end", e.target.value)}
                            />
                            {modalSlots.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeSlot(index)}
                                >
                                    <Trash2 className="text-red-500" />
                                </Button>
                            )}
                        </div>
                    ))}

                    <Button variant="link" onClick={addSlot} >
                        + Add More
                    </Button>

                    <DialogFooter className="mt-4">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Close
                        </Button>
                        <Button onClick={saveSlots}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
