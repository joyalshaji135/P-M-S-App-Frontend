import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function  AddToDoMg () {
  const navigate = useNavigate();
  const { id } = useParams(); // Get to-do ID from URL (if editing)

  // State for form fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
  });

  // Check if we're editing an existing to-do
  const isEditMode = !!id;

  // Fetch to-do data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const storedTodos = JSON.parse(localStorage.getItem('todosMg')) || [];
      const todoToEdit = storedTodos.find((todo) => todo.id === parseInt(id));
      if (todoToEdit) {
        setFormData(todoToEdit);
      } else {
        navigate('/team-manager/to-do'); // Redirect if to-do not found
      }
    }
  }, [id, isEditMode, navigate]);

  // Handle form input changes
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

    const newTodo = {
      id: isEditMode ? parseInt(id) : Date.now(), // Use existing ID for edit, or generate new ID
      ...formData,
    };

    // Save to localStorage
    const storedTodos = JSON.parse(localStorage.getItem('todosMg')) || [];
    let updatedTodos;

    if (isEditMode) {
      // Update existing to-do
      updatedTodos = storedTodos.map((todo) =>
        todo.id === parseInt(id) ? newTodo : todo
      );
    } else {
      // Add new to-do
      updatedTodos = [...storedTodos, newTodo];
    }

    localStorage.setItem('todosMg', JSON.stringify(updatedTodos));

    // Redirect to the to-do list page
    navigate('/team-manager/todos');
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {isEditMode ? 'Edit To-Do' : 'Add To-Do'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        {/* Status Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {isEditMode ? 'Update To-Do' : 'Add To-Do'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddToDoMg;