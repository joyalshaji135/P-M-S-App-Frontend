import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewProjectMg() {
  const { id } = useParams(); // Get the id from the URL
  const [project, setProject] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('projectsMg')) || [];
    const projectToView = storedData.find((project) => project.id === parseInt(id));
    if (projectToView) {
      setProject(projectToView);
    }
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Project</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <p className="text-gray-900">{project.projectName}</p>
          </div>

          {/* Customer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
            <p className="text-gray-900">{project.customer}</p>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <p className="text-gray-900">{project.industry}</p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <p className="text-gray-900">{project.priority}</p>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-gray-900">{project.description}</p>
          </div>

          {/* Project Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Status</label>
            <p className="text-gray-900">{project.projectStatus}</p>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <p className="text-gray-900">{project.startDate}</p>
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <p className="text-gray-900">{project.endDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProjectMg;