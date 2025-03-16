import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewManagersCo() {
  const { id } = useParams(); // Get the id from the URL
  const [manager, setManager] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('teamManagers')) || [];
    const managerToView = storedData.find((manager) => manager.id === parseInt(id));
    if (managerToView) {
      setManager(managerToView);
    }
  }, [id]);

  if (!manager) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Manager</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo and Name */}
          <div className="flex items-center space-x-4">
            <img
              src={manager.photo || 'https://via.placeholder.com/50'}
              alt={manager.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <span className="text-xl font-medium">{manager.name}</span>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-gray-900">{manager.description}</p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <p className="text-gray-900">{manager.status}</p>
          </div>

          {/* Additional Fields (if any) */}
          {/* Example: Email */}
          {manager.email && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{manager.email}</p>
            </div>
          )}

          {/* Example: Phone */}
          {manager.phone && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <p className="text-gray-900">{manager.phone}</p>
            </div>
          )}

          {/* Example: Address */}
          {manager.address && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <p className="text-gray-900">{manager.address}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewManagersCo;