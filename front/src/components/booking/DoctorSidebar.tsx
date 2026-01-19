"use client";
import Image from "next/image";
import { MapPin, Phone, IndianRupee, Calendar } from "lucide-react";
import { AppointmentDetails } from "@/types/appointment";

interface Props {
  appointment: AppointmentDetails;
}

export default function DoctorSidebar({ appointment }: Props) {
  const doctor = appointment.doctor;
  const hospital = appointment.hospital;

  return (
    <div className="bg-white p-6 rounded-lg border sticky top-6">
      {/* Doctor Info */}
      <div className="flex flex-col items-center text-center mb-4">
        <Image
          src={doctor?.image || "https://ui-avatars.com/api/?name=DR&size=150"}
          alt="Doctor"
          width={120}
          height={120}
          className="rounded-full mb-2 object-cover"
        />
        <h3 className="text-lg font-bold">Dr. {doctor?.name}</h3>
        <p className="text-sm text-blue-600">{doctor?.expertise}</p>
      </div>

      {/* Fees */}
      <div className="flex justify-between items-center border-t pt-3 mb-3">
        <span className="text-sm text-gray-600 flex items-center gap-1">
          <IndianRupee size={14} /> Fees
        </span>
        <span className="font-semibold">₹{doctor?.appointmentFees}</span>
      </div>

      {/* Appointment Date & Time */}
      {appointment.date && appointment.time && (
        <div className="border-t pt-3 mb-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <Calendar size={14} />
            <span>Appointment</span>
          </div>
          <p className="font-medium">
            {appointment.date} at {appointment.time}
          </p>
        </div>
      )}

      {/* Hospital Info */}
      {hospital && (
        <div className="border-t pt-3 text-sm space-y-2">
          <h4 className="font-semibold">{hospital.name}</h4>
          <div className="flex items-start gap-2 text-gray-600">
            <MapPin size={14} className="mt-0.5" />
            <span>{hospital.address}</span>
          </div>
          {hospital.phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={14} />
              <span>{hospital.phone}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
