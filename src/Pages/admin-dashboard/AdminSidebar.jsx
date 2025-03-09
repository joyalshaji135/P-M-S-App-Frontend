import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
import { FcParallelTasks } from "react-icons/fc";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineEvent } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineVideoCall } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";

function AdminSidebar({isSidebarOpen}) {
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  const toggleLookup = () => {
    setIsLookupOpen(!isLookupOpen);
  };

  return (
    <aside className={`h-screen fixed top-0 left-0 z-40 bg-white w-64 p-3 border-r border-gray-200 sm:translate-x-0 transition-transform `}>
      <div className='h-full overflow-y-auto'>
      <div className="text-xl font-bold text-black-900 mb-4 flex items-center  ">
        <span ><FcParallelTasks  className="text-black-700 mx-2"/></span>
        <h1>TaskFlow</h1>
        </div>
      <ul className="space-y-2 font-medium">
        <li>
          <NavLink
            to="/admin"
            end // Add the "end" prop to ensure exact match
            className={({ isActive }) =>
              `block text-gray-600 hover:text-gray-900 hover:bg-gray-100  p-2 rounded-lg transition-colors flex justify-center items-center${
                isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
              }`
            }
          >
            <MdOutlineHome className="text-xl"/>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/company-owner"
            className={({ isActive }) =>
              `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
              }`
            }
          >
            Company Owner
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/team-managers"
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
            to="/admin/team-members"
            className={({ isActive }) =>
              `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
              }`
            }
          >
            <FaPeopleGroup />
            Team Members
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/manage-event"
            className={({ isActive }) =>
              `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
              }`
            }
          >
            <MdOutlineEvent />
            Manage Event
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/manage-recruitment"
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
            to="/admin/google-meet"
            className={({ isActive }) =>
              `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
              }`
            }
          >
            <MdOutlineVideoCall />
            Google Meet
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/file-document"
            className={({ isActive }) =>
              `block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors ${
                isActive ? 'bg-blue-50 text-[#3bf4fb] font-semibold' : ''
              }`
            }
          >
            <VscFileSubmodule />
            File Document
          </NavLink>
        </li>
        <li>
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
        </li>
      </ul>
      </div>
    </aside>
  );
}

export default AdminSidebar;