import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Reg from './Pages/Reg';
// import AdminDashboard from './Pages/dashboards/AdminDashboard';
// import Dashboard from './components/admin/Dashboard';
// import Projects from './components/admin/Projects';
// import Users from './components/admin/Users';
import Settings from './components/admin/Settings';
import TeamMemberDashboard from './Pages/dashboards/TeamMemberDashboard';
// import CompanyOwnerDashboard from './Pages/dashboards/CompanyOwnerDashboard';
import TeamManagerDashboard from './Pages/dashboards/TeamManagerDashboard';
import AdminLayout from './Pages/admin-dashboard/AdminLayout';
import AdminHome from './Pages/admin-dashboard/AdminHome';
import CompanyOwners from './Pages/admin-dashboard/company-owner/CompanyOwners';
import AddCompanyOwner from './Pages/admin-dashboard/company-owner/AddCompanyOwner';
// import AdTeamMembers from './Pages/admin-dashboard/TeamMembersAd';
import TeamMembersAd from './Pages/admin-dashboard/team-member/TeamMembersAd';
import AddTeamMembersAd from './Pages/admin-dashboard/team-member/AddTeamMembersAd';
import TeamManagersAd from './Pages/admin-dashboard/team-manager/TeamManagersAd';
import AddTeamManagersAd from './Pages/admin-dashboard/team-manager/AddTeamManagersAd';
import ManageEventAd from './Pages/admin-dashboard/manage-events/ManageEventAd';
import ManageRecruitmentAd from './Pages/admin-dashboard/manage-recruitment/ManageRecruitmentAd';
import GoogleMeetAd from './Pages/admin-dashboard/google-meet/MeetingsAd';
import FileDocumentsAd from './Pages/admin-dashboard/file-documents/FileDocumentsAd';
import CustomerTypeAd from './Pages/admin-dashboard/CustomerTypeAd';
import ManageRolesAd from './Pages/admin-dashboard/ManageRolesAd';
import IndustryAd from './Pages/admin-dashboard/IndustryAd';
import PriorityAd from './Pages/admin-dashboard/PriorityAd';
import TaskModuleAd from './Pages/admin-dashboard/TaskModuleAd';
import OwnerLayout from './Pages/company-owner/OwnerLayout';
import OwnerHome from './Pages/company-owner/OwnerHome';
import TeamManagersOwner from './Pages/company-owner/team-manager/TeamManagersOwner';
import ManageEventOwner from './Pages/company-owner/event-programs/ManageEventOwner';
import ManageRecruitmentOwner from './Pages/company-owner/recruitments/ManageRecruitmentOwner';
import TasksOwner from './Pages/company-owner/tasks/TasksOwner';
import ProjectOwner from './Pages/company-owner/projects/ProjectOwner';
import FeedbackOwner from './Pages/company-owner/feedbacks/FeedbackOwner';
import ManagerLayout from './Pages/team-manager/ManagerLayout';
import ManagerHome from './Pages/team-manager/ManagerHome';
import ManagerGoogleMeet from './Pages/team-manager/ManagerGoogleMeet';
import ManagerProject from './Pages/team-manager/ManagerProject';
import ManagerTask from './Pages/team-manager/ManagerTask';
import ViewCompanyOwner from './Pages/admin-dashboard/company-owner/ViewCompanyOwner';
import ViewTeamManager from './Pages/admin-dashboard/team-manager/ViewTeamManager';
import MessagesPage from './components/MessagesPage';
import ViewTeamMembersAd from './Pages/admin-dashboard/team-member/ViewTeamMembersAd';
import AddEventsAd from './Pages/admin-dashboard/manage-events/AddEventsAd';
import ViewEventsAd from './Pages/admin-dashboard/manage-events/ViewEventsAd';
import AddRecruitmentAd from './Pages/admin-dashboard/manage-recruitment/AddRecruitmentAd';
import ViewRecruitmentAd from './Pages/admin-dashboard/manage-recruitment/ViewRecruitmentAd';
import AddMeetingsAd from './Pages/admin-dashboard/google-meet/AddMeetingsAd';
import ViewMeetingsAd from './Pages/admin-dashboard/google-meet/ViewMeetingsAd';
import AddDocuments from './Pages/admin-dashboard/file-documents/AddDocuments';
import ViewDocumentsAd from './Pages/admin-dashboard/file-documents/ViewDocumentsAd';
import AddManagersCo from './Pages/company-owner/team-manager/AddManagersCo';
import ViewManagersCo from './Pages/company-owner/team-manager/ViewManagersCo';
import AddMembersCo from './Pages/company-owner/team-member/AddMembersCo';
import TeamMembersOwner from './Pages/company-owner/team-member/TeamMembersOwner';
import ViewMembersCo from './Pages/company-owner/team-member/ViewMembersCo';
import AddTasksCo from './Pages/company-owner/tasks/AddTasksCo';
import ViewTasksCo from './Pages/company-owner/tasks/ViewTasksCo';
import AddProjectCo from './Pages/company-owner/projects/AddProjectCo';
import ViewProjectsCo from './Pages/company-owner/projects/ViewProjectsCo';
import AddFeedbackCo from './Pages/company-owner/feedbacks/AddFeedbackCo';
import ViewFeedbackCo from './Pages/company-owner/feedbacks/ViewFeedbackCo';
import AlertOwner from './Pages/company-owner/alert/AlertOwner';
import AddAlertCo from './Pages/company-owner/alert/AddAlertCo';
import ViewAlert from './Pages/company-owner/alert/ViewAlert';
import AddEventCo from './Pages/company-owner/event-programs/AddEventCo';
import ViewEventCo from './Pages/company-owner/event-programs/ViewEventCo';
import AddRecruitmentCo from './Pages/company-owner/recruitments/AddRecruitmentCo';
import ViewRecruitmentCo from './Pages/company-owner/recruitments/ViewRecruitmentCo';
import MeetingsCo from './Pages/company-owner/meetings/MeetingsCo';
import AddMeetingsCo from './Pages/company-owner/meetings/AddMeetingsCo';
import ViewMeetingsCo from './Pages/company-owner/meetings/ViewMeetingsCo';
import MembersMg from './Pages/team-manager/team-member/MembersMg';
import AddMembersMg from './Pages/team-manager/team-member/AddMembersMg';
import ViewMembersMg from './Pages/team-manager/team-member/ViewMembersMg';
import AddTasksMg from './Pages/team-manager/AddTasksMg';
import ViewTasksMg from './Pages/team-manager/ViewTasksMg';
import AddProjectMg from './Pages/team-manager/AddProjectMg';
import ViewProjectMg from './Pages/team-manager/ViewProjectMg';
import AddMeetingsMg from './Pages/team-manager/AddMeetingsMg';
import ViewMeetings from './Pages/team-manager/ViewMeetings';
import ManagerFeedback from './Pages/team-manager/ManagerFeedback';
import AddFeedbackMg from './Pages/team-manager/AddFeedbackMg';
import ViewFeedbackMg from './Pages/team-manager/ViewFeedbackMg';
import ManagerTodo from './Pages/team-manager/ManagerToDo';
import AddToDoMg from './Pages/team-manager/AddToDoMg';
import ViewTodoMg from './Pages/team-manager/ViewToDoMg';
import MemberLayout from './Pages/team-member/MemberLayout';
import MemberHome from './Pages/team-member/MemberHome';
import TasksMb from './Pages/team-member/TasksMb';
import AddTasksMb from './Pages/team-member/AddTasksMb';
import ViewTasksMb from './Pages/team-member/ViewTasksMb';
import ProjectsMb from './Pages/team-member/ProjectsMb';
import MemberFeedback from './Pages/team-member/MemberFeedback';
import AddFeedbackMb from './Pages/team-member/AddFeedbackMb';
import MeetingsMb from './Pages/team-member/MeetingsMb';
import ToDoMb from './Pages/team-member/ToDoMb';
import AddToDoMb from './Pages/team-member/AddToDoMb';
import ViewToDoMb from './Pages/team-member/ViewToDoMb';
import DocumentsMb from './Pages/team-member/DocumentsMb';
import ProtectedRoute from './helper/protectedRoute';
// import Log from './components/Log';
// import Dashboard from './components/manager/Dashboard';

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />
      {/* <Route path='/login' element={<Log/>}/> */}

      {/* <Route path="/register" element={<Reg />} /> */}

      <Route path="/messages" element={<MessagesPage />} />
      <Route element={<ProtectedRoute />}>
        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />{" "}
          {/* Default route for /admin */}
          <Route path="company-owner" element={<CompanyOwners />} />
          <Route path="company-owner/add" element={<AddCompanyOwner />} />
          <Route path="company-owner/edit/:id" element={<AddCompanyOwner />} />
          <Route path="company-owner/view/:id" element={<ViewCompanyOwner />} />
          <Route path="team-managers" element={<TeamManagersAd />} />
          <Route path="team-managers/add" element={<AddTeamManagersAd />} />
          <Route
            path="team-managers/edit/:id"
            element={<AddTeamManagersAd />}
          />
          <Route path="team-managers/view/:id" element={<ViewTeamManager />} />
          <Route path="team-members" element={<TeamMembersAd />} />
          <Route path="team-members/add" element={<AddTeamMembersAd />} />
          <Route path="team-members/edit/:id" element={<AddTeamMembersAd />} />
          <Route path="team-members/view/:id" element={<ViewTeamMembersAd />} />
          <Route path="events" element={<ManageEventAd />} />
          <Route path="events/add" element={<AddEventsAd />} />
          <Route path="events/edit/:id" element={<AddEventsAd />} />
          <Route path="events/view/:id" element={<ViewEventsAd />} />
          <Route path="recruitment" element={<ManageRecruitmentAd />} />
          <Route path="recruitment/add" element={<AddRecruitmentAd />} />
          <Route path="recruitment/edit/:id" element={<AddRecruitmentAd />} />
          <Route path="recruitment/view/:id" element={<ViewRecruitmentAd />} />
          <Route path="meetings" element={<GoogleMeetAd />} />
          <Route path="meetings/add" element={<AddMeetingsAd />} />
          <Route path="meetings/edit/:id" element={<AddMeetingsAd />} />
          <Route path="meetings/view/:id" element={<ViewMeetingsAd />} />
          <Route path="documents" element={<FileDocumentsAd />} />
          <Route path="documents/add" element={<AddDocuments />} />
          <Route path="documents/edit/:id" element={<AddDocuments />} />
          <Route path="documents/view/:id" element={<ViewDocumentsAd />} />
          <Route path="lookup/customer-type" element={<CustomerTypeAd />} />
          <Route path="lookup/role" element={<ManageRolesAd />} />
          <Route path="lookup/industry" element={<IndustryAd />} />
          <Route path="lookup/priority" element={<PriorityAd />} />
          <Route path="lookup/task-module" element={<TaskModuleAd />} />
          {/* <Route path="projects" element={<Projects />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} /> */}
        </Route>
        </Route>

        {/* Team Member Dashboard */}
        <Route element={<ProtectedRoute />}>
        <Route path="/team-member" element={<MemberLayout />}>
          <Route index element={<MemberHome />} />

          <Route path="tasks" element={<TasksMb />} />
          <Route path="tasks/add" element={<AddTasksMb />} />
          <Route path="tasks/edit/:id" element={<AddTasksMb />} />
          <Route path="tasks/view/:id" element={<ViewTasksMb />} />

          <Route path="projects" element={<ProjectsMb />} />

          <Route path="feedback" element={<MemberFeedback />} />
          <Route path="feedbacks/add" element={<AddFeedbackMb />} />

          <Route path="meetings" element={<MeetingsMb />} />

          <Route path="to-do" element={<ToDoMb />} />
          <Route path="to-do/add" element={<AddToDoMb />} />
          <Route path="to-do/edit/:id" element={<AddToDoMb />} />
          <Route path="to-do/view/:id" element={<ViewToDoMb />} />

          <Route path="documents" element={<DocumentsMb />} />
        </Route>
        </Route>
        {/* Team Manager Dashboard */}
        <Route element={<ProtectedRoute />}>
        <Route path="/team-manager" element={<ManagerLayout />}>
          <Route index element={<ManagerHome />} />

          <Route path="team-members" element={<MembersMg />} />
          <Route path="team-members/add" element={<AddMembersMg />} />
          <Route path="team-members/edit/:id" element={<AddMembersMg />} />
          <Route path="team-members/view/:id" element={<ViewMembersMg />} />

          <Route path="tasks" element={<ManagerTask />} />
          <Route path="tasks/add" element={<AddTasksMg />} />
          <Route path="tasks/edit/:id" element={<AddTasksMg />} />
          <Route path="tasks/view/:id" element={<ViewTasksMg />} />

          <Route path="projects" element={<ManagerProject />} />
          <Route path="projects/add" element={<AddProjectMg />} />
          <Route path="projects/edit/:id" element={<AddProjectMg />} />
          <Route path="projects/view/:id" element={<ViewProjectMg />} />

          <Route path="meetings" element={<ManagerGoogleMeet />} />
          <Route path="meetings/add" element={<AddMeetingsMg />} />
          <Route path="meetings/edit/:id" element={<AddMeetingsMg />} />
          <Route path="meetings/view/:id" element={<ViewMeetings />} />

          <Route path="feedbacks" element={<ManagerFeedback />} />
          <Route path="feedbacks/add" element={<AddFeedbackMg />} />
          <Route path="feedbacks/edit/:id" element={<AddFeedbackMg />} />
          <Route path="feedbacks/view/:id" element={<ViewFeedbackMg />} />

          <Route path="to-do" element={<ManagerTodo />} />
          <Route path="to-do/add" element={<AddToDoMg />} />
          <Route path="to-do/edit/:id" element={<AddToDoMg />} />
          <Route path="to-do/view/:id" element={<ViewTodoMg />} />

          {/* <Route path="tasks" element={<Tasks />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<Analytics />} /> */}
        </Route>
        </Route>

        {/* Company Owner Dashboard */}
        <Route element={<ProtectedRoute />}>
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<OwnerHome />} />

          <Route path="team-managers" element={<TeamManagersOwner />} />
          <Route path="team-managers/add" element={<AddManagersCo />} />
          <Route path="team-managers/edit/:id" element={<AddManagersCo />} />
          <Route path="team-managers/view/:id" element={<ViewManagersCo />} />

          <Route path="team-members" element={<TeamMembersOwner />} />
          <Route path="team-members/add" element={<AddMembersCo />} />
          <Route path="team-members/edit/:id" element={<AddMembersCo />} />
          <Route path="team-members/view/:id" element={<ViewMembersCo />} />

          <Route path="tasks" element={<TasksOwner />} />
          <Route path="tasks/add" element={<AddTasksCo />} />
          <Route path="tasks/edit/:id" element={<AddTasksCo />} />
          <Route path="tasks/view/:id" element={<ViewTasksCo />} />

          <Route path="projects" element={<ProjectOwner />} />
          <Route path="projects/add" element={<AddProjectCo />} />
          <Route path="projects/edit/:id" element={<AddProjectCo />} />
          <Route path="projects/view/:id" element={<ViewProjectsCo />} />

          <Route path="feedbacks" element={<FeedbackOwner />} />
          <Route path="feedbacks/add" element={<AddFeedbackCo />} />
          <Route path="feedbacks/edit/:id" element={<AddFeedbackCo />} />
          <Route path="feedbacks/view/:id" element={<ViewFeedbackCo />} />

          <Route path="alerts" element={<AlertOwner />} />
          <Route path="alerts/add" element={<AddAlertCo />} />
          <Route path="alerts/edit/:id" element={<AddAlertCo />} />
          <Route path="alerts/view/:id" element={<ViewAlert />} />

          <Route path="events" element={<ManageEventOwner />} />
          <Route path="events/add" element={<AddEventCo />} />
          <Route path="events/edit/:id" element={<AddEventCo />} />
          <Route path="events/view/:id" element={<ViewEventCo />} />

          <Route path="recruitments" element={<ManageRecruitmentOwner />} />
          <Route path="recruitments/add" element={<AddRecruitmentCo />} />
          <Route path="recruitments/edit/:id" element={<AddRecruitmentCo />} />
          <Route path="recruitments/view/:id" element={<ViewRecruitmentCo />} />

          <Route path="meetings" element={<MeetingsCo />} />
          <Route path="meetings/add" element={<AddMeetingsCo />} />
          <Route path="meetings/edit/:id" element={<AddMeetingsCo />} />
          <Route path="meetings/view/:id" element={<ViewMeetingsCo />} />
          {/* <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} /> */}
        </Route>
        </Route>
      
    </Routes>
  );
}

export default App;
