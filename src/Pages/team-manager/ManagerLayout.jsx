import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import ManagerSidebar from './ManagerSidebar'


function ManagerLayout() {
    const dashboardName = "Team Manager"

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Owner Sidebar */}
      <ManagerSidebar/>

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
  )
}

export default ManagerLayout