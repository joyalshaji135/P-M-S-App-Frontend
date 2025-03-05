import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


function OwnerSidebar() {
    const [isLookupOpen, setIsLookupOpen] = useState(false);
    
      const toggleLookup = () => {
        setIsLookupOpen(!isLookupOpen);
      };
  return (
    <div className="bg-white w-64 p-6 border-r border-gray-200">
          <div className="text-xl font-semibold text-gray-800 mb-8">TaskFlow</div>
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/owner"
                end // Add the "end" prop to ensure exact match
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/owner/team-managers"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                  }`
                }
              >
                Team Managers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/owner/team-members"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                  }`
                }
              >
                Team Members
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/owner/tasks"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                  }`
                }
              >
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/owner/project"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                  }`
                }
              >
                Project
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/owner/feedback"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                  }`
                }
              >
                Feedback
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/owner/alert"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                  }`
                }
              >
                Alert
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/owner/manage-event"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                  }`
                }
              >
                Manage Event
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/owner/manage-recruitment"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                  }`
                }
              >
                Manage Recruitment
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/owner/google-meet"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                  }`
                }
              >
                Google Meet
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/admin/file-document"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                  }`
                }
              >
                File Document
              </NavLink>
            </li> */}
            {/* <li>
              <div
                onClick={toggleLookup}
                className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors"
              >
                Lookup {isLookupOpen ? '▲' : '▼'}
              </div>
              {isLookupOpen && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <NavLink
                      to="/admin/lookup/customer-type"
                      className={({ isActive }) =>
                        `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                          isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                        }`
                      }
                    >
                      Customer Type
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/lookup/role"
                      className={({ isActive }) =>
                        `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                          isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                        }`
                      }
                    >
                      Role
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/lookup/industry"
                      className={({ isActive }) =>
                        `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                          isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                        }`
                      }
                    >
                      Industry
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/lookup/priority"
                      className={({ isActive }) =>
                        `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                          isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                        }`
                      }
                    >
                      Priority
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/lookup/task-module"
                      className={({ isActive }) =>
                        `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                          isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                        }`
                      }
                    >
                      Task Module
                    </NavLink>
                  </li>
                </ul>
              )}
            </li> */}
          </ul>
        </div>
  )
}

export default OwnerSidebar