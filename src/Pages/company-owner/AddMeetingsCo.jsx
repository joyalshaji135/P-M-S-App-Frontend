import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddMeetingsCo() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL

  // State for form data
  const [formData, setFormData] = useState({
    id: Date.now(),
    title: '',
    time: '',
    link: '',
  });

  // Fetch data from local storage on component mount (for editing)
  useEffect(() => {
    if (id) {
      // If id exists, fetch the data for editing
      const storedData = JSON.parse(localStorage.getItem('meetings')) || [];
      const meetingToEdit = storedData.find((meeting) => meeting.id === parseInt(id));
      if (meetingToEdit) {
        setFormData(meetingToEdit); // Pre-fill the form with existing data
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
    const storedData = JSON.parse(localStorage.getItem('meetings')) || [];

    if (id) {
      // If editing, update the existing entry
      const updatedData = storedData.map((meeting) =>
        meeting.id === parseInt(id) ? formData : meeting
      );
      localStorage.setItem('meetings', JSON.stringify(updatedData));
    } else {
      // If adding, create a new entry
      const updatedData = [...storedData, formData];
      localStorage.setItem('meetings', JSON.stringify(updatedData));
    }

    // Redirect to the Meetings page
    navigate('/owner/meetings');
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? 'Edit Meeting' : 'Add Meeting'}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        {/* Grid Layout for Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Meeting Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter meeting title"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter meeting time"
              required
            />
          </div>

          {/* Meeting Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter meeting link"
              required
            />
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

export default AddMeetingsCo;