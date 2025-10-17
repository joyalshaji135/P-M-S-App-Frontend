import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addProjectTask, getProjectTaskById, updateProjectTask } from '../../../api/pages-api/team-manager-api/project-task-api/TMProjectTaskApi';
import { toast } from 'react-toastify';
import { getAllIndustryProjects, getAllTeamMembers, getAllTaskModules } from '../../../api/comon-dropdown-api/ComonDropDownApi';

function AddTasksMg() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL

  // State for form data
  const [formData, setFormData] = useState({
    taskName: '',
    resourceName: '',
    project: '',
    taskModule: '',
    startDate: '',
    endDate: '',
    taskTitle: '',
    taskDescription: '',
    taskHours: '',
    taskTakenTime: '',
    percentageOfCompleted: 0,
    taskStatus: 'Pending',
  });

  // State for dropdown options
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [taskModules, setTaskModules] = useState([]); // Changed from taskModule to taskModules for clarity
  const [loading, setLoading] = useState(false);

  // Fetch dropdown data and task data on component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        setLoading(true);
        // Fetch projects
        const projectsResponse = await getAllIndustryProjects();
        setProjects(projectsResponse.industryProjects || []);

        // Fetch team members
        const membersResponse = await getAllTeamMembers();
        setTeamMembers(membersResponse.teamMemberList || []);

        // Fetch task modules
        const modulesResponse = await getAllTaskModules();
        setTaskModules(modulesResponse.taskModules || []); // Adjust based on your API response structure
        
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        toast.error("Failed to load dropdown data");
      } finally {
        setLoading(false);
      }
    };

    const fetchTaskData = async () => {
      try {
        const response = await getProjectTaskById(id);
        const data = response.taskRole;
        setFormData(data);
      } catch (error) {
        console.error("Error fetching task:", error);
        toast.error("Failed to load task data");
      }
    };

    fetchDropdownData();
    if (id) {
      fetchTaskData();
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (id) {
        // Update existing task
        response = await updateProjectTask(id, formData);
      } else {
        // Create new task
        response = await addProjectTask(formData);
      }

      if (response.success) {
        toast.success(response.message);
        navigate('/team-manager/tasks');
      } else {
        toast.error(response.message || 'Operation failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
      // console.error("Error saving team members:", error);
      //       toast.error(error.message || "Failed to save team members");
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? 'Edit Task' : 'Add Task'}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        {loading ? (
          <div className="text-center py-8">Loading dropdown data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Task Code */}

            {/* Task Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
              <input
                type="text"
                name="taskName"
                value={formData.taskName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task name"
                required
              />
            </div>

            {/* Resource Name Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resource Name</label>
              <select
                name="resourceName"
                value={formData.resourceName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Resource</option>
                {teamMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
              <select
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.projectName}
                  </option>
                ))}
              </select>
            </div>

            {/* Task Module Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Module</label>
              <select
                name="taskModule"
                value={formData.taskModule}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Task Module</option>
                {taskModules.map((module) => (
                  <option key={module._id} value={module._id}>
                    {module.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate.split("T")[0]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate.split("T")[0]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Task Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input
                type="text"
                name="taskTitle"
                value={formData.taskTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
                required
              />
            </div>

            {/* Task Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
              <textarea
                name="taskDescription"
                value={formData.taskDescription}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description"
                rows="4"
                required
              />
            </div>

            {/* Task Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Hours</label>
              <input
                type="number"
                name="taskHours"
                value={formData.taskHours}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task hours"
                required
              />
            </div>

            {/* Task Taken Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Taken Time</label>
              <input
                type="number"
                name="taskTakenTime"
                value={formData.taskTakenTime}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task taken time"
                required
              />
            </div>

            {/* Percentage of Completed */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Percentage of Completed</label>
              <input
                type="number"
                name="percentageOfCompleted"
                value={formData.percentageOfCompleted}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter percentage of completion"
                min="0"
                max="100"
                required
              />
            </div>

            {/* Task Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Status</label>
              <select
                name="taskStatus"
                value={formData.taskStatus}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {id ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTasksMg;