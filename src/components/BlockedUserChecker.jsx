import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { checkAndHandleUserBlockStatus } from '../utils/userBlocking';

const BlockedUserChecker = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const checkUserStatus = async () => {
      if (currentUser) {
        try {
          // Check if user is blocked and handle accordingly
          await checkAndHandleUserBlockStatus(navigate);
        } catch (error) {
          console.error('Error checking user block status:', error);
        }
      }
    };

    checkUserStatus();
    
    // Set up an interval to periodically check the user status
    const interval = setInterval(checkUserStatus, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [currentUser, navigate]);

  return <>{children}</>;
};

export default BlockedUserChecker;