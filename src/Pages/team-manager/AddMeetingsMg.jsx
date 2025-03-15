import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddMeetingsMg() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL

  // State for form data
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: '',
    description: '',
    industryProject: '',
    customer: '',
    meetingDate: '',
    meetingTime: '',
    meetingLink: '',
    meetingStatus: 'Scheduled',
  });

  // Fetch data from local storage on component mount (for editing)
  useEffect(() => {
    if (id) {
      const storedData = JSON.parse(localStorage.getItem('meetingsMg')) || [];
      const meetingToEdit = storedData.find((meeting) => meeting.id === parseInt(id));
      if (meetingToEdit) {
        setFormData(meetingToEdit);
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
    const storedData = JSON.parse(localStorage.getItem('meetingsMg')) || [];

    if (id) {
      // If editing, update the existing entry
      const updatedData = storedData.map((meeting) =>
        meeting.id === parseInt(id) ? formData : meeting
      );
      localStorage.setItem('meetingsMg', JSON.stringify(updatedData));
    } else {
      // If adding, create a new entry
      const updatedData = [...storedData, formData];
      localStorage.setItem('meetingsMg', JSON.stringify(updatedData));
    }

    // Redirect to the meetings management page
    navigate('/team-manager/meetings');
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? 'Edit Meeting' : 'Add Meeting'}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Meeting Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter meeting name"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter meeting description"
              rows="4"
              required
            />
          </div>

          {/* Industry Project */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry Project</label>
            <input
              type="text"
              name="industryProject"
              value={formData.industryProject}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter industry project"
              required
            />
          </div>

          {/* Customer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter customer"
              required
            />
          </div>

          {/* Meeting Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Date</label>
            <input
              type="date"
              name="meetingDate"
              value={formData.meetingDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Meeting Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Time</label>
            <input
              type="time"
              name="meetingTime"
              value={formData.meetingTime}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Meeting Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
            <input
              type="url"
              name="meetingLink"
              value={formData.meetingLink}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter meeting link"
              required
            />
          </div>

          {/* Meeting Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Status</label>
            <select
              name="meetingStatus"
              value={formData.meetingStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
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

export default AddMeetingsMg;