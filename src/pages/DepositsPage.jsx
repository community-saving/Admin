import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Filter,
  Eye,
  Download
} from "lucide-react";
import { useTranslation } from 'react-i18next'; // Import useTranslation

const DepositsPage = () => {
  const [deposits, setDeposits] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState({});
  
  const { t } = useTranslation(); // Use translation hook

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
      },
      (err) => {
        console.error("Error loading users:", err);
        setError(t('error_load_users') + err.message);
      }
    );
    return () => unsubUsers();
  }, []);

  // 🟢 Listen to DEPOSITS collection in real-time
  useEffect(() => {
    if (!db) {
      setError(t('error_firestore_instance'));
      setLoading(false);
      return;
    }

    const q = query(collection(db, "deposits"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        try {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDeposits(data);
          setLoading(false);
        } catch (err) {
          console.error("Error processing deposits snapshot:", err);
          setError(t('error_process_deposits_data'));
          setLoading(false);
        }
      },
      (err) => {
        console.error("Error fetching deposits:", err);
        setError(t('error_load_deposits') + err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const getUserById = (userId) => {
    return users.find(user => user.id === userId) || { name: t('unknown_user'), email: '' };
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return t('n_a');
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleString();
    } catch (error) {
      return t('invalid_date');
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

  const handleApproveDeny = async (depositId, newStatus) => {
    setProcessing(prev => ({ ...prev, [depositId]: true }));
    
    try {
      await updateDoc(doc(db, "deposits", depositId), {
        status: newStatus,
        updatedAt: new Date()
      });
    } catch (err) {
      console.error(`Error updating deposit status:`, err);
      setError(t('error_update_deposit_status') + err.message);
    } finally {
      setProcessing(prev => ({ ...prev, [depositId]: false }));
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

  const filteredDeposits = deposits.filter(deposit => {
    const user = getUserById(deposit.userId);
    const term = searchTerm.toLowerCase();
    
    // Search filter
    const matchesSearch = !searchTerm || 
      (user.name && user.name.toLowerCase().includes(term)) ||
      (user.email && user.email.toLowerCase().includes(term)) ||
      (deposit.message && deposit.message.toLowerCase().includes(term));
    
    // Status filter
    const matchesStatus = statusFilter === 'All' || deposit.status === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('deposits')}</h1>
        <p className="mt-1 text-gray-600">{t('deposits_page_description')}</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t('search_deposits')}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="All">{t('all_statuses')}</option>
              <option value="Pending">{t('pending')}</option>
              <option value="Accepted">{t('accepted')}</option>
              <option value="Denied">{t('denied')}</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('total_deposits')}</p>
              <p className="text-2xl font-bold text-gray-900">
                ${deposits.reduce((sum, deposit) => sum + (parseFloat(deposit.amount) || 0), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('pending_deposits')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {deposits.filter(d => d.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('accepted_deposits')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {deposits.filter(d => d.status === 'accepted').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deposits Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('user')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('amount')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('status')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('date')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('message')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('proof')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeposits.length > 0 ? (
                filteredDeposits.map((deposit) => {
                  const user = getUserById(deposit.userId);
                  return (
                    <tr key={deposit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-800 font-medium">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name || t('unknown_user')}</div>
                            <div className="text-sm text-gray-500">{user.email || t('n_a')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">${deposit.amount || '0.00'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(deposit.status)}`}>
                          {deposit.status || t('unknown')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(deposit.timestamp)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={deposit.message}>
                        {deposit.message || t('n_a')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {deposit.proofImage ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewImage(deposit.proofImage)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title={t('view')}
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDownloadImage(deposit.proofImage, `deposit-proof-${deposit.id}.jpg`)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title={t('download')}
                            >
                              <Download className="h-5 w-5" />
                            </button>
                          </div>
                        ) : (
                          t('n_a')
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {deposit.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApproveDeny(deposit.id, 'accepted')}
                              disabled={processing[deposit.id]}
                              className="text-green-600 hover:text-green-900 disabled:opacity-50"
                              title={t('approve')}
                            >
                              {processing[deposit.id] ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                              ) : (
                                <CheckCircle className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleApproveDeny(deposit.id, 'denied')}
                              disabled={processing[deposit.id]}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50"
                              title={t('deny')}
                            >
                              {processing[deposit.id] ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                              ) : (
                                <XCircle className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    {searchTerm || statusFilter !== 'All' ? t('no_deposits_match') : t('no_deposits_found')}
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

export default DepositsPage;