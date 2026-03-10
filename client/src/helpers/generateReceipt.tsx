import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { AppointmentDetails } from "@/types/appointment";

export const generateReceiptPdf = (booking: AppointmentDetails) => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();

  /* ================= HEADER ================= */
  doc.setFontSize(18);
  doc.setTextColor(33, 37, 41);
  doc.text(
    process.env.NEXT_PUBLIC_APP_NAME || "Healthcare App",
    pageWidth / 2,
    20,
    { align: "center" }
  );

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text("Appointment Payment Receipt", pageWidth / 2, 27, {
    align: "center",
  });

  doc.line(15, 32, pageWidth - 15, 32);

  /* ================= RECEIPT INFO ================= */
  const today = new Date().toLocaleDateString("en-IN");

  doc.setFontSize(11);
  doc.setTextColor(0);

  doc.text(`Receipt No: ${booking?.appointmentId}`, 15, 42);
  doc.text(`Date: ${today}`, pageWidth - 15, 42, { align: "right" });

  /* ================= PATIENT & DOCTOR ================= */
  doc.setFontSize(13);
  doc.text("Patient Details", 15, 55);

  doc.setFontSize(11);
  doc.text(`Name: ${booking?.patientName}`, 15, 62);
  doc.text(`Phone: ${booking?.patientNumber}`, 15, 68);
  doc.text(`Email: ${booking?.patientEmail || "-"}`, 15, 74);

  doc.setFontSize(13);
  doc.text("Doctor Details", pageWidth - 80, 55);

  doc.setFontSize(11);
  doc.text(`Dr. ${booking?.doctor?.name}`, pageWidth - 80, 62);
  doc.text(`${booking?.doctor?.expertise}`, pageWidth - 80, 68);
  doc.text(`${booking?.doctor?.hospital?.name || "N/A"}`,pageWidth - 80,74);
  // doc.text(`${booking?.doctor?.hospital?.address || "N/A"}`,pageWidth - 80,80);
  // doc.text(`${booking?.doctor?.hospital?.phone || "N/A"}`,pageWidth - 80,86);
  /* ================= SERVICE TABLE ================= */
  autoTable(doc, {
    startY: 85,
    head: [["Service", "Date", "Time", "Amount"]],
    body: [
      [
        "Doctor Consultation",
        booking?.date,
        booking?.time,
        `Rs. ${booking?.appointmentFees}`,
      ],
    ],
    theme: "grid",
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
    },
    styles: {
      fontSize: 10,
    },
  });

  /* ================= PAYMENT SUMMARY ================= */
  const finalY = (doc).lastAutoTable.finalY + 10;

  autoTable(doc, {
    startY: finalY,
    body: [
      ["Subtotal", `Rs. ${booking?.appointmentFees}`],
      ["Discount", `- Rs. ${booking?.discountAmount || 0}`],
      ["Total Paid", `Rs. ${booking?.finalAmount}`],
    ],
    theme: "plain",
    styles: {
      fontSize: 11,
    },
    columnStyles: {
      0: { cellWidth: 120 },
      1: { halign: "right" },
    },
  });

  /* ================= FOOTER ================= */
  const footerY = doc.internal.pageSize.getHeight() - 20;

  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(
    "This is a system generated receipt. No signature required.",
    pageWidth / 2,
    footerY,
    { align: "center" }
  );

  // doc.save(`Receipt_${booking?.appointmentId}.pdf`);
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);

  const link = document.createElement("a");
  link.href = pdfUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.click();
};
