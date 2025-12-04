import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard,
  CreditCard, 
  Users, 
  Settings, 
  Menu, 
  X, 
  Search,
  Bell,
  User,
  MessageCircleMore,
  HandCoins,
  PiggyBank,
  BanknoteArrowDown,
  LogOut
} from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Close sidebar when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarOpen && 
          !e.target.closest('.sidebar-content') && 
          !e.target.closest('.sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Deposits', href: '/deposits', icon: PiggyBank },
    { name: 'loans', href: '/loans', icon: HandCoins },
    { name: 'Chat', href: '/chat', icon: MessageCircleMore },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Payback', href: '/payback', icon: BanknoteArrowDown },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Annual Reports', href: '/annual-reports', icon: CreditCard },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className="flex h-screen w-screen max-w-full bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 sidebar-content`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">MB</span>
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">MoneyBox</h1>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User profile and logout */}
          <div className="px-4 py-6 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                     <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-bold shadow-md">
            {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Admin  is           {currentUser?.email?.slice(0 , 5).toUpperCase() || 'U'}
</p>
                <p className="text-xs text-gray-500">{currentUser?.email?.slice(0 , 104).toLowerCase() || 'U'}
</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-4 sidebar-toggle"
              >
                <Menu size={20} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                {location.pathname === '/dashboard' && '💰 Dashboard'}
                {location.pathname === '/deposits' && '💰 Deposits Overview'}
                {location.pathname === '/loans' && '💸 loans Overview'}
                {location.pathname === '/users' && '👥 Users Overview'}
                {location.pathname === '/chat' && '👥 Users Overview'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
             
              
             
              
              <button
                onClick={handleLogout}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="h-full w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;