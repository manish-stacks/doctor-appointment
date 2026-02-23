"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { AppointmentDetails } from "@/types/appointment";

export default function Receipt({
  booking,
}: {
  booking: AppointmentDetails;
}) {
  /* ================= PDF DOWNLOAD FUNCTION ================= */
  const downloadPDF = async () => {
    const input = document.getElementById("print-area");
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2, // High resolution
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Multi-page support
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`Receipt_${booking?.appointmentId}.pdf`);
  };

  /* ================= FORMATTING ================= */
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto">

        {/* Download Button */}
        <div className="flex justify-end mb-4 print:hidden">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Download PDF
          </button>
        </div>

        {/* ================= RECEIPT CONTENT ================= */}
        <div
          id="print-area"
          className="bg-white p-10 text-sm text-gray-800 shadow-lg"
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b pb-5 mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </h2>
              <p className="text-gray-500 text-sm">
                Healthcare Appointment Receipt
              </p>
            </div>

            <div className="text-right text-sm">
              <p className="text-gray-500">Receipt No</p>
              <p className="font-mono font-semibold">
                {booking?.appointmentId}
              </p>
              <p className="mt-1 text-gray-500">Date: {today}</p>
            </div>
          </div>

          {/* Patient & Doctor Info */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">
                Patient Details
              </h4>
              <p>Name: {booking?.patientName}</p>
              <p>Phone: {booking?.patientNumber}</p>
              <p>Email: {booking?.patientEmail}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-gray-700">
                Doctor Details
              </h4>
              <p>Dr. {booking?.doctor?.name}</p>
              <p>{booking?.doctor?.expertise}</p>
              <p>{booking?.doctor?.hospital?.name || "N/A"}</p>
            </div>
          </div>

          {/* Appointment Table */}
          <div className="border rounded-lg overflow-hidden mb-8">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3">Service</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">Doctor Consultation</td>
                  <td className="p-3">{booking?.date}</td>
                  <td className="p-3">{booking?.time}</td>
                  <td className="p-3 text-right">
                    ₹{booking?.appointmentFees}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Summary */}
          <div className="flex justify-end">
            <div className="w-80 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{booking?.appointmentFees}</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{booking?.discountAmount}</span>
              </div>

              <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                <span>Total Paid</span>
                <span>₹{booking?.finalAmount}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 border-t pt-4 text-center text-xs text-gray-500">
            <p>
              This is a system generated receipt. No signature required.
            </p>
            <p className="mt-1">
              Thank you for choosing our healthcare services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
