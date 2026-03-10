import { AxiosInstance } from "@/helpers/Axios.instance";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function RescheduleModal({ appointmentId, onClose }: { appointmentId: string; onClose: () => void }) {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [loading, setLoading] = useState(false);
    // const [availableSlots, setAvailableSlots] = useState([
    //     "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
    // ]);
    const availableSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
    const handleReschedule = async () => {
        if (!selectedDate || !selectedTime) {
            toast.error("Please select both date and time");
            return;
        }

        setLoading(true);
        try {
            await AxiosInstance.put(`/appointment/${appointmentId}/reschedule`, {
                date: selectedDate,
                time: selectedTime
            });
            toast.success("Appointment rescheduled successfully!");
            onClose();
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("Failed to reschedule. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4 ">
            <div className="bg-white rounded-lg w-full shadow-xl max-w-2xl mx-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h3 className="text-xl font-semibold text-gray-900">Reschedule Appointment</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select New Date
                        </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Time Slot
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {availableSlots.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedTime(slot)}
                                    className={`px-3 py-2 text-sm rounded-md border transition-colors ${selectedTime === slot
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 p-6 border-t bg-gray-50">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleReschedule}
                        disabled={loading || !selectedDate || !selectedTime}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Rescheduling..." : "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default RescheduleModal;