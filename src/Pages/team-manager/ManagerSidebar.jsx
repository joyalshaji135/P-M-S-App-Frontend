import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


function ManagerSidebar() {
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
                to="/team-manager"
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
            {/* <li>
              <NavLink
                to="/team-manager/team-members"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                  }`
                }
              >
                Team Members
              </NavLink>
            </li> */}
            <li>
                          <NavLink
                            to="/team-manager/tasks"
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
                            to="/team-manager/project"
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
                            to="/team-manager/feedback"
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
                to="/team-manager/google-meet"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
                  }`
                }
              >
                Google Meet
              </NavLink>
            </li>
          </ul>
        </div>
  )
}

export default ManagerSidebar