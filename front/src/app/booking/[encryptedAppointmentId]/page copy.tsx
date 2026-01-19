
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AxiosInstance } from "@/helpers/Axios.instance";
import { decryptId } from "@/helpers/Helper";
import { AppointmentDetails } from "@/types/appointment";
import StepOnePatient from "@/components/booking/StepOnePatient";
import StepTwoSchedule from "@/components/booking/StepTwoSchedule";
import StepThreePayment from "@/components/booking/StepThreePayment";
import DoctorSidebar from "@/components/booking/DoctorSidebar";


export default function BookingPage() {
  const params = useParams();
  const router = useRouter();

  const encryptedAppointmentId = params?.encryptedAppointmentId as string;

  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [appointment, setAppointment] = useState<AppointmentDetails | null>(null);

  useEffect(() => {
    const decoded = decodeURIComponent(encryptedAppointmentId);
    const appointmentId = decryptId(decoded) || decoded;

    fetchAppointment(appointmentId);
  }, [encryptedAppointmentId]);

  const fetchAppointment = async (appointmentId: string) => {
    try {
      const res = await AxiosInstance.get(`/appointment/${appointmentId}/booking`);
      setAppointment(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Booking fetch error", err);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!appointment) return <div className="p-10 text-center">Invalid booking link</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT MAIN */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <StepOnePatient
              appointment={appointment}
              onSuccess={(updated: AppointmentDetails) => {
                setAppointment(updated);
                setStep(2);
              }}
            />
          )}

          {step === 2 && (
            <StepTwoSchedule
              appointment={appointment}
              onBack={() => setStep(1)}
              onNext={(date: string, time: string) => {
                setAppointment({ ...appointment, date, time });
                setStep(3);
              }}
            />
          )}

          {step === 3 && (
            <StepThreePayment
              appointment={appointment}
              onBack={() => setStep(2)}
              onSuccess={() => router.push("/orders/confirmation?success=true")}
            />
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <DoctorSidebar appointment={appointment} />
      </div>
    </div>
  );
}
