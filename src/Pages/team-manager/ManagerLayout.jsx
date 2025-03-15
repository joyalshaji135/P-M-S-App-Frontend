import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import ManagerSidebar from './ManagerSidebar';

function ManagerLayout() {
  const dashboardName = "Team Manager";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Manager Sidebar */}
      <ManagerSidebar isSidebarOpen={isSidebarOpen} />

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col overflow-hidden p-2 bg-white"
        style={{ marginLeft: isSidebarOpen ? "16rem" : "0" }} // Adjust margin based on sidebar state
      >
        {/* Header */}
        <Header dashboardName={dashboardName} toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-white rounded-xl">
          <Outlet /> {/* Render nested routes here */}
        </div>
      </div>
    </div>
  );
}

export default ManagerLayout;