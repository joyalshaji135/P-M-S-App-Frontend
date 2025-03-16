import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MemberSidebar from './MemberSidebar';
import Header from '../../components/Header';


function MemberLayout() {
  const dashboardName = "Member";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Member Sidebar */}
      <MemberSidebar isSidebarOpen={isSidebarOpen} />

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

export default MemberLayout;