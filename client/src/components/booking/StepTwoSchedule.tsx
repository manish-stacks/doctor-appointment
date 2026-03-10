"use client";

import { useEffect, useState } from "react";
import { AxiosInstance } from "@/helpers/Axios.instance";
import { Calendar } from "lucide-react";
import { AppointmentDetails } from "@/types/appointment";

interface Schedule {
  day: string;
  active: boolean;
  slots: Array<{ start: string; end: string }>;
}

interface Props {
  appointment: AppointmentDetails;
  onBack: () => void;
  onNext: (date: string, time: string) => void;
}

export default function StepTwoSchedule({ appointment, onBack, onNext }: Props) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Array<{ date: string; time: string }>>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    fetchSchedule();
    fetchBookedSlots();
  }, []);

  const fetchSchedule = async () => {
    const res = await AxiosInstance.get(`/doctor/${appointment.doctorId}/schedule`);
    setSchedules(res.data || []);
  };

  const fetchBookedSlots = async () => {
    const res = await AxiosInstance.get(`/doctor/${appointment.doctorId}/booked-slots`);
    setBookedSlots(res.data || []);
  };

  const getNext7Days = () => {
    return [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const getDayName = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "long" });

  const generateSlots = (start: string, end: string, duration: number) => {
    const slots: string[] = [];
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    let current = sh * 60 + sm;
    const endMin = eh * 60 + em;

    while (current < endMin) {
      const h = Math.floor(current / 60);
      const m = current % 60;
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      current += duration;
    }
    return slots;
  };

  const isBooked = (date: Date, time: string) => {
    const d = date.toISOString().split("T")[0];
    return bookedSlots.some(b => b.date === d && b.time === time);
  };

  const selectedDayName = getDayName(selectedDate);
  const selectedSchedule = schedules.find(s => s.day === selectedDayName);
  const slotDuration = parseInt(appointment.doctor?.timeSlot || "30");

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>

      {/* Date Row */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {getNext7Days().map((date, i) => {
          const active = schedules.find(s => s.day === getDayName(date))?.active;
          const isSelected = selectedDate.toDateString() === date.toDateString();

          return (
            <button
              key={i}
              disabled={!active}
              onClick={() => {
                setSelectedDate(date);
                setSelectedTime("");
              }}
              className={`p-2 rounded text-sm ${
                isSelected ? "bg-blue-600 text-white" : active ? "bg-gray-100" : "bg-gray-200 text-gray-400"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Time Slots */}
      {selectedSchedule?.active ? (
        selectedSchedule.slots.map((slot, i) => {
          const times = generateSlots(slot.start, slot.end, slotDuration);
          return (
            <div key={i} className="mb-3">
              <p className="text-sm mb-1">{slot.start} - {slot.end}</p>
              <div className="grid grid-cols-4 gap-2">
                {times.map(time => {
                  const booked = isBooked(selectedDate, time);
                  return (
                    <button
                      key={time}
                      disabled={booked}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded ${
                        selectedTime === time
                          ? "bg-blue-600 text-white"
                          : booked
                          ? "bg-gray-200 text-gray-400"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-10 text-gray-400">
          <Calendar className="mx-auto mb-2" />
          No slots available
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="px-4 py-2 bg-gray-200 rounded">
          Back
        </button>
        <button
          onClick={() => onNext(selectedDate.toISOString().split("T")[0], selectedTime)}
          disabled={!selectedTime}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
