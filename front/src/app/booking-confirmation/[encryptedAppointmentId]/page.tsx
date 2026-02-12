"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { decryptId } from "@/helpers/Helper";
import { AxiosInstance } from "@/helpers/Axios.instance";
import { AppointmentDetails } from "@/types/appointment";
import { generateReceiptPdf } from "@/helpers/generateReceipt";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Calendar, Clock, MapPin, User, Phone, IndianRupee, Download, Home, FileText, Info } from "lucide-react";


export default function BookingConfirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const success = searchParams?.get("success") === "true";
  const encryptedAppointmentId = params?.encryptedAppointmentId as string;

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<AppointmentDetails>();

  useEffect(() => {
    if (!encryptedAppointmentId) return;

    const decodedEncryptedId = decodeURIComponent(encryptedAppointmentId);
    const appointmentId = decryptId(decodedEncryptedId) || decodedEncryptedId;

    const getDetails = async () => {
      try {
        const { data } = await AxiosInstance.get(
          `/appointment/${appointmentId}/booking`
        );

        setBooking(data);
      } catch (error) {
        console.error("Failed to fetch booking details", error);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [encryptedAppointmentId]);


  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading booking details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Booking not found</p>
      </div>
    );
  }

  if (!success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Payment Failed</h1>
          <p className="text-gray-600 mb-6">
            Unfortunately, your booking could not be completed. Please try again.
          </p>
          <div className="text-sm text-gray-500 mb-6">
            Redirecting to home in <span className="font-semibold text-red-600">{0}</span> seconds...
          </div>
          <button
            onClick={() => router.push("/")}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-3">Booking Confirmed!</h1>
            <p className="text-gray-600 text-lg mb-4">
              Your appointment has been successfully booked
            </p>
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Confirmation sent to your email
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4">
              <h2 className="text-xl font-semibold text-white">Appointment Details</h2>
            </div>

            <div className="p-8">
              {/* Doctor Info */}
              <div className="flex items-center gap-6 pb-6 border-b mb-6">
                <Image
                  src={booking?.doctor?.image || "https://ui-avatars.com/api/?name=DR&background=3B82F6&color=fff&size=150"}
                  alt={booking?.doctor?.name || "Doctor"}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-blue-100"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Dr. {booking.doctor?.name}</h3>
                  <p className="text-blue-600 font-medium">{booking?.doctor?.expertise}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span>⭐ 4.8</span>
                    <span>•</span>
                    <span>{booking?.doctor?.experience} years experience</span>
                  </div>
                </div>
              </div>

              {/* Appointment Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Patient Name</p>
                    <p className="text-gray-900 font-semibold">{booking?.patientName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Appointment Date</p>
                    <p className="text-gray-900 font-semibold">{new Date(booking.date).toDateString()}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Appointment Time</p>
                    <p className="text-gray-900 font-semibold">{booking.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="text-gray-900 font-semibold">+91 {booking?.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:col-span-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hospital Address</p>
                    <p className="text-gray-900 font-semibold">{booking?.hospital?.address}</p>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="text-gray-900 font-medium flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {booking.appointmentFees}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600 font-medium flex items-center">
                      - <IndianRupee className="w-4 h-4" />
                      {booking.discountAmount}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold text-gray-900">Total Paid</span>
                    <span className="font-bold text-blue-600 text-lg flex items-center">
                      <IndianRupee className="w-5 h-5" />
                      {booking.finalAmount}
                    </span>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm text-green-700">
                    ✓ Payment successful via {booking.paymentType}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
             <Info className="w-4 h-4" />
              Important Information
            </h3>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>Please arrive 15 minutes before your scheduled appointment time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>Bring your previous medical records and prescriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>Carry a valid ID proof for verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>For cancellation or rescheduling, contact us at least 24 hours in advance</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => generateReceiptPdf(booking)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Receipt
            </button>

            <button
              onClick={() => router.push("/patient/appointments")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              <FileText className="w-5 h-5" />
              My Appointments
            </button>

            <button
              onClick={() => router.push("/")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </button>
          </div>

          {/* Booking ID */}
          <div className="text-center mt-8 text-sm text-gray-500">
            Booking ID: <span className="font-mono font-semibold text-gray-700">#{booking.appointmentId}</span>
          </div>
        </div>
      </div>
      
    </>
  );
}