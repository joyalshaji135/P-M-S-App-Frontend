import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addIndustryProject, getIndustryProjectById, updateIndustryProject } from '../../../api/pages-api/team-manager-api/industry-project-api/TMIndustryProjectApi';
import { getAllIndustryNatures, getAllPriority, getAllTeamManagers } from '../../../api/comon-dropdown-api/ComonDropDownApi';

function AddProjectCo() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State for form data
  const [formData, setFormData] = useState({
    projectName: '',
    customer: '',
    industry: '',
    priority: '',
    description: '',
    projectStatus: 'Ongoing',
    startDate: '',
    endDate: '',
  });

  // State for dropdown options
  const [customers, setCustomers] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjectData = async (projectId) => {
    try {
      setLoading(true);
      const response = await getIndustryProjectById(projectId);
      
      if (response.success && response.industryProject) {
        const project = response.industryProject;
        setFormData({
          projectName: project.projectName,
          customer: project.customer?._id || '',
          industry: project.industry?._id || '',
          priority: project.priority?._id || '',
          description: project.description,
          projectStatus: project.projectStatus,
          startDate: project.startDate ? project.startDate.split('T')[0] : '',
          endDate: project.endDate ? project.endDate.split('T')[0] : '',
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project data:', error);
      toast.error('Failed to load project data');
      setLoading(false);
    }
  };

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        setLoading(true);
        
        // Fetch all dropdown data in parallel
        const [customersRes, industriesRes, prioritiesRes] = await Promise.all([
          getAllTeamManagers(),
          getAllIndustryNatures(),
          getAllPriority()
        ]);
  
        setCustomers(customersRes.teamManagerList || []);
        setIndustries(industriesRes.industryNatures || []);
        setPriorities(prioritiesRes.priority || []);
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
        toast.error('Failed to load dropdown options');
        setLoading(false);
      }
    };

    fetchDropdownData();
    
    if (id) {
      fetchProjectData(id);
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
    setLoading(true);
  
    try {
      let response;
      if (id) {
        // Update existing project
        response = await updateIndustryProject(id, formData);
      } else {
        // Create new project
        response = await addIndustryProject(formData);
      }
  
      if (response.success) {
        toast.success(response.message);
        navigate('/team-manager/projects');
      } else {
        toast.error(response.message || 'Operation failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.projectName) {
    return (
      <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? 'Edit Project' : 'Add Project'}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project name"
              required
            />
          </div>

          {/* Customer Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
            <select
              name="customer"
              value={formData.customer}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Industry Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Industry</option>
              {industries.map((industry) => (
                <option key={industry._id} value={industry._id}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Priority</option>
              {priorities.map((priority) => (
                <option key={priority._id} value={priority._id}>
                  {priority.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project description"
              rows="4"
              required
            />
          </div>

          {/* Project Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Status</label>
            <select
              name="projectStatus"
              value={formData.projectStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
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
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/team-manager/projects')}
            className="mr-4 bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Processing...' : (id ? 'Update' : 'Save')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectCo;