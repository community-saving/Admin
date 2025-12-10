import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

export default function ChatBox() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [users, setUsers] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const messagesEndRef = useRef();
  const lastActiveIntervalRef = useRef();
  const fileInputRef = useRef(null);
  
  // Cloudinary configuration
  const CLOUD_NAME = "dyprdh3rs";
  const UPLOAD_PRESET = "money-saving";
  
  // Helper function to determine if a user is online based on lastActive timestamp
  const isUserOnline = (lastActive) => {
    if (!lastActive) return false;
    
    // Convert Firestore timestamp to JavaScript Date
    const lastActiveDate = lastActive.toDate ? lastActive.toDate() : new Date(lastActive);
    const currentTime = new Date();
    
    // Consider user online if they were active in the last 2 minutes
    const timeDiffInMinutes = (currentTime - lastActiveDate) / (1000 * 60);
    return timeDiffInMinutes < 2;
  };
  
  // Set user online status when component mounts
  useEffect(() => {
    if (!currentUser) return;
    
    const setUserOnline = async () => {
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
          isOnline: true,
          lastActive: serverTimestamp()
        });
      } catch (error) {
        console.error('Error setting user online:', error);
      }
    };
    
    setUserOnline();
    
    // Set up periodic lastActive updates (every 30 seconds)
    lastActiveIntervalRef.current = setInterval(async () => {
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
          lastActive: serverTimestamp()
        });
      } catch (error) {
        console.error('Error updating lastActive:', error);
      }
    }, 30000);
    
    // Handle page unload - set user offline
    const handleBeforeUnload = async () => {
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
          isOnline: false,
          lastActive: serverTimestamp()
        });
      } catch (error) {
        console.error('Error setting user offline:', error);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      // Clean up interval and event listener
      clearInterval(lastActiveIntervalRef.current);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Set user offline when component unmounts
      if (currentUser) {
        const setUserOffline = async () => {
          try {
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
              isOnline: false,
              lastActive: serverTimestamp()
            });
          } catch (error) {
            console.error('Error setting user offline:', error);
          }
        };
        
        setUserOffline();
      }
    };
  }, [currentUser]);
  
  // Fetch messages
  useEffect(() => {
    // Only subscribe to messages if user is logged in
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, [currentUser]);
  
  // Fetch users and their online status
  useEffect(() => {
    if (!currentUser) return;
    
    const unsubscribe = onSnapshot(collection(db, 'users'), snapshot => {
      const usersData = {};
      const onlineUsersData = {};
      
      snapshot.forEach(doc => {
        const userData = doc.data();
        usersData[doc.id] = userData;
        
        // Check if user is online based on lastActive timestamp (regardless of isOnline flag)
        const online = isUserOnline(userData.lastActive);
        
        if (online) {
          // Store online user data in object format for easy mapping and sorting
          onlineUsersData[doc.id] = {
            displayName: userData.displayName || userData.email?.split('@')[0] || 'Unknown',
            isOnline: userData.isOnline || false,
            lastActive: userData.lastActive
          };
        }
      });
      
      setUsers(usersData);
      setOnlineUsers(onlineUsersData);
    });
    
    return unsubscribe;
  }, [currentUser]);

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  // Handle image selection (preview only, no upload yet)
  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    // Set selected image and preview
    setSelectedImage(file);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // Remove selected image
  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const sendMessage = async e => {
    e.preventDefault();
    // Don't send message if user is not logged in or message is empty and no image
    if (!currentUser || (!newMessage.trim() && !selectedImage)) return;
    
    try {
      let imageUrl = null;
      
      // Upload image if selected
      if (selectedImage) {
        imageUrl = await uploadImageToCloudinary(selectedImage);
      }
      
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        imageUrl: imageUrl,
        userId: currentUser.uid,
        userName: currentUser.email ? currentUser.email.split('@')[0] : 'Anonymous',
        timestamp: serverTimestamp()
      });
      
      // Reset form
      setNewMessage('');
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format timestamp for display
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  };

  // Get sorted online users by display name
  const getSortedOnlineUsers = () => {
    return Object.entries(onlineUsers)
      .sort(([, a], [, b]) => a.displayName.localeCompare(b.displayName));
  };

  // Show a message if user is not logged in
  if (!currentUser) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-gray-100 items-center justify-center font-sans text-gray-800">
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg max-w-md">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Please log in to use chat</h3>
          <p className="text-gray-600">You need to be logged in to send and receive messages.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans text-gray-800 max-w-4xl mx-auto w-full">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-header-avatar">
          {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
          {/* Online status indicator for current user */}
          <div 
            className={`online-status-indicator ${isUserOnline(users[currentUser?.uid]?.lastActive) ? 'online' : 'offline'}`}
            title={isUserOnline(users[currentUser?.uid]?.lastActive) ? 'Online' : 'Offline'}
          />
        </div>
        {/* <div className="chat-header-info">
          <h1>Chat Room</h1>
          <p>{messages.length} Messages</p>
          <p>Online Users: {Object.keys(onlineUsers).length}</p>
        </div> */}
      </div>

      {/* Online Users Bar */}
      <div className="mx-4 mb-2 bg-white/70 backdrop-blur-md rounded-xl shadow-sm p-3">
        <div className="flex flex-wrap gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-600">{Object.keys(onlineUsers).length} online</span>
          <br />
          <p className="text-sm text-gray-500">{messages.length} Messages</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 max-w-full">
        {loading ? (
          <div className="flex justify-center p-6">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.16s'}}></div>
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.32s'}}></div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 p-10 bg-white rounded-2xl shadow-lg m-5">
            <div className="text-4xl mb-3 opacity-70">💬</div>
            <div className="text-sm text-center max-w-xs">No messages yet. Start a conversation!</div>
          </div>
        ) : (
          messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex ${msg.userId === currentUser.uid ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              {msg.userId !== currentUser.uid && (
                <div className="relative">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white text-indigo-600 font-bold flex-shrink-0 shadow-sm mr-2">
                    {msg.userName ? msg.userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  {/* Online status indicator for message sender */}
                  <div 
                    className={`absolute bottom-[60px] right-7 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      onlineUsers[msg.userId] ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                    title={onlineUsers[msg.userId] ? 'Online' : 'Offline'}
                  ></div>
                </div>
              )}
              <div className={`max-w-[72%] p-3 rounded-2xl relative shadow-md transition-all duration-300 hover:shadow-lg ${
                msg.userId === currentUser.uid 
                  ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-100 rounded-br-md' 
                  : 'bg-white border border-gray-200 rounded-bl-md'
              }`}>
                {msg.imageUrl && (
                  <div className="message-image">
                    <img 
                      src={msg.imageUrl} 
                      alt="Uploaded content" 
                      style={{ maxWidth: '100%' , width: '200px', height: '200px', borderRadius: '8px', marginBottom: '8px' }}
                    />
                  </div>
                )}
                {msg.text && (
                  <div className="text-sm text-gray-800 leading-relaxed">{msg.text}</div>
                )}
                <div className="text-xs text-gray-400 text-right mt-2">
                  {formatTime(msg.timestamp)}
                </div>
              </div>
              {msg.userId === currentUser.uid && (
                <div className="relative">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-bold flex-shrink-0 shadow-sm ml-2">
                    {msg.userName ? msg.userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  {/* Online status indicator for current user */}
                  <div 
                    className={`absolute bottom-[60px] right-6 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      isUserOnline(users[currentUser?.uid]?.lastActive) ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                    title={isUserOnline(users[currentUser?.uid]?.lastActive) ? 'Online' : 'Offline'}
                  ></div>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="flex flex-col p-4 gap-3 sticky bottom-0 bg-white/70 backdrop-blur-md border-t border-gray-200">
        {/* Image preview area */}
        {imagePreview && (
          <div className="image-preview-container">
            <img 
              src={imagePreview} 
              alt="Preview" 
              style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <div style={{ marginLeft: '12px', flex: 1, minWidth: 0 }}>
              <p style={{ 
                margin: 0, 
                fontSize: '0.85rem', 
                color: '#4b5563', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis' 
              }}>
                {selectedImage?.name}
              </p>
            </div>
            <button
              type="button"
              onClick={removeSelectedImage}
              className="remove-image-button"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#ef4444'
              }}
            >
              ×
            </button>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center bg-white p-2 pl-4 rounded-full shadow-md transition-all duration-300 focus-within:shadow-lg focus-within:border focus-within:border-indigo-500">
            <input 
              type="text" 
              className="flex-1 border-0 outline-none p-2 bg-transparent text-sm text-gray-800" 
              placeholder="Type a message..." 
              value={newMessage} 
              onChange={e => setNewMessage(e.target.value)}
            />
          </div>
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelection}
            accept="image/*"
            style={{ display: 'none' }}
          />
          
          {/* Image upload button */}
          <button
            type="button"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-white text-indigo-600 border-none cursor-pointer shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            onClick={() => fileInputRef.current.click()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Send message button */}
          <button 
            type="submit"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-none cursor-pointer shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={!newMessage.trim() && !selectedImage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}