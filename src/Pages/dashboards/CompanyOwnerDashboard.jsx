import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Modal from '../../components/admin/Modal';
import CompanyOwnerSidebar from '../../components/sidebars/CompanyOwnerSidebar';

function CompanyOwnerDashboard() {
  const [open, setOpen] = useState(false);
  const unreadNotifications = 3;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Company Owner Sidebar */}
      <CompanyOwnerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-800">Company Owner Dashboard</div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full focus:outline-none"
            >
              {/* Bell Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>

              {/* Notification Badge */}
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {unreadNotifications}
                </span>
              )}
            </button>
            <Modal open={open} onClose={() => setOpen(false)} />
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
              👤
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <Outlet /> {/* Render nested routes here */}
      </div>
    </div>
  );
}

export default CompanyOwnerDashboard;