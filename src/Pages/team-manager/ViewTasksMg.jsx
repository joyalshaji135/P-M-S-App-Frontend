import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewTasksMg() {
  const { id } = useParams(); // Get the id from the URL
  const [task, setTask] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('tasksMg')) || [];
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
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
            <p className="text-gray-900">{task.taskName}</p>
          </div>

          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <p className="text-gray-900">{task.taskTitle}</p>
          </div>

          {/* Task Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
            <p className="text-gray-900">{task.taskDescription}</p>
          </div>

          {/* Task Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Status</label>
            <p className="text-gray-900">{task.taskStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTasksMg;