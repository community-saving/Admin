import { startOfYear, endOfYear, format } from 'date-fns';



// Get the start of a year as a timestamp

export const getStartOfYear = (year) => {

  return startOfYear(new Date(year, 0, 1));

};



// Get the end of a year as a timestamp

export const getEndOfYear = (year) => {

  return endOfYear(new Date(year, 0, 1));

};



// Get the start of a month as a timestamp

export const getStartOfMonth = (year, month) => {

  return new Date(year, month - 1, 1);

};



// Get the end of a month as a timestamp

export const getEndOfMonth = (year, month) => {

  return new Date(year, month, 0);

};



// Format a timestamp to a readable date string

export const formatDate = (timestamp) => {

  if (!timestamp) return 'N/A';

  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

  return format(date, 'MMM dd, yyyy');

};



// Calculate totals for a user based on deposits and loans

export const calculateUserTotals = (deposits, loans) => {

  const totalDeposits = deposits.reduce((sum, deposit) => sum + deposit.amount, 0);

  const totalLoans = loans.reduce((sum, loan) => sum + loan.amount, 0);

  const paidLoansCount = loans.filter(loan => loan.paid).length;

  const unpaidLoansCount = loans.filter(loan => !loan.paid).length;

  

  return {

    totalDeposits,

    totalLoans,

    paidLoansCount,

    unpaidLoansCount

  };

};



// Filter users based on search query

export const filterUsersBySearch = (users, searchQuery) => {

  if (!searchQuery.trim()) return users;

  

  const query = searchQuery.toLowerCase();

  return users.filter(user => 

    user.name?.toLowerCase().includes(query) ||

    user.email?.toLowerCase().includes(query) ||

    user.phone?.toLowerCase().includes(query)

  );

};



// Export data to CSV

export const exportToCSV = (data, filename) => {

  const headers = ['User', 'Total Deposits', 'Total Loans', 'Paid Loans', 'Unpaid Loans'];

  const rows = data.map(user => [

    user.name,

    user.totalDeposits,

    user.totalLoans,

    user.paidLoansCount,

    user.unpaidLoansCount

  ]);

  

  let csvContent = headers.join(',') + '\n';

  rows.forEach(row => {

    csvContent += row.join(',') + '\n';

  });

  

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.setAttribute('href', url);

  link.setAttribute('download', filename);

  link.style.visibility = 'hidden';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

};



// Export data to PDF (simplified version without external library)

export const exportToPDF = (data, filename) => {

  // This is a simplified version without using a PDF library

  // In a real implementation, you would use a library like jsPDF

  const headers = ['User', 'Total Deposits', 'Total Loans', 'Paid Loans', 'Unpaid Loans'];

  const rows = data.map(user => [

    user.name,

    user.totalDeposits,

    user.totalLoans,

    user.paidLoansCount,

    user.unpaidLoansCount

  ]);

  

  let pdfContent = headers.join(' | ') + '\n';

  rows.forEach(row => {

    pdfContent += row.join(' | ') + '\n';

  });

  

  const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8;' });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.setAttribute('href', url);

  link.setAttribute('download', `${filename}.txt`);

  link.style.visibility = 'hidden';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

};



// Group data by month for chart

export const groupDataByMonth = (deposits, loans, year) => {

  const monthlyData = [];

  

  for (let month = 1; month <= 12; month++) {

    const monthStart = getStartOfMonth(year, month);

    const monthEnd = getEndOfMonth(year, month);

    

    const monthDeposits = deposits.filter(d => {

      const date = d.timestamp.toDate ? d.timestamp.toDate() : new Date(d.timestamp);

      return date >= monthStart && date <= monthEnd;

    });

    

    const monthLoans = loans.filter(l => {

      const date = l.timestamp.toDate ? l.timestamp.toDate() : new Date(l.timestamp);

      return date >= monthStart && date <= monthEnd;

    });

    

    monthlyData.push({

      month: format(monthStart, 'MMM'),

      deposits: monthDeposits.reduce((sum, d) => sum + d.amount, 0),

      loans: monthLoans.reduce((sum, l) => sum + l.amount, 0)

    });

  }

  

  return monthlyData;

};