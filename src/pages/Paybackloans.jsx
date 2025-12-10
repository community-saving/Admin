import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Check, X, Eye, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminPaybacksPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [allPaybacks, setAllPaybacks] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fadingCards, setFadingCards] = useState(new Set());

  // Fetch all users
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = [];
      snapshot.forEach((doc) => {
        usersData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setUsers(usersData);
    }, (err) => {
      console.error('Error fetching users:', err);
    });

    return () => unsubscribeUsers();
  }, [currentUser]);

  // Fetch all loans (not just pending ones)
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribeLoans = onSnapshot(collection(db, 'loans'), (snapshot) => {
      const paybacks = [];
      
      snapshot.forEach((docSnapshot) => {
        paybacks.push({
          id: docSnapshot.id,
          ...docSnapshot.data()
        });
      });
      
      // Sort by payment timestamp (newest first)
      paybacks.sort((a, b) => {
        const aTime = a.paymentTimestamp?.toDate?.() || new Date(0);
        const bTime = b.paymentTimestamp?.toDate?.() || new Date(0);
        return bTime - aTime;
      });
      
      setAllPaybacks(paybacks);
      setFetching(false);
    }, (err) => {
      console.error('Error fetching paybacks:', err);
      setFetching(false);
    });

    return () => unsubscribeLoans();
  }, [currentUser]);

  // Merge paybacks with user data
  const paybacksWithUserData = allPaybacks.map(payback => {
    const user = users.find(u => u.uid === payback.userId);
    return {
      ...payback,
      userName: user?.fullName || t('unknownUser'),
      userEmail: user?.email || t('noEmailProvided')
    };
  });

  // Show alert with auto-dismiss
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  // Handle approve action
  const handleApprove = async (paybackId) => {
    try {
      // Add to fading cards for animation
      setFadingCards(prev => new Set(prev).add(paybackId));
      
      // Wait for animation to start
      setTimeout(async () => {
        const paybackRef = doc(db, 'loans', paybackId);
        await updateDoc(paybackRef, {
          paymentStatus: 'approved',
          adminReviewedAt: serverTimestamp()
        });
        
        // Remove from fading cards after a delay
        setTimeout(() => {
          setFadingCards(prev => {
            const newSet = new Set(prev);
            newSet.delete(paybackId);
            return newSet;
          });
        }, 300);
        
        showAlert(t('paymentApprovedSuccessfully'), 'success');
      }, 100);
    } catch (err) {
      console.error('Error approving payment:', err);
      showAlert(t('failedToApprovePayment'), 'error');
      // Remove from fading cards on error
      setFadingCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(paybackId);
        return newSet;
      });
    }
  };

  // Handle deny action
  const handleDeny = async (paybackId) => {
    try {
      // Add to fading cards for animation
      setFadingCards(prev => new Set(prev).add(paybackId));
      
      // Wait for animation to start
      setTimeout(async () => {
        const paybackRef = doc(db, 'loans', paybackId);
        await updateDoc(paybackRef, {
          paymentStatus: 'denied',
          adminReviewedAt: serverTimestamp()
        });
        
        // Remove from fading cards after a delay
        setTimeout(() => {
          setFadingCards(prev => {
            const newSet = new Set(prev);
            newSet.delete(paybackId);
            return newSet;
          });
        }, 300);
        
        showAlert(t('paymentDenied'), 'error');
      }, 100);
    } catch (err) {
      console.error('Error denying payment:', err);
      showAlert(t('failedToDenyPayment'), 'error');
      // Remove from fading cards on error
      setFadingCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(paybackId);
        return newSet;
      });
    }
  };

  // Open image modal
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  // Close image modal
  const closeImageModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  // Format date helper
  const formatDate = (timestamp) => {
    if (!timestamp) return t('na');
    const date = timestamp.toDate();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Filter paybacks based on search term and loan status
  const filteredPaybacks = paybacksWithUserData.filter(payback => {
    // Show only accepted loans
    if (payback.status !== 'accepted') return false;
    
    // Then filter by search term
    const userName = payback.userName || '';
    const searchLower = searchTerm.toLowerCase();
    
    return userName.toLowerCase().includes(searchLower);
  });

  // Count pending loans for the badge
  const pendingCount = paybacksWithUserData.filter(
    payback => payback.status === 'accepted' && payback.paymentStatus === 'pending'
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Alert Container */}
      {alert && (
        <div 
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            alert.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}
        >
          {alert.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('loanRepaymentManagement')}</h1>
          <p className="mt-2 text-gray-600">{t('reviewManageLoanRepayments')}</p>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('searchByUserName')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        {/* Paybacks List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{t('acceptedLoanRepayments')}</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              {pendingCount} {t('pending')}
            </span>
          </div>
          
          {fetching ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600">{t('loadingLoanRepayments')}</p>
            </div>
          ) : filteredPaybacks.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t('noAcceptedLoansFound')}</h3>
              <p className="text-gray-500">{t('noAcceptedLoansAtMoment')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaybacks.map((payback) => {
                const isFading = fadingCards.has(payback.id);
                const isPending = !payback.paymentStatus || payback.paymentStatus === 'pending';

                
                return (
                  <div 
                    key={payback.id} 
                    className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${
                      isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-800 font-medium">
                              {payback.userName?.charAt(0)?.toUpperCase() || t('unknownUser').charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900">{payback.userName || t('unknownUser')}</h3>
                            <p className="text-sm text-gray-500">{payback.userEmail || t('noEmailProvided')}</p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${payback.paymentStatus === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : payback.paymentStatus === 'denied'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {payback.paymentStatus ? t(payback.paymentStatus) : t('pending')}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">{t('loanAmount')}</span>
                          <span className="text-sm font-medium text-gray-900">${payback.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">{t('interest10Percent')}</span>
                          <span className="text-sm font-medium text-gray-900">${(payback.amount * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">{t('totalPayable')}</span>
                          <span className="text-sm font-medium text-gray-900">
                            ${payback.totalPayable?.toFixed(2) || (payback.amount * 1.1).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">{t('paidAmount')}</span>
                          <span className="text-sm font-medium text-gray-900">${payback.paidAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">{t('paymentDate')}</span>
                          <span className="text-sm font-medium text-gray-900">{formatDate(payback.paymentTimestamp)}</span>
                        </div>
                        {payback.adminReviewedAt && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">{t('reviewedAt')}</span>
                            <span className="text-sm font-medium text-gray-900">{formatDate(payback.adminReviewedAt)}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mb-6">
                        <span className="block text-sm font-medium text-gray-700 mb-2">{t('proofOfPayment')}</span>
                        {payback.proofImageUrl ? (
                          <div 
                            className="relative w-full h-32 rounded-lg overflow-hidden cursor-pointer border border-gray-200"
                            onClick={() => openImageModal(payback.proofImageUrl)}
                          >
                            <img 
                              src={payback.proofImageUrl} 
                              alt={t('proofOfPayment')} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Eye className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-32 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                            <span className="text-gray-500 text-sm">{t('noProofProvided')}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-3">
                        <button 
                          className={`flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg transition-colors ${
                            isPending 
                              ? 'text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500' 
                              : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                          }`}
                          onClick={() => handleApprove(payback.id)}
                          disabled={!isPending}
                        >
                          <Check className="-ml-1 mr-2 h-4 w-4" />
                          {t('approve')}
                        </button>
                        <button 
                          className={`flex-1 inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-lg transition-colors ${
                            isPending 
                              ? 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
                              : 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
                          }`}
                          onClick={() => handleDeny(payback.id)}
                          disabled={!isPending}
                        >
                          <X className="-ml-1 mr-2 h-4 w-4" />
                          {t('deny')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeImageModal}>
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none"
              onClick={closeImageModal}
            >
              <X className="h-8 w-8" />
            </button>
            <img 
              src={selectedImage} 
              alt={t('proofOfPayment')} 
              className="max-w-full max-h-screen rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPaybacksPage;