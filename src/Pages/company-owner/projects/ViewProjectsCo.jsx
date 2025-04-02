import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { getIndustryProjectById } from '../../../api/pages-api/team-manager-api/industry-project-api/TMIndustryProjectApi';

function ViewProjectsCo() {
  const { id } = useParams(); // Get the id from the URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Fetch project data from API
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await getIndustryProjectById(id);
        if (response.success && response.industryProject) {
          setProject(response.industryProject);
        } else {
          toast.error('Project not found');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project data');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="flex-1 p-6 overflow-y-auto">Loading...</div>;
  }

  if (!project) {
    return <div className="flex-1 p-6 overflow-y-auto">Project not found</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Project Details</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Project Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Code</label>
            <p className="text-gray-900 font-medium">{project.code || 'N/A'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <p className="text-gray-900 font-medium">{project.projectName || 'N/A'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name Alias</label>
            <p className="text-gray-900 font-medium">{project.nameAlias || 'N/A'}</p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              project.projectStatus === 'Ongoing'
                ? 'bg-blue-100 text-blue-800'
                : project.projectStatus === 'Completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {project.projectStatus || 'N/A'}
            </span>
          </div>

          {/* Customer Information */}
          <div className="md:col-span-2 border-t pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900 font-medium">{project.customer?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900 font-medium">{project.customer?.email || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p className="text-gray-900 font-medium">{project.customer?.phone || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <p className="text-gray-900 font-medium capitalize">
                  {project.customer?.role?.replace('-', ' ') || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="md:col-span-2 border-t pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Project Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <div className="mt-1">
                  <p className="text-gray-900 font-medium">{project.industry?.name || 'N/A'}</p>
                  <p className="text-gray-500 text-sm">{project.industry?.code || ''}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <div className="mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    project.priority?.name === 'High' 
                      ? 'bg-red-100 text-red-800' 
                      : project.priority?.name === 'Medium' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {project.priority?.name || 'N/A'}
                  </span>
                  <p className="text-gray-500 text-sm mt-1">{project.priority?.code || ''}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <p className="text-gray-900 font-medium">{formatDate(project.startDate)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <p className="text-gray-900 font-medium">{formatDate(project.endDate)}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2 border-t pt-4 mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <div className="mt-1 p-4 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-gray-900 whitespace-pre-line">
                {project.description || 'No description provided'}
              </p>
            </div>
          </div>

          {/* Created By */}
          <div className="md:col-span-2 border-t pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Created By</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900 font-medium">{project.createdBy?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900 font-medium">{project.createdBy?.email || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="md:col-span-2 border-t pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
                <p className="text-gray-900 font-medium">{formatDate(project.createdAt)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Updated At</label>
                <p className="text-gray-900 font-medium">{formatDate(project.updatedAt)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Is Default</label>
                <p className="text-gray-900 font-medium">{project.isDefault ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Is Deleted</label>
                <p className="text-gray-900 font-medium">{project.isDeleted ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProjectsCo;