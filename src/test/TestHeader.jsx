import React, { useState } from 'react';
// import MessageModal from './MessageModal';
import { FaBell } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

function TestHeader({ dashboardName, toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const unreadNotifications = 3;

  return (
    <div className="bg-white  p-4 flex justify-between items-center  mb-2 ">
      <div className="text-xl sm:text-2xl font-semibold text-gray-800 flex justify-center items-center">
        <button onClick={toggleSidebar} className="mr-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
          ☰
        </button>
        <p className="mx-2 text-violet-600">
          <MdSpaceDashboard />
        </p>
        <p>{dashboardName}</p>
        <p className="mx-2">DaxBod</p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setOpen(true)}
          className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-200"
        >
          <FaBell className="text-xl" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1 w-2 h-2 left-6 bg-red-500 rounded-full"></span>
          )}
        </button>
        {/* <MessageModal open={open} onClose={() => setOpen(false)} />  */}
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
          👤
        </button>
      </div>
    </div>
  );
}

export default TestHeader;