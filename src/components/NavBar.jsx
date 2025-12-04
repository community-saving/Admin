import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">Money Box Admin</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/dashboard" className={getLinkClass('/dashboard')}>
                Dashboard
              </Link>
              <Link to="/deposits" className={getLinkClass('/deposits')}>
                Deposits
              </Link>
              <Link to="/loans" className={getLinkClass('/loans')}>
                Loans
              </Link>
 
              <Link to="/chat" className={getLinkClass('/chat')}>
                Chat
              </Link>
              <Link to="/profile" className={getLinkClass('/profile')}>
                Profile
              </Link>
              <Link to="/annual-reports" className={getLinkClass('/annual-reports')}>
                Annual Reports
              </Link>
      
            </div>
          </div>
          <div className="flex items-center">
            {currentUser && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

