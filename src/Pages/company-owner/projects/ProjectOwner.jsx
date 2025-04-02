import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteIndustryProject, getAllIndustryProjects } from '../../../api/pages-api/team-manager-api/industry-project-api/TMIndustryProjectApi';

function ProjectOwner() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Fetch projects from getAllIndustryProjects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getAllIndustryProjects();
        if (response.success && response.industryProjects) {
          setProjects(response.industryProjects);
          setFilteredProjects(response.industryProjects);
        } else {
          toast.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('An error occurred while fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...projects];
    
    // Apply search filter
    if (searchText) {
      const searchValue = searchText.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.projectName.toLowerCase().includes(searchValue) ||
          (project.industry?.name?.toLowerCase().includes(searchValue) ||
          project.projectStatus.toLowerCase().includes(searchValue))
)
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(project => project.projectStatus === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'All') {
      filtered = filtered.filter(project => project.priority?.name === priorityFilter);
    }
    
    setFilteredProjects(filtered);
  }, [projects, searchText, statusFilter, priorityFilter]);

  // Handle delete functionality
  const handleDeleteProject = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;
  
    try {
      // Add await here to properly resolve the promise
      const response = await deleteIndustryProject(id);
      if (response.success) {
        const updatedProjects = projects.filter((project) => project._id !== id);
        setProjects(updatedProjects);
        setFilteredProjects(updatedProjects);
        toast.success(response.message);
      } else {
        toast.error(response.message || "Failed to delete project.");
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  // Status options for filter
  const statusOptions = ['All', 'Ongoing', 'Completed', 'Pending'];
  const priorityOptions = ['All', 'High', 'Medium', 'Low'];

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Project Dashboard</h1>
          <p className="text-gray-600">Manage all your industry projects</p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto gap-3">
          {/* Add Button */}
          <Link
            to="/team-manager/projects/add"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap text-center flex items-center gap-2 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Project
          </Link>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Bar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              {priorityOptions.map((priority) => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
          
          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchText('');
                setStatusFilter('All');
                setPriorityFilter('All');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 w-full"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No projects found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          <div className="mt-6">
            <Link
              to="/team-manager/projects/add"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New Project
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div key={project._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
              {/* Card Header */}
              <div className="px-4 py-3 border-b border-gray-200 bg-blue-50 flex justify-between items-center">
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    project.projectStatus === 'Ongoing'
                      ? 'bg-blue-100 text-blue-800'
                      : project.projectStatus === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {project.projectStatus}
                  </span>
                </div>
                <div className="text-xs text-gray-500">#{project.code}</div>
              </div>
              
              {/* Card Body */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{project.projectName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    project.priority?.name === 'High' 
                      ? 'bg-red-100 text-red-800' 
                      : project.priority?.name === 'Medium' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {project.priority?.name || 'N/A'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 mb-1">{project.nameAlias}</p>
                
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {project.industry?.name || 'N/A'}
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {project.customer?.name || 'N/A'}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(project.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(project.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
                {/* View Button */}
                <Link to={`/team-manager/projects/view/${project._id}`}>
                  <button 
                    className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                    title="View"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Link>

                {/* Edit Button */}
                <Link to={`/team-manager/projects/edit/${project._id}`}>
                  <button 
                    className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-50"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </Link>

                {/* Delete Button */}
                <button
                  className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                  onClick={() => handleDeleteProject(project._id)}
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectOwner;