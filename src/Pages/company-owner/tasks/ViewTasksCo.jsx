import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewTasksCo() {
  const { id } = useParams(); // Get the id from the URL
  const [task, setTask] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskToView = storedData.find((task) => task.id === parseInt(id));
    if (taskToView) {
      setTask(taskToView);
    }
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Task</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <p className="text-gray-900">{task.title}</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-gray-900">{task.description}</p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <p className="text-gray-900">{task.status}</p>
          </div>

          {/* Assigned To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
            <p className="text-gray-900">{task.assignedTo}</p>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <p className="text-gray-900">{task.dueDate}</p>
          </div>   
        </div>
      </div>
    </div>
  );
}

export default ViewTasksCo;