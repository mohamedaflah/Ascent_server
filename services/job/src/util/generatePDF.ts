import { format } from "date-fns";
const PDFDocument = require("pdfkit");
const fs = require("fs");

export const generatePDF = async (applicants: any) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("Report.pdf"));

  // Company Logo
  doc.image("ASCENT.png", 45, 10, { width: 100 });

  // Downloaded Date
  doc
    .fontSize(12)
    .text(`Downloaded Date: ${format(new Date(), 'PPP')}`, 400, 30, {
      align: "right",
    });

  let currentY = 100;

  // Table Headers
  const headers = ["Job Title", "Applicant Name", "Applicant Email", "Applied Date", "Hiring Stage"];
  const columnPositions = [30, 130, 260, 380, 460]; // Adjust based on your layout

  doc.fontSize(12);
  headers.forEach((header, i) => {
    doc.text(header, columnPositions[i], currentY);
  });

  currentY += 20;

  // Draw a line
  doc.moveTo(20, currentY).lineTo(700, currentY).stroke();

  currentY += 10;

  // Applicants
  doc.fontSize(10);
  applicants.forEach((applicant: any) => {
    let applicantName = `${applicant.applicantDetails.firstname} ${applicant.applicantDetails.lastname}`;

    let appliedDate = format(new Date(applicant.applicants.appliedDate), "PPP");
    
    const rowContent = [
      applicant.jobTitle,
      applicantName,
      applicant.applicantDetails.email,
      appliedDate,
      applicant.applicants.hiringstage,
    ];

    rowContent.forEach((text, i) => {
      // Ensure content fits within column width
      const maxWidth = columnPositions[i + 1] - columnPositions[i] - 10;
      const textWidth = doc.widthOfString(text);
      if (textWidth > maxWidth) {
        // Truncate text if it exceeds column width
        text = text.substring(0, Math.floor((maxWidth / textWidth) * text.length));
      }
      doc.text(text, columnPositions[i], currentY, { width: maxWidth, align: 'left' });
    });

    // Optionally add an image for each applicant
    // Ensure you have the image locally or it's pre-downloaded if it's remote
    // Example:
    // if (fs.existsSync(applicant.applicantProfile)) {
    //   doc.image(applicant.applicantProfile, 50, currentY, { width: 50 });
    // }

    currentY += 20;

    if (currentY > 700) { // Check to avoid drawing off the page
      doc.addPage();
      currentY = 50; // Reset Y for new page
    }
  });

  doc.end();
};
