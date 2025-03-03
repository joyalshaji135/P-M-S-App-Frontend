import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import AdminSidebar from './AdminSidebar';



function AdminLayout() {
    const dashboardName = "Admin Dashboard";

    return (
    <div className="flex h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header dashboardName={dashboardName} />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto ">
          <Outlet /> {/* Render nested routes here */}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;