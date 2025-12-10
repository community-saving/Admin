import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { startOfYear, endOfYear, format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import exportToPDF from '../exportToPDF';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// UTILITY FUNCTIONS
const getStartOfYear = (year) => {
  return startOfYear(new Date(year, 0, 1));
};

const getEndOfYear = (year) => {
  return endOfYear(new Date(year, 0, 1));
};

const getStartOfMonth = (year, month) => {
  return new Date(year, month - 1, 1);
};

const getEndOfMonth = (year, month) => {
  return new Date(year, month, 0);
};

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return format(date, 'MMM dd, yyyy');
};

// Memoized calculation of user totals
const calculateUserTotals = (deposits, loans) => {
  const totalDeposits = deposits.reduce((sum, deposit) => sum + deposit.amount, 0);
  const totalLoans = loans.reduce((sum, loan) => sum + loan.amount, 0);
  
  // Count loans based on paymentStatus
  const paidLoansCount = loans.filter(loan => loan.paymentStatus === "approved").length;
  const unpaidLoansCount = loans.filter(loan => loan.paymentStatus !== "approved").length;
  
  return {
    totalDeposits,
    totalLoans,
    paidLoansCount,
    unpaidLoansCount
  };
};

// Memoized filtering function
const filterUsersBySearch = (users, searchQuery) => {
  if (!searchQuery.trim()) return users;
  
  const query = searchQuery.toLowerCase();
  return users.filter(user => 
    user.user?.name?.toLowerCase().includes(query) ||
    user.user?.email?.toLowerCase().includes(query) ||
    user.user?.phone?.toLowerCase().includes(query)
  );
};

const exportToCSV = (data, filename) => {
  const headers = ['User', 'Total Deposits', 'Total Loans', 'Paid Loans', 'Unpaid Loans'];
  const rows = data.map(user => [
    user.user.name,
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


// Memoized function to group data by month
const groupDataByMonth = (deposits, loans, year) => {
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

// Helper function to get status display and styling based on paymentStatus
const getLoanStatusInfo = (paymentStatus) => {
  if (paymentStatus === "approved") {
    return {
      text: "PAID",
      className: "bg-green-100 text-green-800"
    };
  } else {
    return {
      text: paymentStatus ? paymentStatus.toUpperCase() : "UNPAID",
      className: "bg-red-100 text-red-800"
    };
  }
};

// PAGINATED TABLE COMPONENT
const PaginatedTable = ({ data, columns, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, data.length)}</span> of{' '}
                <span className="font-medium">{data.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// USER REPORT MODAL COMPONENT
const UserReportModal = ({ 
  isOpen, 
  onClose, 
  user, 
  deposits, 
  loans 
}) => {
  if (!isOpen) return null;
  
  const depositColumns = [
    { header: 'Amount', accessor: 'amount', render: (row) => `$${row.amount.toFixed(2)}` },
    { header: 'Date', accessor: 'timestamp', render: (row) => formatDate(row.timestamp) }
  ];
  
  const loanColumns = [
    { header: 'Amount', accessor: 'amount', render: (row) => `$${row.amount.toFixed(2)}` },
    { header: 'Date', accessor: 'timestamp', render: (row) => formatDate(row.timestamp) },
    { 
      header: 'Status', 
      accessor: 'paymentStatus',
      render: (row) => {
        const statusInfo = getLoanStatusInfo(row.paymentStatus);
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.className}`}>
            {statusInfo.text}
          </span>
        );
      }
    }
  ];
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {user.name}'s Report
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-base font-medium">{user.email || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-base font-medium">{user.phone || 'N/A'}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-3">Deposits</h4>
              {deposits.length === 0 ? (
                <p className="text-gray-500">No deposits found</p>
              ) : (
                <PaginatedTable data={deposits} columns={depositColumns} itemsPerPage={5} />
              )}
            </div>
            
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">Loans</h4>
              {loans.length === 0 ? (
                <p className="text-gray-500">No loans found</p>
              ) : (
                <PaginatedTable data={loans} columns={loanColumns} itemsPerPage={5} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// CUSTOM HOOK FOR DEBOUNCED SEARCH (without lodash)
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

// MAIN ANNUAL REPORTS PAGE COMPONENT
const AnnualReportsPage = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyUnpaid, setShowOnlyUnpaid] = useState(false);
  const [users, setUsers] = useState([]);
  const [userReports, setUserReports] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [indexError, setIndexError] = useState({ deposits: null, loans: null });
  
  // Pagination state for users table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  // Use debounced search query to prevent performance issues while typing
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  // Memoize filtered users based on search query and filters
  const filteredUsers = useMemo(() => {
    if (Object.keys(userReports).length === 0) return [];
    
    let filtered = Object.values(userReports);
    
    // Apply search filter
    if (debouncedSearchQuery) {
      filtered = filterUsersBySearch(filtered, debouncedSearchQuery);
    }
    
    // Apply unpaid filter
    if (showOnlyUnpaid) {
      filtered = filtered.filter(report => report.unpaidLoansCount > 0);
    }
    
    return filtered;
  }, [userReports, debouncedSearchQuery, showOnlyUnpaid]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredUsers.length]);
  
  // Memoize chart data to prevent unnecessary recalculations
  const memoizedChartData = useMemo(() => {
    if (!chartData) return null;
    
    return {
      labels: chartData.labels,
      datasets: chartData.datasets
    };
  }, [chartData]);
  
  // Memoize comparison data to prevent unnecessary recalculations
  const memoizedComparisonData = useMemo(() => {
    if (!comparisonData) return null;
    
    return {
      currentYear: {
        totalDeposits: comparisonData.currentYear.totalDeposits,
        totalLoans: comparisonData.currentYear.totalLoans,
        monthlyData: comparisonData.currentYear.monthlyData
      },
      previousYear: {
        totalDeposits: comparisonData.previousYear.totalDeposits,
        totalLoans: comparisonData.previousYear.totalLoans,
        monthlyData: comparisonData.previousYear.monthlyData
      }
    };
  }, [comparisonData]);
  
  // Fetch users data
  const fetchUsers = async () => {
    try {
      const usersQuery = query(collection(db, 'users'));
      const querySnapshot = await getDocs(usersQuery);
      const usersData = [];
      
      querySnapshot.forEach((doc) => {
        usersData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setUsers(usersData);
      return usersData;
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users data');
      return [];
    }
  };
  
  // Fetch deposits for multiple users in parallel
  const fetchDepositsForUsers = async (userIds, startDate, endDate) => {
    try {
      // Try with the composite index query first
      try {
        const depositsQuery = query(
          collection(db, 'deposits'),
          where('userId', 'in', userIds),
          where('timestamp', '>=', startDate),
          where('timestamp', '<=', endDate),
          orderBy('timestamp', 'desc')
        );
        
        const querySnapshot = await getDocs(depositsQuery);
        const depositsData = {};
        
        querySnapshot.forEach((doc) => {
          const deposit = {
            id: doc.id,
            ...doc.data()
          };
          
          if (!depositsData[deposit.userId]) {
            depositsData[deposit.userId] = [];
          }
          depositsData[deposit.userId].push(deposit);
        });
        
        return depositsData;
      } catch (indexErr) {
        // If index error occurs, fall back to a simpler query
        if (indexErr.message.includes('requires an index')) {
          console.warn('Index not found for deposits query, using fallback');
          setIndexError(prev => ({ ...prev, deposits: indexErr.message }));
          
          // Fallback: get all deposits and filter in JavaScript
          const depositsQuery = query(
            collection(db, 'deposits'),
            where('userId', 'in', userIds)
          );
          
          const querySnapshot = await getDocs(depositsQuery);
          const depositsData = {};
          
          querySnapshot.forEach((doc) => {
            const deposit = {
              id: doc.id,
              ...doc.data()
            };
            
            // Filter by date range in JavaScript
            const depositDate = deposit.timestamp.toDate ? deposit.timestamp.toDate() : new Date(deposit.timestamp);
            if (depositDate >= startDate && depositDate <= endDate) {
              if (!depositsData[deposit.userId]) {
                depositsData[deposit.userId] = [];
              }
              depositsData[deposit.userId].push(deposit);
            }
          });
          
          // Sort in JavaScript for each user
          Object.keys(depositsData).forEach(userId => {
            depositsData[userId].sort((a, b) => {
              const dateA = a.timestamp.toDate ? a.timestamp.toDate() : new Date(a.timestamp);
              const dateB = b.timestamp.toDate ? b.timestamp.toDate() : new Date(b.timestamp);
              return dateB - dateA; // Descending order
            });
          });
          
          return depositsData;
        } else {
          throw indexErr;
        }
      }
    } catch (err) {
      console.error('Error fetching deposits:', err);
      return {};
    }
  };
  
  // Fetch loans for multiple users in parallel
  const fetchLoansForUsers = async (userIds, startDate, endDate) => {
    try {
      // Try with the composite index query first
      try {
        const loansQuery = query(
          collection(db, 'loans'),
          where('userId', 'in', userIds),
          where('timestamp', '>=', startDate),
          where('timestamp', '<=', endDate),
          orderBy('timestamp', 'desc')
        );
        
        const querySnapshot = await getDocs(loansQuery);
        const loansData = {};
        
        querySnapshot.forEach((doc) => {
          const loan = {
            id: doc.id,
            ...doc.data()
          };
          
          if (!loansData[loan.userId]) {
            loansData[loan.userId] = [];
          }
          loansData[loan.userId].push(loan);
        });
        
        return loansData;
      } catch (indexErr) {
        // If index error occurs, fall back to a simpler query
        if (indexErr.message.includes('requires an index')) {
          console.warn('Index not found for loans query, using fallback');
          setIndexError(prev => ({ ...prev, loans: indexErr.message }));
          
          // Fallback: get all loans and filter in JavaScript
          const loansQuery = query(
            collection(db, 'loans'),
            where('userId', 'in', userIds)
          );
          
          const querySnapshot = await getDocs(loansQuery);
          const loansData = {};
          
          querySnapshot.forEach((doc) => {
            const loan = {
              id: doc.id,
              ...doc.data()
            };
            
            // Filter by date range in JavaScript
            const loanDate = loan.timestamp.toDate ? loan.timestamp.toDate() : new Date(loan.timestamp);
            if (loanDate >= startDate && loanDate <= endDate) {
              if (!loansData[loan.userId]) {
                loansData[loan.userId] = [];
              }
              loansData[loan.userId].push(loan);
            }
          });
          
          // Sort in JavaScript for each user
          Object.keys(loansData).forEach(userId => {
            loansData[userId].sort((a, b) => {
              const dateA = a.timestamp.toDate ? a.timestamp.toDate() : new Date(a.timestamp);
              const dateB = b.timestamp.toDate ? b.timestamp.toDate() : new Date(b.timestamp);
              return dateB - dateA; // Descending order
            });
          });
          
          return loansData;
        } else {
          throw indexErr;
        }
      }
    } catch (err) {
      console.error('Error fetching loans:', err);
      return {};
    }
  };
  
  // Fetch all user reports for the selected year/month
  const fetchUserReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const usersData = await fetchUsers();
      const reports = {};
      let allDeposits = [];
      let allLoans = [];
      
      // Determine date range based on selected year and month
      let startDate, endDate;
      
      if (selectedMonth === 'all') {
        startDate = getStartOfYear(selectedYear);
        endDate = getEndOfYear(selectedYear);
      } else {
        startDate = getStartOfMonth(selectedYear, parseInt(selectedMonth));
        endDate = getEndOfMonth(selectedYear, parseInt(selectedMonth));
      }
      
      // Get user IDs
      const userIds = usersData.map(user => user.id);
      
      // Split userIds into chunks of 10 (Firestore limit for 'in' queries)
      const userIdChunks = [];
      for (let i = 0; i < userIds.length; i += 10) {
        userIdChunks.push(userIds.slice(i, i + 10));
      }
      
      // Fetch data for all users in parallel
      const depositsPromises = userIdChunks.map(chunk => fetchDepositsForUsers(chunk, startDate, endDate));
      const loansPromises = userIdChunks.map(chunk => fetchLoansForUsers(chunk, startDate, endDate));
      
      const depositsResults = await Promise.all(depositsPromises);
      const loansResults = await Promise.all(loansPromises);
      
      // Combine results from all chunks
      const allDepositsData = {};
      const allLoansData = {};
      
      depositsResults.forEach(result => {
        Object.keys(result).forEach(userId => {
          allDepositsData[userId] = result[userId];
          allDeposits = [...allDeposits, ...result[userId]];
        });
      });
      
      loansResults.forEach(result => {
        Object.keys(result).forEach(userId => {
          allLoansData[userId] = result[userId];
          allLoans = [...allLoans, ...result[userId]];
        });
      });
      
      // Calculate totals for each user
      usersData.forEach(user => {
        const userDeposits = allDepositsData[user.id] || [];
        const userLoans = allLoansData[user.id] || [];
        
        // Calculate totals using the memoized function
        const totals = calculateUserTotals(userDeposits, userLoans);
        
        reports[user.id] = {
          user,
          deposits: userDeposits,
          loans: userLoans,
          ...totals
        };
      });
      
      // Prepare chart data
      const monthlyData = groupDataByMonth(allDeposits, allLoans, selectedYear);
      setChartData({
        labels: monthlyData.map(item => item.month),
        datasets: [
          {
            label: 'Deposits',
            data: monthlyData.map(item => item.deposits),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
          {
            label: 'Loans',
            data: monthlyData.map(item => item.loans),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ]
      });
      
      // Fetch comparison data (previous year)
      const prevYearStartDate = getStartOfYear(selectedYear - 1);
      const prevYearEndDate = getEndOfYear(selectedYear - 1);
      
      // Fetch previous year data in parallel
      const prevDepositsPromises = userIdChunks.map(chunk => fetchDepositsForUsers(chunk, prevYearStartDate, prevYearEndDate));
      const prevLoansPromises = userIdChunks.map(chunk => fetchLoansForUsers(chunk, prevYearStartDate, prevYearEndDate));
      
      const prevDepositsResults = await Promise.all(prevDepositsPromises);
      const prevLoansResults = await Promise.all(prevLoansPromises);
      
      // Combine previous year results
      let prevYearDeposits = [];
      let prevYearLoans = [];
      
      prevDepositsResults.forEach(result => {
        Object.keys(result).forEach(userId => {
          prevYearDeposits = [...prevYearDeposits, ...result[userId]];
        });
      });
      
      prevLoansResults.forEach(result => {
        Object.keys(result).forEach(userId => {
          prevYearLoans = [...prevYearLoans, ...result[userId]];
        });
      });
      
      const prevYearMonthlyData = groupDataByMonth(prevYearDeposits, prevYearLoans, selectedYear - 1);
      
      setComparisonData({
        currentYear: {
          totalDeposits: allDeposits.reduce((sum, d) => sum + d.amount, 0),
          totalLoans: allLoans.reduce((sum, l) => sum + l.amount, 0),
          monthlyData
        },
        previousYear: {
          totalDeposits: prevYearDeposits.reduce((sum, d) => sum + d.amount, 0),
          totalLoans: prevYearLoans.reduce((sum, l) => sum + l.amount, 0),
          monthlyData: prevYearMonthlyData
        }
      });
      
      setUserReports(reports);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user reports:', err);
      setError('Failed to fetch reports data');
      setLoading(false);
    }
  }, [selectedYear, selectedMonth]);
  
  // Handle opening user details modal
  const handleViewDetails = useCallback((userId) => {
    setSelectedUser(userId);
    setIsModalOpen(true);
  }, []);
  
  // Handle closing modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);
  
  // Handle export functions
  const handleExportCSV = useCallback(() => {
    const data = Object.values(userReports);
    exportToCSV(data, `annual-reports-${selectedYear}.csv`);
  }, [userReports, selectedYear]);
  
  const handleExportPDF = useCallback(() => {
    const data = Object.values(userReports);
    const result = exportToPDF(data, selectedYear);
    
    if (result.success) {
      console.log(`PDF "${result.filename}" generated successfully!`);
      // You can show a success message to the user here
    } else {
      console.error('Failed to generate PDF:', result.error);
      // You can show an error message to the user here
    }
  }, [userReports, selectedYear]);
  
  // Fetch data when year or month changes
  useEffect(() => {
    fetchUserReports();
  }, [fetchUserReports]);
  
  // Generate year options for dropdown
  const generateYearOptions = () => {
    const options = [];
    for (let year = currentYear; year >= 2022; year--) {
      options.push(year);
    }
    return options;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Annual Reports</h1>
      
      {/* Index Error Notification */}
      {(indexError.deposits || indexError.loans) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Some queries require Firestore indexes for optimal performance. We're using fallback queries, but you can create the indexes for better performance:
              </p>
              <div className="mt-2">
                {indexError.deposits && (
                  <a 
                    href="https://console.firebase.google.com/v1/r/project/ecommerce-74229/firestore/indexes?create_composite=ClBwcm9qZWN0cy9lY29tbWVyY2UtNzQyMjkvZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9uR3JvdXBzL2RlcG9zaXRzL2luZGV4ZXMvXxABGgoKBnVzZXJJZBABGg0KCXRpbWVzdGFtcBACGgwKCF9fbmFtZV9fEAI"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 mr-4"
                  >
                    Create Deposits Index
                  </a>
                )}
                {indexError.loans && (
                  <a 
                    href="https://console.firebase.google.com/v1/r/project/ecommerce-74229/firestore/indexes?create_composite=Ck1wcm9qZWN0cy9lY29tbWVyY2UtNzQyMjkvZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9uR3JvdXBzL2xvYW5zL2luZGV4ZXMvXxABGgoKBnVzZXJJZBABGg0KCXRpbWVzdGFtcBACGgwKCF9fbmFtZV9fEAI"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Create Loans Index
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Filters Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              id="year"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {generateYearOptions().map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
              Month (Optional)
            </label>
            <select
              id="month"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">All Months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search User
            </label>
            <input
              type="text"
              id="search"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Name, email, or phone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-end">
            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={fetchUserReports}
            >
              Apply Filters
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center">
            <input
              id="showUnpaid"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={showOnlyUnpaid}
              onChange={(e) => setShowOnlyUnpaid(e.target.checked)}
            />
            <label htmlFor="showUnpaid" className="ml-2 block text-sm text-gray-700">
              Show only users with unpaid loans
            </label>
          </div>
          
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={handleExportCSV}
          >
            Export CSV
          </button>
          
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={handleExportPDF}
          >
            Export PDF
          </button>
        </div>
      </div>
      
      {/* Comparison Section */}
      {memoizedComparisonData && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Year Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-2">Total Deposits</h3>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-green-600">
                  ${memoizedComparisonData.currentYear.totalDeposits.toFixed(2)}
                </div>
                <div className="ml-4 text-sm text-gray-500">
                  {memoizedComparisonData.currentYear.totalDeposits > memoizedComparisonData.previousYear.totalDeposits ? (
                    <span className="text-green-600">↑ {((memoizedComparisonData.currentYear.totalDeposits - memoizedComparisonData.previousYear.totalDeposits) / memoizedComparisonData.previousYear.totalDeposits * 100).toFixed(1)}%</span>
                  ) : (
                    <span className="text-red-600">↓ {((memoizedComparisonData.previousYear.totalDeposits - memoizedComparisonData.currentYear.totalDeposits) / memoizedComparisonData.previousYear.totalDeposits * 100).toFixed(1)}%</span>
                  )}
                  <span> vs {selectedYear - 1}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-2">Total Loans</h3>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-600">
                  ${memoizedComparisonData.currentYear.totalLoans.toFixed(2)}
                </div>
                <div className="ml-4 text-sm text-gray-500">
                  {memoizedComparisonData.currentYear.totalLoans > memoizedComparisonData.previousYear.totalLoans ? (
                    <span className="text-green-600">↑ {((memoizedComparisonData.currentYear.totalLoans - memoizedComparisonData.previousYear.totalLoans) / memoizedComparisonData.previousYear.totalLoans * 100).toFixed(1)}%</span>
                  ) : (
                    <span className="text-red-600">↓ {((memoizedComparisonData.previousYear.totalLoans - memoizedComparisonData.currentYear.totalLoans) / memoizedComparisonData.previousYear.totalLoans * 100).toFixed(1)}%</span>
                  )}
                  <span> vs {selectedYear - 1}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Chart Section */}
      {memoizedChartData && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Deposits vs Loans by Month</h2>
          <div className="h-64">
            <Line
              data={memoizedChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
      
      {/* Users Summary Table with Pagination */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Users Summary</h2>
        </div>
        
        {loading ? (
          <div className="px-6 py-4 text-center">
            <p className="text-gray-500">Loading reports...</p>
          </div>
        ) : error ? (
          <div className="px-6 py-4 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="px-6 py-4 text-center">
            <p className="text-gray-500">No users found</p>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Deposits
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Loans
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paid Loans
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unpaid Loans
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.map((report) => (
                    <tr key={report.user.id} className={report.unpaidLoansCount > 0 ? 'border-l-4 border-red-500' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-gray-600 font-medium">
                                {report.user.name ? report.user.name.charAt(0).toUpperCase() : 'U'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {report.user.name || 'Unknown User'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {report.user.email || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${report.totalDeposits.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${report.totalLoans.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.paidLoansCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          report.unpaidLoansCount > 0 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {report.unpaidLoansCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(report.user.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                         viewDetails
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(endIndex, filteredUsers.length)}</span> of{' '}
                      <span className="font-medium">{filteredUsers.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === page
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* User Details Modal */}
      {selectedUser && (
        <UserReportModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={userReports[selectedUser].user}
          deposits={userReports[selectedUser].deposits}
          loans={userReports[selectedUser].loans}
        />
      )}
    </div>
  );
};

export default AnnualReportsPage;