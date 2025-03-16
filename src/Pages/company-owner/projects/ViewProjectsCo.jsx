import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewProjectsCo() {
  const { id } = useParams(); // Get the id from the URL
  const [project, setProject] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('projects')) || [];
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
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900">{project.name}</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-gray-900">{project.description}</p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <p className="text-gray-900">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'Completed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {project.status}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProjectsCo;