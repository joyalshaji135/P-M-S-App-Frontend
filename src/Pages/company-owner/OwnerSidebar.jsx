import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FcParallelTasks } from 'react-icons/fc';
import { MdOutlineHome, MdOutlineEvent, MdOutlineVideoCall } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import { VscFileSubmodule } from 'react-icons/vsc';

function OwnerSidebar({ isSidebarOpen }) {
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  const toggleLookup = () => {
    setIsLookupOpen(!isLookupOpen);
  };

  return (
    <aside
      className={`h-screen fixed top-0 left-0 z-40 bg-white w-64 p-3 border-r border-gray-200 transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
          {/* Dashboard */}
          <li>
            <NavLink
              to="/owner"
              end
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <MdOutlineHome className="text-xl" />
              <span className="ml-2">Dashboard</span>
            </NavLink>
          </li>

          {/* Team Managers */}
          <li>
            <NavLink
              to="/owner/team-managers"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <FaPeopleGroup className="text-xl" />
              <span className="ml-2">Team Managers</span>
            </NavLink>
          </li>

          {/* Team Members */}
          <li>
            <NavLink
              to="/owner/team-members"
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

          {/* Tasks */}
          <li>
            <NavLink
              to="/owner/tasks"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <VscFileSubmodule className="text-xl" />
              <span className="ml-2">Tasks</span>
            </NavLink>
          </li>

          {/* Project */}
          <li>
            <NavLink
              to="/owner/project"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <VscFileSubmodule className="text-xl" />
              <span className="ml-2">Project</span>
            </NavLink>
          </li>

          {/* Feedback */}
          <li>
            <NavLink
              to="/owner/feedback"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <VscFileSubmodule className="text-xl" />
              <span className="ml-2">Feedback</span>
            </NavLink>
          </li>

          {/* Alert */}
          <li>
            <NavLink
              to="/owner/alert"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <VscFileSubmodule className="text-xl" />
              <span className="ml-2">Alert</span>
            </NavLink>
          </li>

          {/* Manage Event */}
          <li>
            <NavLink
              to="/owner/manage-event"
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
              to="/owner/manage-recruitment"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <VscFileSubmodule className="text-xl" />
              <span className="ml-2">Manage Recruitment</span>
            </NavLink>
          </li>

          {/* Google Meet */}
          <li>
            <NavLink
              to="/owner/google-meet"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <MdOutlineVideoCall className="text-xl" />
              <span className="ml-2">Google Meet</span>
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
                    to="/owner/lookup/customer-type"
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
                    to="/owner/lookup/role"
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
                    to="/owner/lookup/industry"
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
                    to="/owner/lookup/priority"
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
                    to="/owner/lookup/task-module"
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

export default OwnerSidebar;