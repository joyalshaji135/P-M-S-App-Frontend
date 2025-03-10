import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FcParallelTasks } from "react-icons/fc";
import { MdOutlineHome } from "react-icons/md";
// import { MdOutlineEvent } from "react-icons/md";
// import { FaPeopleGroup } from "react-icons/fa6";
// import { MdOutlineVideoCall } from "react-icons/md";
// import { VscFileSubmodule } from "react-icons/vsc";

function TestAdminSidebar({ isSidebarOpen }) {
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  const toggleLookup = () => {
    setIsLookupOpen(!isLookupOpen);
  };

  return (
    <aside
      className={`h-screen fixed top-0 left-0 z-40 bg-white w-64 p-3  transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full overflow-y-auto">
        <div className="text-xl font-bold text-black-900 mb-4 flex items-center">
          <span>
            <FcParallelTasks className="text-black-700 mx-2" />
          </span>
          <h1>TaskFlow</h1>
        </div>
        <ul className="space-y-2 font-medium">
          {/* Sidebar items */}
          <li>
                    <NavLink
                      to="/test"
                      end // Add the "end" prop to ensure exact match
                      className={({ isActive }) =>
                        ` text-gray-600 hover:text-gray-900 hover:bg-gray-100  p-2 rounded-lg transition-colors flex justify-center items-center${
                          isActive ? 'bg-blue-50 text-blue-500 font-semibold' : ''
                        }`
                      }
                    >
                      <MdOutlineHome className="text-xl"/>
                      Home
                    </NavLink>
                  </li>
        </ul>
      </div>
    </aside>
  );
}


export default TestAdminSidebar;