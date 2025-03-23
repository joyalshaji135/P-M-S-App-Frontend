import React from 'react';
import { Link } from 'react-router-dom';

function MessageModal({ open, onClose }) {
  // Sample notification messages
  const notifications = [
    { id: 1, message: 'You have a new task assigned.', time: '2 hours ago' },
    { id: 2, message: 'Your project deadline is approaching.', time: '5 hours ago' },
    { id: 3, message: 'Team meeting scheduled for tomorrow.', time: '1 day ago' },
  ];

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-end pt-16 pr-4 transition-colors ${
        open ? 'visible bg-black/20' : 'invisible'
      }`}
      style={{ zIndex: 1000 }} // Ensure overlay has a high z-index
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white h-1/2 rounded-xl shadow-lg w-80 transition-all ${
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ zIndex: 1001 }} // Ensure modal has a higher z-index than overlay
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
            <button
              className="text-sm text-red-500 hover:text-red-700 float-right"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-black">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            ))}
          </div>
          {/* "View All Messages" Button */}
          <div className="mt-4">
            <Link
              to="/messages"
              className="w-full  text-center block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              View All Notifications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;