import React from 'react'
import { Link } from 'react-router-dom'


function AdminSidebar() {
  return (
    <div className="bg-white w-64 p-6 border-r border-gray-200">
      <div className="text-xl font-semibold text-gray-800 mb-8">Admin Panel</div>
      <ul className="space-y-3">
        <li>
          <Link
            to="/admin"
            className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/projects"
            className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/settings"
            className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded"
          >
            Settings
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
  )
}

export default AdminSidebar