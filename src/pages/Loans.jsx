import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Filter,
  Wallet,
  Banknote
} from "lucide-react";

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [processing, setProcessing] = useState({});
  const [receiptFiles, setReceiptFiles] = useState({});

  // 🟢 Listen to USERS collection in real-time
  useEffect(() => {
    const userQuery = query(collection(db, "users"));
    const unsubUsers = onSnapshot(userQuery, 
      (snapshot) => {
        const userData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
        setUsersLoaded(true);
        // Console log sample for debugging
        console.log(`Loaded ${userData.length} users`);
      },
      (err) => {
        console.error("Error loading users:", err);
        setError("Failed to load users: " + err.message);
        setUsersLoaded(true); // Still set to true to avoid infinite loading
      }
    );
    return () => unsubUsers();
  }, []);

  // 🟣 Listen to LOANS collection and merge with USERS
  useEffect(() => {
    // Only proceed if users have been loaded (or failed to load)
    if (!usersLoaded) return;
    
    const loanQuery = query(
      collection(db, "loans"),
      orderBy("timestamp", "desc")
    );

    const unsubLoans = onSnapshot(loanQuery, (snapshot) => {
      const loanData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Debug logging to see what we're working with
      console.log(`Processing ${loanData.length} loans with ${users.length} users`);

      // Merge loans with corresponding user fullName and email
      const mergedData = loanData.map(loan => {
        // Match loan.userId to users.id (VERY IMPORTANT)
        // Normalize IDs for comparison
        const normalizeId = (id) => {
          if (typeof id === 'string') {
            return id.trim();
          }
          if (id !== null && id !== undefined) {
            return String(id).trim();
          }
          return '';
        };
        
        const loanUserId = normalizeId(loan.userId);
        
        // Find user with robust ID matching
        let user = users.find(u => {
          const userId = normalizeId(u.id);
          return userId === loanUserId && userId !== '';
        });
        
        // Debug logging for mismatches - only log if there are mismatches
        if (!user && loanUserId) {
          // Log only the first few mismatches to avoid console spam
          if (loanData.filter(l => !users.find(u => normalizeId(u.id) === normalizeId(l.userId))).length < 5) {
            console.log(`No user found for loan ID: ${loan.id} with normalized userId: '${loanUserId}'`);
            console.log("Available normalized user IDs:", users.map(u => `('${normalizeId(u.id)}')`).slice(0, 10));
          }
        }

        return {
          ...loan,
          userFullName: user ? (user.fullName || user.name || "Unknown name") : (loan.userId ? `Unknown User (${loan.userId})` : "Unknown User (No ID Provided)"),
          userEmail: user ? (user.email || "No Email Found") : "No Email Found",
        };
      });

      console.log(`Merged ${mergedData.length} loans with user data`);

      setLoans(mergedData);
      setLoading(false);
    }, (err) => {
      console.error("Error loading loans:", err);
      setError("Failed to load loans: " + err.message);
      setLoading(false);
    });

    return () => unsubLoans();
  }, [users, usersLoaded]);

  // 🔵 Utility functions
  const getStatusClass = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "denied":
        return "bg-red-100 text-red-800";
      case "Pending":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const updateLoanStatus = async (loanId, newStatus) => {
    try {
      const loanRef = doc(db, "loans", loanId);
      await updateDoc(loanRef, { status: newStatus });
      console.log(`Loan ${loanId} status updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating loan status:", err);
      setError("Failed to update loan status: " + err.message);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    if (timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    if (timestamp.toDate) {
      const date = timestamp.toDate();
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    return timestamp.toString();
  };

  // 🔁 Handle receipt file selection
  const handleReceiptFileChange = (loanId, event) => {
    const file = event.target.files[0];
    if (file) {
      setReceiptFiles(prev => ({ ...prev, [loanId]: file }));
    }
  };

  // ☁️ Upload to Cloudinary
  const uploadToCloudinary = async (file) => {
    const CLOUD_NAME = "dlrxomdfh";
    const UPLOAD_PRESET = "Shop-preset";

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUD_NAME);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    );

    const json = await res.json();
    return json.secure_url;
  };

  // ✅ Accept loan with receipt upload
  const acceptLoanWithReceipt = async (loanId) => {
    const ok = window.confirm("Are you sure you want to accept this loan?");
    if (!ok) return;

    if (!receiptFiles[loanId]) {
      alert("Please upload a receipt image before accepting the loan.");
      return;
    }

    setProcessing(prev => ({ ...prev, [loanId]: true }));
    
    try {
      // Upload receipt to Cloudinary
      const imageUrl = await uploadToCloudinary(receiptFiles[loanId]);

      // Update loan document
      const loanRef = doc(db, "loans", loanId);
      await updateDoc(loanRef, {
        status: "accepted",
        receiptUrl: imageUrl,
        acceptedAt: serverTimestamp(),
      });

      // Clean up the receipt file from state
      setReceiptFiles(prev => {
        const updated = { ...prev };
        delete updated[loanId];
        return updated;
      });
    } catch (err) {
      console.error("Error accepting loan:", err);
      setError("Failed to accept loan: " + err.message);
    } finally {
      setProcessing(prev => {
        const copy = { ...prev };
        delete copy[loanId];
        return copy;
      });
    }
  };

  // ❌ Deny loan
  const denyLoan = async (loanId) => {
    const ok = window.confirm("Are you sure you want to deny this loan?");
    if (!ok) return;

    setProcessing(prev => ({ ...prev, [loanId]: true }));
    
    try {
      const loanRef = doc(db, "loans", loanId);
      await updateDoc(loanRef, {
        status: "denied",
        deniedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error denying loan:", err);
      setError("Failed to deny loan: " + err.message);
    } finally {
      setProcessing(prev => {
        const copy = { ...prev };
        delete copy[loanId];
        return copy;
      });
    }
  };

  // 🧮 Calculations
  const totalLoans = loans.reduce((sum, l) => sum + (parseFloat(l.amount) || 0), 0);
  const pendingLoans = loans.filter(l => l.status === 'pending').length;
  const paidLoans = loans.filter(l => l.status === 'accepted').length;
  const declinedLoans = loans.filter(l => l.status === 'denied').length;
  const totalPaidAmount = loans.filter(l => l.status === 'accepted').reduce((sum, l) => sum + (parseFloat(l.amount) || 0), 0);
  const totalDeclinedAmount = loans.filter(l => l.status === 'denied').reduce((sum, l) => sum + (parseFloat(l.amount) || 0), 0);

  // 🔍 Filters - Fixed to use userFullName instead of userName
  const filteredLoans = loans.filter(l => {
    const matchesSearch = 
      (l.userFullName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.userId?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.message?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 🔓 Loading and error states
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading loans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
        <p className="text-red-500">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total loans</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">${totalLoans.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending loans</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{pendingLoans}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Paid loans</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{paidLoans}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Banknote className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Declined loans</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{declinedLoans}</p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Accepted Amount</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">${totalPaidAmount.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Declined Amount</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">${totalDeclinedAmount.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h2 className="text-lg font-medium text-gray-900">Loans Records</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, user ID or message..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg bg-gray-50"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="accepted">Paid</option>
                <option value="denied">Declined</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLoans.length > 0 ? (
                filteredLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-gray-50 transition-colors duration-150">
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {loan.userFullName}
                      </div>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {loan.userEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ${loan.amount ? parseFloat(loan.amount).toFixed(2) : '0.00'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(loan.status)}`}>
                        {loan.status === "accepted" ? "Paid" : loan.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTimestamp(loan.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        {loan.status === 'pending' ? (
                          <div className="flex flex-col space-y-2">
                            <div className="flex flex-col space-y-2">
                              <label className="text-xs text-gray-500">Upload receipt</label>
                              <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleReceiptFileChange(loan.id, e)}
                                className="block text-sm border rounded-lg p-1 cursor-pointer bg-gray-50"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                disabled={!!processing[loan.id] || !receiptFiles[loan.id]}
                                onClick={() => acceptLoanWithReceipt(loan.id)}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                  !receiptFiles[loan.id] || processing[loan.id]
                                    ? "opacity-50 cursor-not-allowed"
                                    : "bg-green-600 text-white hover:bg-green-700"
                                }`}
                              >
                                {processing[loan.id] ? 'Processing...' : 'Accept'}
                              </button>

                              <button
                                disabled={!!processing[loan.id]}
                                onClick={() => denyLoan(loan.id)}
                                className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 disabled:opacity-50"
                              >
                                {processing[loan.id] ? 'Processing...' : 'Deny'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">{loan.status === 'accepted' ? 'Paid' : loan.status}</span>
                        )}

                        {loan.receiptUrl && (
                          <button
                            onClick={() => window.open(loan.receiptUrl, '_blank')}
                            className="text-indigo-600 hover:text-indigo-900 flex items-center"
                            title="View receipt"
                          >
                            <Wallet className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No loans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Loans;