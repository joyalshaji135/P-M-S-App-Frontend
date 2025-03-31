import React, { useState } from 'react';
import { FaBars, FaBell } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import MessageModal from './MessageModal';


function Header({ dashboardName, toggleSidebar }) {
  const [open, setOpen] = useState(false); // State for modal
  const unreadNotifications = 3; // Example: Number of unread notifications

  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center mb-2">
      <div className="flex items-center">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
        >
          <FaBars className="text-xl" />
        </button>

        {/* Dashboard Name and Icon */}
        <div className="flex items-center ml-2 space-x-2">
          <p className="text-violet-600 mx-2">
            <MdSpaceDashboard  size={25}/>
          </p>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">{dashboardName}</h1>
          <p className="text-xl sm:text-2xl font-semibold text-gray-800">Panel</p>
        </div>
      </div>

      {/* Notification and User Avatar */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button
          onClick={() => setOpen(true)}
          className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-200"
        >
          <FaBell className="text-xl" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1 w-2 h-2 left-6 bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* User Avatar */}
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
          👤
        </button>
      </div>

      {/* Message Modal (Placeholder) */}
      <MessageModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default Header;