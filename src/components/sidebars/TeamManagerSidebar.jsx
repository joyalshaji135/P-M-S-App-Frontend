import React from 'react';
import { Link } from 'react-router-dom';

function TeamManagerSidebar() {
  return (
    <div className="bg-white w-64 p-6 border-r border-gray-200">
      <div className="text-xl font-semibold text-gray-800 mb-8">TaskFlow</div>
      <ul className="space-y-3">
        <li>
          <Link
            to="/manager"
            className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/manager/tasks"
            className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded"
          >
            Tasks
          </Link>
        </li>
        <li>
          <Link
            to="/manager/reports"
            className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded"
          >
            Reports
          </Link>
        </li>
        <li>
          <Link
            to="/team-manager/analytics"
            className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded"
          >
            Analytics
          </Link>
        </li>
        <li>
          <Link
            to="/logout"
            className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded"
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default TeamManagerSidebar;