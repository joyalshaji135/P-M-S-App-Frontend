import React from 'react';
import { FaTasks, FaProjectDiagram, FaRegComments, FaVideo, FaCheckCircle, FaFolder } from 'react-icons/fa';

function MemberHome() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, Member!</h1>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tasks Card */}
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-blue-50 rounded-full">
              <FaTasks className="h-5 w-5 text-black" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <p className="text-2xl font-bold text-blue-800">8</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mt-3">Tasks</h2>
          <p className="text-sm text-gray-500 mt-1">Pending tasks</p>
        </div>

        {/* Projects Card */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-purple-50 rounded-full">
              <FaProjectDiagram className="h-5 w-5 text-black" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <p className="text-2xl font-bold text-purple-800">5</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mt-3">Projects</h2>
          <p className="text-sm text-gray-500 mt-1">Active projects</p>
        </div>

        {/* Feedback Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-green-50 rounded-full">
              <FaRegComments className="h-5 w-5 text-black" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <p className="text-2xl font-bold text-green-800">3</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mt-3">Feedback</h2>
          <p className="text-sm text-gray-500 mt-1">Pending feedback</p>
        </div>

        {/* Meetings Card */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-yellow-50 rounded-full">
              <FaVideo className="h-5 w-5 text-black" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <p className="text-2xl font-bold text-yellow-800">2</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mt-3">Meetings</h2>
          <p className="text-sm text-gray-500 mt-1">Upcoming meetings</p>
        </div>
      </div>

      {/* Additional Metrics Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* To-Do Card */}
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-pink-50 rounded-full">
              <FaCheckCircle className="h-5 w-5 text-black" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <p className="text-2xl font-bold text-pink-800">7</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mt-3">To-Do</h2>
          <p className="text-sm text-gray-500 mt-1">Pending to-do items</p>
        </div>

        {/* File Documents Card */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-teal-50 rounded-full">
              <FaFolder className="h-5 w-5 text-black" />
            </div>
            <div className="p-2 bg-white rounded-full">
              <p className="text-2xl font-bold text-teal-800">10</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mt-3">File Documents</h2>
          <p className="text-sm text-gray-500 mt-1">Uploaded documents</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-6 bg-gradient-to-br from-yellow-50 via-green-50 to-teal-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="text-gray-800">Task "Update Project Plan" assigned to you</li>
          <li className="text-gray-800">Feedback received for "Q3 Report"</li>
          <li className="text-gray-800">Meeting with Team scheduled for tomorrow</li>
          <li className="text-gray-800">New document uploaded: "Project Guidelines"</li>
          <li className="text-gray-800">To-Do item "Review Design Mockups" marked as completed</li>
        </ul>
      </div>
    </div>
  );
}

export default MemberHome;