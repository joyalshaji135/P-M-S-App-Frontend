import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FcParallelTasks } from "react-icons/fc";
import { MdOutlineHome, MdOutlineEvent, MdOutlineVideoCall } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { VscFileSubmodule } from "react-icons/vsc";

function AdminSidebar({ isSidebarOpen }) {
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  const toggleLookup = () => {
    setIsLookupOpen(!isLookupOpen);
  };

  return (
    <aside
      className={`h-screen fixed top-0 left-0 z-40 bg-white w-64 p-3 border-r border-gray-200 transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full overflow-y-auto">
        {/* Sidebar Header */}
        <div className="text-xl font-bold text-black-900 mb-4 flex items-center">
          <span>
            <FcParallelTasks className="text-black-700 mx-2" />
          </span>
          <h1>TaskFlow</h1>
        </div>

        {/* Sidebar Links */}
        <ul className="space-y-2 font-medium">
          {/* Home */}
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <MdOutlineHome className="text-xl" />
              <span className="ml-2">Home</span>
            </NavLink>
          </li>

          {/* Company Owner */}
          <li>
            <NavLink
              to="/admin/company-owner"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <span className="ml-2">Company Owner</span>
            </NavLink>
          </li>

          {/* Team Managers */}
          <li>
            <NavLink
              to="/admin/team-managers"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <span className="ml-2">Team Managers</span>
            </NavLink>
          </li>

          {/* Team Members */}
          <li>
            <NavLink
              to="/admin/team-members"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <FaPeopleGroup className="text-xl" />
              <span className="ml-2">Team Members</span>
            </NavLink>
          </li>

          {/* Manage Event */}
          <li>
            <NavLink
              to="/admin/events"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <MdOutlineEvent className="text-xl" />
              <span className="ml-2">Manage Event</span>
            </NavLink>
          </li>

          {/* Manage Recruitment */}
          <li>
            <NavLink
              to="/admin/recruitment"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <span className="ml-2">Manage Recruitment</span>
            </NavLink>
          </li>

          {/* Google Meet */}
          <li>
            <NavLink
              to="/admin/meetings"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <MdOutlineVideoCall className="text-xl" />
              <span className="ml-2">Meetings</span>
            </NavLink>
          </li>

          {/* File Document */}
          <li>
            <NavLink
              to="/admin/documents"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <VscFileSubmodule className="text-xl" />
              <span className="ml-2">File Document</span>
            </NavLink>
          </li>

          {/* Lookup Section */}
          <li>
            <div
              onClick={toggleLookup}
              className="flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg cursor-pointer transition-colors"
            >
              <span className="ml-2">Lookup {isLookupOpen ? '▲' : '▼'}</span>
            </div>
            {isLookupOpen && (
              <ul className="pl-4 mt-2 space-y-2">
                <li>
                  <NavLink
                    to="/admin/lookup/customer-type"
                    className={({ isActive }) =>
                      `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                      }`
                    }
                  >
                    <span className="ml-2">Customer Type</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/lookup/role"
                    className={({ isActive }) =>
                      `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                      }`
                    }
                  >
                    <span className="ml-2">Role</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/lookup/industry"
                    className={({ isActive }) =>
                      `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                      }`
                    }
                  >
                    <span className="ml-2">Industry</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/lookup/priority"
                    className={({ isActive }) =>
                      `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                      }`
                    }
                  >
                    <span className="ml-2">Priority</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/lookup/task-module"
                    className={({ isActive }) =>
                      `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                      }`
                    }
                  >
                    <span className="ml-2">Task Module</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default AdminSidebar;