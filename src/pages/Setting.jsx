import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc, setDoc, query, orderBy, limit } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const AdminInterestSettings = () => {
  const [interest, setInterest] = useState("10.00"); // Default to 10% instead of 0.10
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const [historyData, setHistoryData] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [interestDocId, setInterestDocId] = useState(null);
  
  const { t } = useTranslation(); // Use translation hook

  useEffect(() => {
    const fetchInterest = async () => {
      try {
        const q = query(collection(db, "interest"), orderBy("timestamp", "desc"), limit(10));
        const snap = await getDocs(q);
        
        if (!snap.empty) {
          const docData = snap.docs[0];
          // Convert decimal to percentage for display
          setInterest((docData.data().interest).toFixed(2));
          setInterestDocId(docData.id);
          
          // Prepare history data for chart (already converting to percentage)
          const history = snap.docs.map(doc => ({
            date: new Date(doc.data().timestamp?.toDate() || Date.now()).toLocaleDateString(),
            rate: parseFloat(doc.data().interest) 
          })).reverse();
          setHistoryData(history);
        } else {
          setInterest("10.00"); // Default to 10% instead of 0.10
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching interest rate:", error);
        setMessage(t('error_fetch_interest_rate'));
        setMessageType("error");
        setLoading(false);
      }
    };

    fetchInterest();
  }, []);

  const handleSave = async () => {
    if (!interest || isNaN(interest)) {
      setMessage(t('error_invalid_interest_rate'));
      setMessageType("error");
      return;
    }

    setSaving(true);
    try {
      const interestValue = parseFloat(interest);
      if (interestValue < 0 || interestValue > 100) {
        throw new Error(t('error_interest_rate_range'));
      }

      const interestData = {
        interest: interestValue,
        timestamp: new Date()
      };

      if (interestDocId) {
        // Update existing document
        await updateDoc(doc(db, "interest", interestDocId), interestData);
      } else {
        // Create new document
        const newDocRef = doc(collection(db, "interest"));
        await setDoc(newDocRef, interestData);
        setInterestDocId(newDocRef.id);
      }

      setMessage(t('success_interest_rate_saved'));
      setMessageType("success");
      
      // Refresh history
      const q = query(collection(db, "interest"), orderBy("timestamp", "desc"), limit(10));
      const snap = await getDocs(q);
      const history = snap.docs.map(doc => ({
        date: new Date(doc.data().timestamp?.toDate() || Date.now()).toLocaleDateString(),
        rate: parseFloat(doc.data().interest) 
      })).reverse();
      setHistoryData(history);
    } catch (error) {
      console.error("Error saving interest rate:", error);
      setMessage(t('error_save_interest_rate') + error.message);
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

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
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('interest_rate_settings')}</h1>
        <p className="mt-2 text-gray-600">{t('interest_rate_settings_description')}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('current_interest_rate')}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('interest_rate_percentage')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="interestRate"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    step="0.01"
                    min="0"
                    max="100"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={t('enter_interest_rate')}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">%</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">{t('interest_rate_help_text')}</p>
              </div>
              
              <button
                onClick={handleSave}
                disabled={saving}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                  saving 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
              >
                {saving ? t('saving') : t('save_changes')}
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('preview')}</h2>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
              <div className="text-center">
                <p className="text-lg mb-2">{t('current_rate')}</p>
                <p className="text-4xl font-bold">{interest}%</p>
                <p className="mt-2 text-indigo-100">{t('annual_percentage_rate')}</p>
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            messageType === "success" 
              ? "bg-green-50 text-green-800" 
              : "bg-red-50 text-red-800"
          }`}>
            {message}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{t('interest_rate_history')}</h2>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {showHistory ? t('hide_history') : t('show_history')}
          </button>
        </div>

        {showHistory && (
          <div className="mt-6">
            {historyData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={historyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, t('rate')]}
                      labelFormatter={(label) => `${t('date')}: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#4f46e5" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                      name={t('interest_rate')}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">{t('no_history_data')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInterestSettings;