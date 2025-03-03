import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Reg from './Pages/Reg';
// import AdminDashboard from './Pages/dashboards/AdminDashboard';
import Dashboard from './components/admin/Dashboard';
import Projects from './components/admin/Projects';
import Users from './components/admin/Users';
import Settings from './components/admin/Settings';
import TeamMemberDashboard from './Pages/dashboards/TeamMemberDashboard';
import CompanyOwnerDashboard from './Pages/dashboards/CompanyOwnerDashboard';
import TeamManagerDashboard from './Pages/dashboards/TeamManagerDashboard';
import AdminLayout from './Pages/admin-dashboard/AdminLayout';
import AdminHome from './Pages/admin-dashboard/AdminHome';
import CompanyOwners from './Pages/admin-dashboard/CompanyOwners';
import AddCompanyOwner from './Pages/admin-dashboard/AddCompanyOwner';
// import AdTeamMembers from './Pages/admin-dashboard/TeamMembersAd';
import TeamMembersAd from './Pages/admin-dashboard/TeamMembersAd';
import AddTeamMembersAd from './Pages/admin-dashboard/AddTeamMembersAd';
import TeamManagersAd from './Pages/admin-dashboard/TeamManagersAd';
import AddTeamManagersAd from './Pages/admin-dashboard/AddTeamManagersAd';
import ManageEventAd from './Pages/admin-dashboard/ManageEventAd';
import ManageRecruitmentAd from './Pages/admin-dashboard/ManageRecruitmentAd';
import GoogleMeetAd from './Pages/admin-dashboard/GoogleMeetAd';
import FileDocumentsAd from './Pages/admin-dashboard/FileDocumentsAd';
import CustomerTypeAd from './Pages/admin-dashboard/CustomerTypeAd';
import ManageRolesAd from './Pages/admin-dashboard/ManageRolesAd';
import IndustryAd from './Pages/admin-dashboard/IndustryAd';
import PriorityAd from './Pages/admin-dashboard/PriorityAd';
import TaskModuleAd from './Pages/admin-dashboard/TaskModuleAd';
// import Dashboard from './components/manager/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Reg />} />

      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminHome/>} /> {/* Default route for /admin */}
        <Route path="company-owner" element={<CompanyOwners/>}/>
        <Route path="company-owner/add" element={<AddCompanyOwner/>}/>
        <Route path="team-managers" element={<TeamManagersAd/>}/>
        <Route path="team-managers/add" element={<AddTeamManagersAd/>}/>
        <Route path="team-members" element={<TeamMembersAd/>}/>
        <Route path="team-members/add" element={<AddTeamMembersAd/>}/>
        <Route path="manage-event" element={<ManageEventAd/>}/>
        <Route path="manage-recruitment" element={<ManageRecruitmentAd/>}/>
        <Route path="google-meet" element={<GoogleMeetAd/>}/>
        <Route path="file-document" element={<FileDocumentsAd/>}/>
        <Route path="lookup/customer-type" element={<CustomerTypeAd/>}/>
        <Route path="lookup/role" element={<ManageRolesAd/>}/>
        <Route path="lookup/industry" element={<IndustryAd/>}/>
        <Route path="lookup/priority" element={<PriorityAd/>}/>
        <Route path="lookup/task-module" element={<TaskModuleAd/>}/>
        
        {/* <Route path="projects" element={<Projects />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} /> */}
      </Route>

      {/* Team Member Dashboard */}
      <Route path="/member" element={<TeamMemberDashboard />}>
        {/* <Route index element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="reports" element={<Reports />} /> */}
      </Route>

      {/* Team Manager Dashboard */}
      <Route path="/manager" element={<TeamManagerDashboard />}>
        {/* <Route index element={<Dashboard/>} /> */}
        {/* <Route path="tasks" element={<Tasks />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<Analytics />} /> */}
      </Route>

      {/* Company Owner Dashboard */}
      <Route path="/owner" element={<CompanyOwnerDashboard />}>
        {/* <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
