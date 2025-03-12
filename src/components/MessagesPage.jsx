import React from 'react';
import { Link } from 'react-router-dom';

function MessagesPage() {
  // Sample data for all messages
  const messages = [
    {
      id: 1,
      senderPhoto: 'https://via.placeholder.com/40',
      message: 'You have a new task assigned.',
      time: '2 hours ago',
    },
    {
      id: 2,
      senderPhoto: 'https://via.placeholder.com/40',
      message: 'Your project deadline is approaching.',
      time: '5 hours ago',
    },
    {
      id: 3,
      senderPhoto: 'https://via.placeholder.com/40',
      message: 'Team meeting scheduled for tomorrow.',
      time: '1 day ago',
    },
    // Add more messages as needed
  ];

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Messages</h1>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {messages.map((message) => (
              <tr key={message.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={message.senderPhoto}
                      alt="Sender"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {message.message}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {message.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MessagesPage;