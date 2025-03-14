import React from 'react';
import { FaUserTie, FaUsers, FaUserFriends, FaCalendarAlt, FaVideo, FaEnvelope, FaFolder } from 'react-icons/fa';

function OwnerHome() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, Company Owner!</h1>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Team Managers Card */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-purple-50 rounded-full">
              <FaUsers className="h-5 w-5 text-black" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <p className="text-2xl font-bold text-purple-800">32</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mt-3">Team Managers</h2>
          <p className="text-sm text-gray-500 mt-1">Total team managers</p>
        </div>

        {/* Team Members Card */}
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-gray-50 rounded-full">
              <FaUserFriends className="h-5 w-5 text-black" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <p className="text-2xl font-bold text-gray-800">120</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mt-3">Team Members</h2>
          <p className="text-sm text-gray-500 mt-1">Total team members</p>
        </div>

        {/* Events Card */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-yellow-50 rounded-full">
              <FaCalendarAlt className="h-5 w-5 text-black" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <p className="text-2xl font-bold text-yellow-800">8</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mt-3">Events</h2>
          <p className="text-sm text-gray-500 mt-1">Upcoming events</p>
        </div>

        {/* Google Meets Card */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-teal-50 rounded-full">
              <FaVideo className="h-5 w-5 text-black" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <p className="text-2xl font-bold text-teal-800">12</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mt-3">Google Meets</h2>
          <p className="text-sm text-gray-500 mt-1">Scheduled meetings</p>
        </div>
      </div>

      {/* Additional Metrics Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Recruitment Messages Card */}
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-pink-50 rounded-full">
              <FaEnvelope className="h-5 w-5 text-black" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <p className="text-2xl font-bold text-pink-800">25</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mt-3">Recruitment</h2>
          <p className="text-sm text-gray-500 mt-1">Pending recruitment messages</p>
        </div>

        {/* File Documents Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-blue-50 rounded-full">
              <FaFolder className="h-5 w-5 text-black" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <p className="text-2xl font-bold text-blue-800">45</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mt-3">File Documents</h2>
          <p className="text-sm text-gray-500 mt-1">Total uploaded documents</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-6 bg-gradient-to-br from-yellow-50 via-green-50 to-teal-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="text-gray-800">Team manager Jane Smith created a new project</li>
          <li className="text-gray-800">Event "Annual Conference" scheduled for Dec 15</li>
          <li className="text-gray-800">Google Meet with client XYZ scheduled</li>
          <li className="text-gray-800">Recruitment message sent to 5 candidates</li>
        </ul>
      </div>
    </div>
  );
}

export default OwnerHome;