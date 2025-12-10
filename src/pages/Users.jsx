import React, { useEffect, useState, useRef } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, orderBy, query, updateDoc, doc } from 'firebase/firestore';
import { Search, X, Eye, Download, Check, XCircle, DollarSign, FileText, Clock, CheckCircle, XCircle as XCircleIcon } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deposits, setDeposits] = useState([]);
  const [loans, setLoans] = useState([]);
  const [depositsLoading, setDepositsLoading] = useState(false);
  const [loansLoading, setLoansLoading] = useState(false);
  const [depositsError, setDepositsError] = useState(null);
  const [loansError, setLoansError] = useState(null);
  const [processingItems, setProcessingItems] = useState({});
  
  // Refs for unsubscribing from listeners
  const depositsUnsubRef = useRef(null);
  const loansUnsubRef = useRef(null);

  useEffect(() => {
    if (!db) {
      setError('Firestore instance not available');
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'users'));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        try {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          
          // Sort users: those with createdAt first (descending), then those without createdAt
          const sortedData = data.sort((a, b) => {
            // If both have createdAt, sort by createdAt descending
            if (a.createdAt && b.createdAt) {
              return b.createdAt.toMillis() - a.createdAt.toMillis();
            }
            // If only a has createdAt, a comes first
            if (a.createdAt) {
              return -1;
            }
            // If only b has createdAt, b comes first
            if (b.createdAt) {
              return 1;
            }
            // If neither has createdAt, maintain relative order
            return 0;
          });
          
          setUsers(sortedData);
          setLoading(false);
        } catch (err) {
          console.error('Error processing users snapshot:', err);
          setError('Failed to process users data');
          setLoading(false);
        }
      },
      (err) => {
        console.error('Error fetching users:', err);
        if (err.code === 'permission-denied') {
          setError('Permission denied. Check Firestore rules.');
        } else {
          setError('Failed to load users: ' + (err.message || 'Unknown error'));
        }
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  // Set up listeners for the selected user's deposits and loans
  // This effect runs whenever a user is selected, not just when the modal is open
  useEffect(() => {
    // Clean up any existing listeners
    if (depositsUnsubRef.current) {
      depositsUnsubRef.current();
      depositsUnsubRef.current = null;
    }
    if (loansUnsubRef.current) {
      loansUnsubRef.current();
      loansUnsubRef.current = null;
    }

    // If no user is selected, don't set up new listeners
    if (!selectedUser) {
      setDeposits([]);
      setLoans([]);
      return;
    }

    // Set up deposits listener
    setDepositsLoading(true);
    setDepositsError(null);
    const depositsQuery = query(
      collection(db, 'deposits'),
      orderBy('timestamp', 'desc')
    );
    
    depositsUnsubRef.current = onSnapshot(
      depositsQuery,
      (snapshot) => {
        try {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          // Filter client-side by userId
          const userDeposits = data.filter(deposit => deposit.userId === selectedUser.uid);
          setDeposits(userDeposits);
          setDepositsLoading(false);
        } catch (err) {
          console.error('Error processing deposits snapshot:', err);
          setDepositsError('Failed to process deposits data');
          setDepositsLoading(false);
        }
      },
      (err) => {
        console.error('Error fetching deposits:', err);
        setDepositsError('Failed to load deposits: ' + (err.message || 'Unknown error'));
        setDepositsLoading(false);
      }
    );

    // Set up loans listener
    setLoansLoading(true);
    setLoansError(null);
    const loansQuery = query(
      collection(db, 'loans'),
      orderBy('timestamp', 'desc')
    );
    
    loansUnsubRef.current = onSnapshot(
      loansQuery,
      (snapshot) => {
        try {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          // Filter client-side by userId
          const userLoans = data.filter(loan => loan.userId === selectedUser.uid);
          setLoans(userLoans);
          setLoansLoading(false);
        } catch (err) {
          console.error('Error processing loans snapshot:', err);
          setLoansError('Failed to process loans data');
          setLoansLoading(false);
        }
      },
      (err) => {
        console.error('Error fetching loans:', err);
        setLoansError('Failed to load loans: ' + (err.message || 'Unknown error'));
        setLoansLoading(false);
      }
    );

    // Return cleanup function
    return () => {
      if (depositsUnsubRef.current) {
        depositsUnsubRef.current();
        depositsUnsubRef.current = null;
      }
      if (loansUnsubRef.current) {
        loansUnsubRef.current();
        loansUnsubRef.current = null;
      }
    };
  }, [selectedUser]); // Only depends on selectedUser, not showModal

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    // Firestore Timestamp object
    if (timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString();
    }
    if (timestamp.toDate) {
      const date = timestamp.toDate();
      return date.toLocaleString();
    }
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return String(timestamp);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'denied':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Don't clear selectedUser here to keep listeners active
    // This allows the data to stay updated even when modal is closed
  };

  const handleApproveDeny = async (collectionName, itemId, newStatus) => {
    setProcessingItems(prev => ({ ...prev, [itemId]: true }));
    
    try {
      await updateDoc(doc(db, collectionName, itemId), {
        status: newStatus,
        updatedAt: new Date()
      });
    } catch (err) {
      console.error(`Error updating ${collectionName} status:`, err);
    } finally {
      setProcessingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleViewImage = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  const handleDownloadImage = (imageUrl, fileName) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName || 'proof-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate summary statistics - these will now update in real-time
  const totalDepositsAmount = deposits.reduce((sum, deposit) => sum + (deposit.amount || 0), 0);
  const totalLoansAmount = loans.reduce((sum, loan) => sum + (loan.amount || 0), 0);
  
  const depositStatusCounts = {
    pending: deposits.filter(d => d.status === 'pending').length,
    accepted: deposits.filter(d => d.status === 'accepted').length,
    denied: deposits.filter(d => d.status === 'denied' || d.status === 'rejected').length
  };
  
  const loanStatusCounts = {
    pending: loans.filter(l => l.status === 'pending').length,
    accepted: loans.filter(l => l.status === 'accepted').length,
    denied: loans.filter(l => l.status === 'denied' || l.status === 'rejected').length
  };

  const filtered = users.filter((u) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      (u.fullName || '').toLowerCase().includes(term) ||
      (u.email || '').toLowerCase().includes(term) ||
      (u.phoneNumber || '').toLowerCase().includes(term) ||
      (u.uid || '').toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m0-4a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:col-span-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h2 className="text-lg font-medium text-gray-900">User Records</h2>
            <div className="flex items-center w-full sm:w-64">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.length > 0 ? (
                filtered.map((u) => (
                  <tr 
                    key={u.id} 
                    className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    onClick={() => handleUserClick(u)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {u.imageUrl ? (
                          <img src={u.imageUrl} alt={u.fullName || 'avatar'} className="h-10 w-10 rounded-full object-cover" onError={(e)=>{e.target.style.display='none'}} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
                            { (u.fullName || 'U').split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase() }
                          </div>
                        )}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{u.fullName || 'No name'}</div>
                          <div className="text-xs text-gray-500">{u.uid || ''}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.phoneNumber || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{u.gender || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.age || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimestamp(u.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">User Details: {selectedUser.fullName}</h2>
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* User Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-4">
                  {selectedUser.imageUrl ? (
                    <img src={selectedUser.imageUrl} alt={selectedUser.fullName || 'avatar'} className="h-16 w-16 rounded-full object-cover mr-4" />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium text-gray-700 mr-4">
                      { (selectedUser.fullName || 'U').split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase() }
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{selectedUser.fullName || 'No name'}</h3>
                    <p className="text-sm text-gray-500">ID: {selectedUser.uid || 'N/A'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{selectedUser.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone Number</p>
                    <p className="text-sm text-gray-900">{selectedUser.phoneNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">MoMo Number</p>
                    <p className="text-sm text-gray-900">{selectedUser.momoNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Credit card Number</p>
                    <p className="text-sm text-gray-900">{selectedUser.creditCardNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gender</p>
                    <p className="text-sm text-gray-900 capitalize">{selectedUser.gender || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Age</p>
                    <p className="text-sm text-gray-900">{selectedUser.age || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Joined Date</p>
                    <p className="text-sm text-gray-900">{formatTimestamp(selectedUser.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Deposits Summary */}
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-green-100 mr-3">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Deposits Summary</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Total Amount:</span>
                      <span className="text-sm font-medium text-gray-900">${totalDepositsAmount.toFixed(2)}</span>
                    </div>
                    {/* <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <Clock className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Pending</p>
                        <p className="text-sm font-medium text-gray-900">{depositStatusCounts.pending}</p>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Accepted</p>
                        <p className="text-sm font-medium text-gray-900">{depositStatusCounts.accepted}</p>
                      </div>
                      <div className="text-center p-2 bg-red-50 rounded">
                        <XCircleIcon className="h-5 w-5 text-red-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Denied</p>
                        <p className="text-sm font-medium text-gray-900">{depositStatusCounts.denied}</p>
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* Loans Summary */}
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-blue-100 mr-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Loans Summary</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Total Amount:</span>
                      <span className="text-sm font-medium text-gray-900">${totalLoansAmount.toFixed(2)}</span>
                    </div>
                    {/* <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <Clock className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Pending</p>
                        <p className="text-sm font-medium text-gray-900">{loanStatusCounts.pending}</p>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Accepted</p>
                        <p className="text-sm font-medium text-gray-900">{loanStatusCounts.accepted}</p>
                      </div>
                      <div className="text-center p-2 bg-red-50 rounded">
                        <XCircleIcon className="h-5 w-5 text-red-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Denied</p>
                        <p className="text-sm font-medium text-gray-900">{loanStatusCounts.denied}</p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Deposits Section */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Deposits</h3>
                {depositsLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                ) : depositsError ? (
                  <div className="bg-red-50 p-4 rounded-md">
                    <p className="text-sm text-red-800">{depositsError}</p>
                  </div>
                ) : deposits.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proof</th>
                          {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {deposits.map((deposit) => (
                          <tr key={deposit.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${deposit.amount || '0'}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(deposit.status)}`}>
                                {deposit.status || 'Unknown'}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatTimestamp(deposit.timestamp)}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate" title={deposit.message}>{deposit.message || 'N/A'}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {deposit.proofImage ? (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleViewImage(deposit.proofImage)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                    title="View"
                                  >
                                    <Eye className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDownloadImage(deposit.proofImage, `deposit-proof-${deposit.id}.jpg`)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                    title="Download"
                                  >
                                    <Download className="h-5 w-5" />
                                  </button>
                                </div>
                              ) : (
                                'N/A'
                              )}
                            </td>
                            {/* <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              {deposit.status === 'pending' && (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleApproveDeny('deposits', deposit.id, 'accepted')}
                                    disabled={processingItems[deposit.id]}
                                    className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                    title="Approve"
                                  >
                                    {processingItems[deposit.id] ? (
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                                    ) : (
                                      <Check className="h-4 w-4" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleApproveDeny('deposits', deposit.id, 'denied')}
                                    disabled={processingItems[deposit.id]}
                                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                    title="Deny"
                                  >
                                    {processingItems[deposit.id] ? (
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                    ) : (
                                      <XCircle className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              )}
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-sm text-gray-500">No deposits found.</div>
                )}
              </div>

              {/* Loans Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Loans</h3>
                {loansLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                ) : loansError ? (
                  <div className="bg-red-50 p-4 rounded-md">
                    <p className="text-sm text-red-800">{loansError}</p>
                  </div>
                ) : loans.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved By</th>
                          {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {loans.map((loan) => (
                          <tr key={loan.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${loan.amount || '0'}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(loan.status)}`}>
                                {loan.status || 'Unknown'}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatTimestamp(loan.timestamp)}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate" title={loan.reason}>{loan.reason || 'N/A'}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{loan.approvedBy || 'N/A'}</td>
                            {/* <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              {loan.status === 'pending' && (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleApproveDeny('loans', loan.id, 'accepted')}
                                    disabled={processingItems[loan.id]}
                                    className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                    title="Approve"
                                  >
                                    {processingItems[loan.id] ? (
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                                    ) : (
                                      <Check className="h-4 w-4" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleApproveDeny('loans', loan.id, 'denied')}
                                    disabled={processingItems[loan.id]}
                                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                    title="Deny"
                                  >
                                    {processingItems[loan.id] ? (
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                    ) : (
                                      <XCircle className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              )}
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-sm text-gray-500">No loans found.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;