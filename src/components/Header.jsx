import React, { useState, useEffect } from 'react';
import { FaBars, FaBell, FaComments } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import MessageModal from './MessageModal';
import ProfileModal from './ProfileModal';

function Header({ dashboardName, toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Initial notification count
  const [messageCount, setMessageCount] = useState(2); // Initial message count
  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    email: "john.doe@example.com"
  };

  // Simulate receiving new notifications (example)
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add notifications (for demo purposes)
      if (Math.random() > 0.7) {
        setNotificationCount(prev => prev + 1);
      }
      // Randomly add messages (for demo purposes)
      if (Math.random() > 0.8) {
        setMessageCount(prev => prev + 1);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      console.log("Logging out...");
      // Implement logout logic here
    }
  };

  const handleChatClick = () => {
    setMessageCount(0); // Reset message count when chat is opened
    navigate('/chat');
  };

  const handleNotificationClick = () => {
    setNotificationCount(0); // Reset notification count when notifications are viewed
    setOpen(true);
  };

  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center mb-2">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
        >
          <FaBars className="text-xl" />
        </button>

        <div className="flex items-center ml-2">
          <p className="text-violet-600 mx-2">
            <MdSpaceDashboard />
          </p>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">{dashboardName}</h1>
          <p className="mx-2">DaxBod</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Chat Icon with counter */}
        <button
          onClick={handleChatClick}
          className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-200"
        >
          <FaComments className="text-xl" />
          {messageCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {messageCount}
            </span>
          )}
        </button>

        {/* Notification Bell with counter */}
        <button
          onClick={handleNotificationClick}
          className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-200"
        >
          <FaBell className="text-xl" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <button
          onClick={() => setIsProfileOpen(true)}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
        >
          👤
        </button>
      </div>

      <MessageModal 
        open={open} 
        onClose={() => setOpen(false)} 
        notificationCount={notificationCount}
        setNotificationCount={setNotificationCount}
      />
      <ProfileModal 
        open={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        user={user} 
        onLogout={handleLogout} 
      />
    </div>
  );
}

export default Header;