import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddFeedbackMb() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get feedback ID from URL (if editing)

  // State for form fields
  const [formData, setFormData] = useState({
    message: '',
    severity: 'Low',
    alertStatus: true,
    triggeredAt: new Date().toISOString().slice(0, 16), // Default to current date and time
  });

  // Check if we're editing an existing feedback
  const isEditMode = !!id;

  // Fetch feedback data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacksMember')) || [];
      const feedbackToEdit = storedFeedbacks.find((fb) => fb.id === parseInt(id));
      if (feedbackToEdit) {
        setFormData({
          ...feedbackToEdit,
          triggeredAt: new Date(feedbackToEdit.triggeredAt).toISOString().slice(0, 16), // Format date for input
        });
      } else {
        navigate('/member/feedbacks'); // Redirect if feedback not found
      }
    }
  }, [id, isEditMode, navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      id: isEditMode ? parseInt(id) : Date.now(), // Use existing ID for edit, or generate new ID
      ...formData,
    };

    // Save to localStorage
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacksMember')) || [];
    let updatedFeedbacks;

    if (isEditMode) {
      // Update existing feedback
      updatedFeedbacks = storedFeedbacks.map((fb) =>
        fb.id === parseInt(id) ? newFeedback : fb
      );
    } else {
      // Add new feedback
      updatedFeedbacks = [...storedFeedbacks, newFeedback];
    }

    localStorage.setItem('feedbacksMember', JSON.stringify(updatedFeedbacks));

    // Redirect to the feedback list page
    navigate('/member/feedbacks');
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {isEditMode ? 'Edit Feedback' : 'Add Feedback'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Message Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        {/* Severity Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Severity</label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Alert Status Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Alert Status</label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="alertStatus"
                checked={formData.alertStatus}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Active</span>
            </label>
          </div>
        </div>

        {/* Triggered At Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Triggered At</label>
          <input
            type="datetime-local"
            name="triggeredAt"
            value={formData.triggeredAt}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {isEditMode ? 'Update Feedback' : 'Add Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFeedbackMb;