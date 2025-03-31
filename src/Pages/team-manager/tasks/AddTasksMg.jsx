import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddTasksMg() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL

  // State for form data
  const [formData, setFormData] = useState({
    id: Date.now(),
    code: '',
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

  // Fetch data from local storage on component mount (for editing)
  useEffect(() => {
    if (id) {
      const storedData = JSON.parse(localStorage.getItem('tasksMg')) || [];
      const taskToEdit = storedData.find((task) => task.id === parseInt(id));
      if (taskToEdit) {
        setFormData(taskToEdit);
      }
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing data from local storage
    const storedData = JSON.parse(localStorage.getItem('tasksMg')) || [];

    if (id) {
      // If editing, update the existing entry
      const updatedData = storedData.map((task) =>
        task.id === parseInt(id) ? formData : task
      );
      localStorage.setItem('tasksMg', JSON.stringify(updatedData));
    } else {
      // If adding, create a new entry
      const updatedData = [...storedData, formData];
      localStorage.setItem('tasksMg', JSON.stringify(updatedData));
    }

    // Redirect to the tasks management page
    navigate('/team-manager/tasks');
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? 'Edit Task' : 'Add Task'}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Task Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task code"
              required
            />
          </div>

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

          {/* Resource Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resource Name</label>
            <input
              type="text"
              name="resourceName"
              value={formData.resourceName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter resource name"
              required
            />
          </div>

          {/* Project */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project"
              required
            />
          </div>

          {/* Task Module */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Module</label>
            <input
              type="text"
              name="taskModule"
              value={formData.taskModule}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task module"
              required
            />
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

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {id ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTasksMg;