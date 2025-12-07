import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Blocked = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
          <ShieldAlert className="h-10 w-10 text-red-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Account Blocked</h2>
        <p className="mt-2 text-gray-600">
          Your account has been blocked. Contact support if this is a mistake.
        </p>
        <button
          onClick={handleGoHome}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Blocked;