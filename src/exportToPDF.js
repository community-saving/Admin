import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Export user reports to a professional PDF document
 * @param {Array} userReports - Array of user report objects
 * @param {number} year - The year for the report
 */
const exportToPDF = (userReports, year) => {
  // Initialize jsPDF with portrait orientation and A4 size
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // Define page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Add custom font styles
  doc.setFont('helvetica');
  
  // Helper function to format dates
  const formatDateForPDF = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Helper function to format currency
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };
  
  // Helper function to get status color based on payment status
  const getStatusColor = (paymentStatus) => {
    return paymentStatus === "approved" ? [0, 128, 0] : [255, 0, 0]; // Green for paid, red for unpaid
  };
  
  // Helper function to get status text
  const getStatusText = (paymentStatus) => {
    return paymentStatus === "approved" ? "PAID" : paymentStatus ? paymentStatus.toUpperCase() : "UNPAID";
  };
  
  // Add header to each page
  const addHeader = () => {
    // Set header background color
    doc.setFillColor(41, 98, 255); // Blue color
    doc.rect(0, 0, pageWidth, 30, 'F');
    
    // Add white text for title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Annual User Reports', pageWidth / 2, 20, { align: 'center' });
    
    // Add year
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`${year}`, pageWidth / 2, 26, { align: 'center' });
    
    // Reset text color for content
    doc.setTextColor(0, 0, 0);
  };
  
  // Add footer to each page
  const addFooter = (pageNumber) => {
    const footerY = pageHeight - 10;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Page ${pageNumber}`, pageWidth / 2, footerY, { align: 'center' });
  };
  
  // Add title page
  const addTitlePage = () => {
    addHeader();
    
    // Add report title
    doc.setFontSize(28);
    doc.setTextColor(41, 98, 255);
    doc.text('Annual User Reports', pageWidth / 2, 100, { align: 'center' });
    
    // Add year
    doc.setFontSize(22);
    doc.text(`${year}`, pageWidth / 2, 115, { align: 'center' });
    
    // Add generation date
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    doc.text(`Generated on ${today}`, pageWidth / 2, 130, { align: 'center' });
    
    // Add summary statistics
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Summary Statistics', margin, 160);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    
    // Calculate totals
    const totalUsers = userReports.length;
    const totalDeposits = userReports.reduce((sum, report) => sum + report.totalDeposits, 0);
    const totalLoans = userReports.reduce((sum, report) => sum + report.totalLoans, 0);
    const totalPaidLoans = userReports.reduce((sum, report) => sum + report.paidLoansCount, 0);
    const totalUnpaidLoans = userReports.reduce((sum, report) => sum + report.unpaidLoansCount, 0);
    
    // Display statistics
    doc.text(`Total Users: ${totalUsers}`, margin, 175);
    doc.text(`Total Deposits: ${formatCurrency(totalDeposits)}`, margin, 185);
    doc.text(`Total Loans: ${formatCurrency(totalLoans)}`, margin, 195);
    doc.text(`Total Paid Loans: ${totalPaidLoans}`, margin, 205);
    doc.text(`Total Unpaid Loans: ${totalUnpaidLoans}`, margin, 215);
    
    addFooter(1);
    
    // Add new page for content
    doc.addPage();
  };
  
  // Track the Y position for content placement
  let currentYPosition = 0;
  
  // Add summary table of all users
  const addSummaryTable = () => {
    // Add header to the second page
    addHeader();
    
    // Table headers
    const headers = [
      [{ content: 'User Name', dataKey: 'name' }],
      [{ content: 'Total Deposits ($)', dataKey: 'totalDeposits' }],
      [{ content: 'Paid Loans', dataKey: 'paidLoansCount' }],
      [{ content: 'Unpaid Loans', dataKey: 'unpaidLoansCount' }],
      [{ content: 'Total Loans ($)', dataKey: 'totalLoans' }]
    ];
    
    // Table data
    const data = userReports.map(report => [
      report.user.name || 'Unknown User',
      formatCurrency(report.totalDeposits),
      report.paidLoansCount,
      report.unpaidLoansCount,
      formatCurrency(report.totalLoans)
    ]);
    
    // Add table with styling
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 40,
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 5
      },
      headStyles: {
        fillColor: [41, 98, 255],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { left: 20, right: 20 },
      didDrawPage: (data) => {
        // Update current Y position after drawing the table
        currentYPosition = data.cursor.y;
      }
    });

    // Update current Y position
    currentYPosition = doc.lastAutoTable.finalY + 10;
    
    // Add page number
    addFooter(doc.internal.getNumberOfPages());
  };
  
  // Check if we need a new page
  const checkAndAddPageIfNeeded = (neededSpace) => {
    const remainingSpace = pageHeight - currentYPosition - 20; // 20 for footer
    if (remainingSpace < neededSpace) {
      doc.addPage();
      addHeader();
      currentYPosition = 40; // Reset Y position for new page
      addFooter(doc.internal.getNumberOfPages());
      return true;
    }
    return false;
  };
  
  // Add detailed section for each user
  const addUserDetails = (userReport, isFirstUser = false) => {
    // Estimate space needed (this is approximate)
    const estimatedSpace = 60 + 
      (userReport.deposits.length * 10) + 
      (userReport.loans.length * 10);
    
    // Check if we need a new page
    checkAndAddPageIfNeeded(estimatedSpace);
    
    // User name as section header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(41, 98, 255);
    doc.text(userReport.user.name || 'Unknown User', margin, currentYPosition);
    currentYPosition += 10;
    
    // User details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(`Email: ${userReport.user.email || 'N/A'}`, margin, currentYPosition);
    currentYPosition += 10;
    doc.text(`Phone: ${userReport.user.phone || 'N/A'}`, margin, currentYPosition);
    currentYPosition += 15;
    
    // Deposits table
    if (userReport.deposits.length > 0) {
      const depositHeaders = [
        [{ content: 'Amount', dataKey: 'amount' }],
        [{ content: 'Date', dataKey: 'date' }]
      ];
      
      const depositData = userReport.deposits.map(deposit => [
        formatCurrency(deposit.amount),
        formatDateForPDF(deposit.timestamp)
      ]);
      
      // Check if we need a new page before drawing deposits table
      checkAndAddPageIfNeeded(30);
      
      autoTable(doc, {
        head: depositHeaders,
        body: depositData,
        startY: currentYPosition,
        theme: 'grid',
        styles: {
          font: 'helvetica',
          fontSize: 10,
          cellPadding: 5
        },
        headStyles: {
          fillColor: [75, 192, 192], // Teal header for deposits
          textColor: 255,
          fontStyle: 'bold'
        },
        margin: { left: margin, right: margin },
        didDrawPage: (data) => {
          currentYPosition = data.cursor.y;
        }
      });
      
      currentYPosition = doc.lastAutoTable.finalY + 10;
    } else {
      // No deposits message
      checkAndAddPageIfNeeded(20);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('No deposits found', margin, currentYPosition);
      doc.setTextColor(0, 0, 0);
      currentYPosition += 10;
    }
    
    // Loans table
    if (userReport.loans.length > 0) {
      const loanHeaders = [
        [{ content: 'Amount', dataKey: 'amount' }],
        [{ content: 'Date', dataKey: 'date' }],
        [{ content: 'Status', dataKey: 'status' }]
      ];
      
      const loanData = userReport.loans.map(loan => [
        formatCurrency(loan.amount),
        formatDateForPDF(loan.timestamp),
        getStatusText(loan.paymentStatus)
      ]);
      
      // Check if we need a new page before drawing loans table
      checkAndAddPageIfNeeded(30);
      
      // Draw the loans table
      autoTable(doc, {
        head: loanHeaders,
        body: loanData,
        startY: currentYPosition,
        theme: 'grid',
        styles: {
          font: 'helvetica',
          fontSize: 10,
          cellPadding: 5
        },
        headStyles: {
          fillColor: [255, 99, 132], // Red header for loans
          textColor: 255,
          fontStyle: 'bold'
        },
        // Custom cell styling for status column
        didDrawCell: (data) => {
          if (data.section === 'body' && data.column.index === 2) { // Status column
            const loanIndex = data.row.index;
            const loan = userReport.loans[loanIndex];
            if (loan) {
              const statusColor = getStatusColor(loan.paymentStatus);
              
              // Set text color based on status
              doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
            }
          }
        },
        didDrawPage: (data) => {
          currentYPosition = data.cursor.y;
        },
        margin: { left: margin, right: margin }
      });
      
      currentYPosition = doc.lastAutoTable.finalY + 15;
    } else {
      // No loans message
      checkAndAddPageIfNeeded(20);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('No loans found', margin, currentYPosition);
      doc.setTextColor(0, 0, 0);
      currentYPosition += 15;
    }
  };
  
  // Generate the PDF
  try {
    // Add title page
    addTitlePage();
    
    // Add summary table
    addSummaryTable();
    
    // Add a new page before user details if needed
    if (userReports.length > 0) {
      doc.addPage();
      addHeader();
      currentYPosition = 40;
    }
    
    // Add detailed sections for each user
    userReports.forEach((userReport, index) => {
      addUserDetails(userReport, index === 0);
    });
    
    // Add page numbers to all pages
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addFooter(i);
    }
    
    // Save the PDF with dynamic filename
    const filename = `annual-reports-${year}.pdf`;
    doc.save(filename);
    
    return { success: true, filename };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return { success: false, error: error.message };
  }
};

export default exportToPDF;