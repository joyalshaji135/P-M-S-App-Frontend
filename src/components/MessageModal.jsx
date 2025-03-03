import React from 'react';

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
      className={`fixed inset-0 flex  justify-end pt-16 pr-4 transition-colors ${
        open ? 'visible bg-black/20' : 'invisible'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white h-80 rounded-xl shadow-lg w-80 transition-all ${
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h2>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;