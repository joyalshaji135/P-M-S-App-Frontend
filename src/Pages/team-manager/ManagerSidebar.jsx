import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FcParallelTasks } from 'react-icons/fc';
import { MdOutlineHome, MdOutlineEvent, MdOutlineVideoCall } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import { VscFileSubmodule } from 'react-icons/vsc';

function ManagerSidebar({ isSidebarOpen }) {
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
              to="/team-manager"
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

          {/* Team Members */}
          <li>
            <NavLink
              to="/team-manager/team-members"
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
              to="/team-manager/tasks"
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
              to="/team-manager/projects"
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
              to="/team-manager/feedbacks"
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

          {/* Google Meet */}
          <li>
            <NavLink
              to="/team-manager/meetings"
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
          <li>
            <NavLink
              to="/team-manager/to-do"
              className={({ isActive }) =>
                `flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                }`
              }
            >
              <MdOutlineVideoCall className="text-xl" />
              <span className="ml-2">To-Do</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default ManagerSidebar;