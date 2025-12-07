import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import SignIn from './components/Chat/SignIn';
import SignUP from './components/Chat/SignUp';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Paybackloans from './pages/Paybackloans';
import DepositsPage from './pages/DepositsPage';
import ChatPage from './pages/ChatPage';
import Home from './pages/Home';
import Loans from './pages/Loans';
import Users from './pages/Users';
import Settings from './pages/Setting';
import AnnualReportsPage from './pages/AnnualReports';
import Layout from './components/Layout';
import AdminGate from './pages/AdminGate';
import { useState } from 'react';
// Import the new components
import Blocked from './pages/Blocked';
import AdminUsers from './pages/AdminUsers';
import BlockedUserChecker from './components/BlockedUserChecker';

// Protected route component
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

// Redirect authenticated users away from auth pages
function RedirectAuthenticatedRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
}

function App() {
  const [accessGranted, setAccessGranted] = useState(false);

  // Show AdminGate before anything else. Once the password is validated
  // (onAccessGranted called), render the rest of the app.
  if (!accessGranted) {
    return <AdminGate onAccessGranted={() => setAccessGranted(true)} />;
  }

  return (
    <Routes>
      <Route path="/login" element={
        <RedirectAuthenticatedRoute>
          <SignIn />
        </RedirectAuthenticatedRoute>
      } />
      <Route path="/signup" element={
        <RedirectAuthenticatedRoute>
          <SignUP />
        </RedirectAuthenticatedRoute>
      } />
      
      {/* Public route for blocked users */}
      <Route path="/blocked" element={<Blocked />} />

      <Route path="/" element={
        <ProtectedRoute>
          <BlockedUserChecker>
            <Layout />
          </BlockedUserChecker>
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="deposits" element={<DepositsPage />} />
        <Route path="loans" element={<Loans />} />
        <Route path="payback" element={<Paybackloans />} />
        <Route path="users" element={<Users />} />
        <Route path="admin-users" element={<AdminUsers />} />
        <Route path="settings" element={<Settings />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="annual-reports" element={<AnnualReportsPage />} />
      </Route>
    </Routes>
  );
}

export default App;