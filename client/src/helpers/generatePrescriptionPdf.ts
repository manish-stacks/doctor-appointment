import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


/* ================= MAIN FUNCTION ================= */
export const generatePrescriptionPdf = async (
  appointment: any,
  prescription: any
) => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const primaryColor: any = [26, 115, 232];
  const borderColor: any = [220, 220, 220];
  const lightBg: any = [248, 250, 252];

  let yPos = 20;

  /* ================= WATERMARK ================= */
  doc.setFontSize(60);
  doc.setTextColor(230, 230, 230);
  doc.setFont("helvetica", "bold");
  doc.text("PRESCRIPTION", pageWidth / 2, pageHeight / 2, {
    align: "center",
    angle: 45,
  });

  /* ================= HEADER ================= */
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 8, "F");

  yPos = 18;

  // Logo
  try {
    // const logoBase64 = await loadImageAsBase64(
    //   "https://hoverbusinessservices.com/images/hbs-logo.png"
    // );
    const img = new Image();
    img.src = "/medical-loco.png";

    await new Promise((resolve) => {
      img.onload = resolve;
    });
    doc.addImage(img, "PNG", pageWidth - 40, 12, 25, 25);
  } catch (err) {
    console.log("Logo failed");
  }

  // Doctor Info
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(30, 41, 59);
  doc.text(`Dr. ${appointment?.doctor?.name || "-"}`, 15, yPos);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(appointment?.doctor?.expertise || "-", 15, yPos + 6);
  doc.text(
    appointment?.doctor?.hospital?.name || "-",
    15,
    yPos + 12
  );

  if (appointment?.doctor?.hospital?.address) {
    doc.text(
      appointment?.doctor?.hospital?.address,
      15,
      yPos + 18
    );
  }

  yPos += 28;

  doc.setDrawColor(...borderColor);
  doc.line(10, yPos, pageWidth - 10, yPos);

  yPos += 10;

  /* ================= PATIENT INFO ================= */
  doc.setFillColor(...lightBg);
  doc.roundedRect(10, yPos, pageWidth - 20, 30, 3, 3, "F");
  doc.setDrawColor(...borderColor);
  doc.roundedRect(10, yPos, pageWidth - 20, 30, 3, 3, "S");

  const leftX = 15;
  const rightX = pageWidth / 2 + 5;
  const labelGap = 32;

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(100, 116, 139);

  // Labels
  doc.text("PATIENT NAME", leftX, yPos + 8);
  doc.text("AGE", leftX, yPos + 16);
  doc.text("CONTACT", leftX, yPos + 24);

  doc.text("DATE", rightX, yPos + 8);
  doc.text("TIME", rightX, yPos + 16);
  doc.text("APPOINTMENT ID", rightX, yPos + 24);

  // Values
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);

  const formattedDate = new Date(
    appointment?.date
  ).toLocaleDateString("en-IN");

  doc.text(
    appointment?.patientName || "-",
    leftX + labelGap,
    yPos + 8
  );
  doc.text(
    `${appointment?.patientAge || "-"} years`,
    leftX + labelGap,
    yPos + 16
  );
  doc.text(
    appointment?.phoneNumber || "-",
    leftX + labelGap,
    yPos + 24
  );

  doc.text(formattedDate, rightX + labelGap, yPos + 8);
  doc.text(
    appointment?.time || "-",
    rightX + labelGap,
    yPos + 16
  );
  doc.text(
    appointment?.appointmentId || "-",
    rightX + labelGap,
    yPos + 24
  );

  yPos += 40;

  /* ================= RX TITLE ================= */
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);
  doc.text("Rx", 12, yPos);

  yPos += 6;

  /* ================= MEDICINE TABLE ================= */
  if (prescription?.medicines?.length > 0) {
    autoTable(doc, {
      startY: yPos,
      head: [["#", "Medicine", "Dosage", "Duration", "Instructions"]],
      body: prescription.medicines.map((m: any, i: number) => [
        i + 1,
        m.name || "-",
        m.dosage || "-",
        m.duration || "-",
        m.instructions || "-",
      ]),
      margin: { left: 10, right: 10 },
      headStyles: {
        fillColor: primaryColor,
        textColor: 255,
        fontSize: 10,
      },
      bodyStyles: {
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: lightBg,
      },
      styles: {
        lineColor: borderColor,
        lineWidth: 0.2,
      },
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;
  } else {
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text("No medicines prescribed", 15, yPos);
    yPos += 10;
  }

  /* ================= NOTES ================= */
  if (prescription?.notes) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("Clinical Notes", 10, yPos);

    yPos += 6;

    const splitNotes = doc.splitTextToSize(
      prescription.notes,
      pageWidth - 25
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text(splitNotes, 12, yPos);

    yPos += splitNotes.length * 5 + 10;
  }

  /* ================= FOLLOW UP ================= */
  if (prescription?.followUpDate) {
    doc.setFillColor(255, 244, 204);
    doc.setDrawColor(255, 193, 7);
    doc.roundedRect(10, yPos, pageWidth - 20, 15, 3, 3, "FD");

    const followDate = new Date(
      prescription.followUpDate
    ).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 60, 0);
    doc.text(`Next Follow-up: ${followDate}`, 15, yPos + 9);

    yPos += 22;
  }

  /* ================= SIGNATURE ================= */
  const signY = pageHeight - 40;

  doc.setDrawColor(...primaryColor);
  doc.line(pageWidth - 70, signY, pageWidth - 20, signY);

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30);
  doc.text(
    `Dr. ${appointment?.doctor?.name?.split(" ")[0] || ""}`,
    pageWidth - 45,
    signY - 5,
    { align: "center" }
  );

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Authorized Signature",
    pageWidth - 45,
    signY + 5,
    { align: "center" }
  );

  /* ================= FOOTER ================= */
  // ==================== FOOTER ====================
  const footerY = pageHeight - 20;

  // Footer divider
  doc.setDrawColor(...borderColor);
  doc.setLineWidth(0.3);
  doc.line(15, footerY - 5, pageWidth - 15, footerY - 5);

  // Footer text
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);

  const disclaimerText = "This is a computer-generated prescription. For any queries, please contact the hospital.";
  doc.text(disclaimerText, pageWidth / 2, footerY, { align: "center" });

  doc.setFontSize(6.5);
  const footerInfo = `Generated on: ${new Date().toLocaleDateString('en-IN')} | Prescription ID: ${appointment.appointmentId}`;
  doc.text(footerInfo, pageWidth / 2, footerY + 5, { align: "center" });

  if (appointment.doctor.hospital.phone) {
    doc.text(`Hospital Contact: ${appointment.doctor.hospital.phone}`, pageWidth / 2, footerY + 10, { align: "center" });
  }



  // doc.save(`Prescription_${appointment?.appointmentId}.pdf`);
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);

  const link = document.createElement("a");
  link.href = pdfUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.click();

};
