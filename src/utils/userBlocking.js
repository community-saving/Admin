import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Check if the current user is blocked
 * @returns {Promise<boolean>} True if user is blocked, false otherwise
 */
export const checkUserBlockStatus = async () => {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return false;
    }
    
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData.isBlocked === true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking user block status:', error);
    // In case of error, we don't block the user to avoid accidental lockouts
    return false;
  }
};

/**
 * Sign out the current user and redirect to blocked page
 */
export const handleBlockedUser = async (navigate) => {
  try {
    await signOut(auth);
    if (navigate) {
      navigate('/blocked');
    }
  } catch (error) {
    console.error('Error signing out blocked user:', error);
  }
};

/**
 * Check user block status and handle accordingly
 * @param {Function} navigate - React Router navigate function
 */
export const checkAndHandleUserBlockStatus = async (navigate) => {
  const isBlocked = await checkUserBlockStatus();
  
  if (isBlocked) {
    await handleBlockedUser(navigate);
  }
  
  return isBlocked;
};