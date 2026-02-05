"use client";
import { AppointmentDetails } from "@/types/appointment";

export default function Receipt({ booking }: { booking: AppointmentDetails }) {

  return (
    <div id="print-area" className="max-w-3xl mx-auto bg-white p-8 text-sm text-gray-800">
      {/* Header */}
      <div className="flex justify-between border-b pb-4 mb-4">
        <div>
          <h2 className="text-xl font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</h2>
          <p className="text-xs text-gray-500">Healthcare Appointment Receipt</p>
        </div>
        <div className="text-right">
          <p className="text-xs">Receipt No:</p>
          <p className="font-mono font-semibold">{booking?.appointmentId}</p>
          <p className="text-xs mt-1">Date: {new Date().toDateString()}</p>
        </div>
      </div>

      {/* Patient & Doctor */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-semibold mb-1">Patient Details</h4>
          <p>Name: {booking?.patientName}</p>
          <p>Phone: {booking?.patientNumber}</p>
          <p>Email: {booking?.patientEmail}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Doctor Details</h4>
          <p>Dr. {booking?.doctor?.name}</p>
          <p>{booking?.doctor?.expertise}</p>
          <p>{booking?.doctor?.hospital?.name || "N/A"}</p>
        </div>
      </div>

      {/* Appointment Info */}
      <div className="border rounded mb-4">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Service</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">Doctor Consultation</td>
              <td className="p-2">{booking?.date}</td>
              <td className="p-2">{booking?.time}</td>
              <td className="p-2 text-right">₹{booking?.appointmentFees}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Summary */}
      <div className="flex justify-end">
        <div className="w-1/2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{booking?.appointmentFees}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{booking?.discountAmount}</span>
          </div>
          <div className="border-t mt-2 pt-2 flex justify-between font-bold text-lg">
            <span>Total Paid</span>
            <span>₹{booking?.finalAmount}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 border-t pt-3 text-xs text-gray-500 text-center">
        This is a system generated receipt. No signature required.
      </div>
    </div>
  );
}
