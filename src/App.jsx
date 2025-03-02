import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Reg from './Pages/Reg';
import AdminDashboard from './Pages/dashboards/AdminDashboard';
import Dashboard from './components/admin/Dashboard';
import Projects from './components/admin/Projects';
import Users from './components/admin/Users';
import Settings from './components/admin/Settings';
import TeamMemberDashboard from './Pages/dashboards/TeamMemberDashboard';
import CompanyOwnerDashboard from './Pages/dashboards/CompanyOwnerDashboard';
import TeamManagerDashboard from './Pages/dashboards/TeamManagerDashboard';
// import Dashboard from './components/manager/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Reg />} />

      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<Dashboard />} /> {/* Default route for /admin */}
        <Route path="projects" element={<Projects />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
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
