import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { v4 as uuidv4 } from 'uuid';

const AdminGate = ({ onAccessGranted }) => {
  // State for login view
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // State for reset password view
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showResetView, setShowResetView] = useState(false);
  const [resetToken, setResetToken] = useState('');
  
  // Common state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Admin email constant
  const ADMIN_EMAIL = 'Communitysavings4@gmail.com';

  // Handle error message timeout with fade animation
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setTimeout(() => setError(''), 500); // Clear after fade out
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Handle success message timeout with fade animation
  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setTimeout(() => {
          setSuccess('');
          // If we're in the reset view and success was shown, go back to login
          if (showResetView) {
            setShowResetView(false);
          }
        }, 500); // Clear after fade out
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, showResetView]);

  // Verify password against Firestore
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Fetch the admin password from Firestore
      const docRef = doc(db, 'adminSettings', 'security');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const { password: storedPassword } = docSnap.data();
        
        if (password === storedPassword) {
          // Correct password
          onAccessGranted();
        } else {
          // Incorrect password
          setError('Incorrect password. Please try again.');
        }
      } else {
        setError('Admin settings not found. Please contact support.');
      }
    } catch (err) {
      console.error('Error fetching admin password:', err);
      setError('Failed to verify password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Send reset email using EmailJS with UUID token
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Generate unique token
      const token = uuidv4();
      
      // Expiration timestamp: 15 minutes
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);
      
      // Save token to Firestore
      await setDoc(doc(db, 'passwordResets', token), {
        token,
        expiresAt,
        used: false,
      });
      
      // Reset link with token
      const resetLink = `${window.location.origin}/admin-login?reset=true&token=${token}`;
      
      // Send email using EmailJS with provided credentials
      await emailjs.send(
        'service_rbtk5y8', // Service ID
        'template_i85brpa', // Template ID
        {
          to_email: ADMIN_EMAIL,
          reset_link: resetLink,
        },
        'zcAI9wNXtOd3ooJ67' // Public Key
      );
      
      setSuccess('Password reset email sent! Check your inbox.');
      
      // Hide the modal after success
      setTimeout(() => {
        setShowForgotPassword(false);
      }, 3000);
    } catch (err) {
      console.error('Error sending password reset email:', err);
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update password in Firestore and mark token as used
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    // Validate password length
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Update password in Firestore
      const docRef = doc(db, 'adminSettings', 'security');
      await updateDoc(docRef, { password: newPassword });
      
      // Mark token as used
      const tokenRef = doc(db, 'passwordResets', resetToken);
      await updateDoc(tokenRef, { used: true });
      
      setSuccess('Password updated successfully!');
      
      // Clear form fields
      setNewPassword('');
      setConfirmPassword('');
      
      // Redirect to login after success
      setTimeout(() => {
        window.location.href = '/admin-login';
      }, 3000);
    } catch (err) {
      console.error('Error updating password:', err);
      setError('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check URL parameters for reset view on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isReset = urlParams.get('reset');
    const token = urlParams.get('token');
    
    if (isReset === 'true' && token) {
      const verifyToken = async () => {
        try {
          const docRef = doc(db, 'passwordResets', token);
          const docSnap = await getDoc(docRef);
          
          if (!docSnap.exists()) {
            setError('Invalid or expired reset link.');
            return;
          }
          
          const data = docSnap.data();
          if (data.used || new Date() > data.expiresAt.toDate()) {
            setError('This reset link has expired.');
            return;
          }
          
          setShowResetView(true);
          setResetToken(token); // Store token in state for later use
        } catch (err) {
          console.error('Error verifying reset token:', err);
          setError('Failed to verify reset link.');
        }
      };
      verifyToken();
    }
  }, []);

  // Render login view
  const renderLoginView = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Access</h2>
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-colors"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-full mt-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Access Admin Dashboard'}
          </button>
        </form>
        
        {error && (
          <div className={`text-red-500 mt-2 transition-opacity duration-500 ${showError ? 'opacity-100' : 'opacity-0'}`}>
            {error}
          </div>
        )}
        
        {success && (
          <div className={`text-green-500 mt-2 transition-opacity duration-500 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
            {success}
          </div>
        )}
        
        <div 
          className="text-blue-600 text-sm mt-3 hover:underline cursor-pointer text-center"
          onClick={() => setShowForgotPassword(true)}
        >
          Forgot password?
        </div>
      </div>
      
      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-96 max-w-md">
            <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Reset Password</h2>
            <p className="text-gray-600 text-sm mb-6">
              A reset link will be sent to the admin email.
            </p>
            
            <div className="mb-6 p-3 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Email:</span> {ADMIN_EMAIL}
              </p>
            </div>
            
            <form onSubmit={handleResetPassword}>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md w-1/2 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-1/2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
            
            {error && (
              <div className={`text-red-500 mt-4 transition-opacity duration-500 ${showError ? 'opacity-100' : 'opacity-0'}`}>
                {error}
              </div>
            )}
            
            {success && (
              <div className={`text-green-500 mt-4 transition-opacity duration-500 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
                {success}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Render reset password view
  const renderResetView = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Reset Admin Password</h2>
        
        <form onSubmit={handlePasswordUpdate}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-colors"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-colors"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Updating...' : 'Reset Password'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowResetView(false)}
            className="text-blue-600 text-sm hover:underline"
          >
            Back to login
          </button>
        </div>
        
        {error && (
          <div className={`text-red-500 mt-4 transition-opacity duration-500 ${showError ? 'opacity-100' : 'opacity-0'}`}>
            {error}
          </div>
        )}
        
        {success && (
          <div className={`text-green-500 mt-4 transition-opacity duration-500 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
            {success}
          </div>
        )}
      </div>
    </div>
  );

  // Render the appropriate view based on state
  return showResetView ? renderResetView() : renderLoginView();
};

export default AdminGate;