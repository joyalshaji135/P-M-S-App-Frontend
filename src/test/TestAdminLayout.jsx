import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TestAdminSidebar from './testAdminSidebar';
import TestHeader from './testHeader';


function TestAdminLayout() {
  const dashboardName = "Admin";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Admin Sidebar */}
      {/* <testAdminSidebar isSidebarOpen={isSidebarOpen} /> */}
      <TestAdminSidebar isSidebarOpen={isSidebarOpen}/>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col overflow-hidden p-2  bg-white "
        style={{ marginLeft: isSidebarOpen ? "16rem" : "0" }} // Adjust margin based on sidebar state
      >
        {/* Header */}
        {/* <testHeader dashboardName={dashboardName} toggleSidebar={toggleSidebar} /> */}
        <TestHeader dashboardName={dashboardName} toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 rounded-xl">
          <Outlet /> {/* Render nested routes here */}
        </div>
      </div>
    </div>
  );
}

export default TestAdminLayout;