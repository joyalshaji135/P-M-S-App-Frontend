import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEventProgram } from '../../../api/pages-api/admin-dashboard-api/event-program-api/EventProgramApi';

function AddEventsAd() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL

  // State for form data
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: '',
    location: '',
    date: '',
    time: '',
    description: '',
    industry: '',
    priority: '',
    eventPost: '',
    Domain: '',
  });

  // Dropdown options
const industries = [
  { key: "technology", value: "Technology" },
  { key: "healthcare", value: "Healthcare" },
  { key: "finance", value: "Finance" },
  { key: "education", value: "Education" },
  { key: "entertainment", value: "Entertainment" },
];

const priorities = [
  { key: "low", value: "Low" },
  { key: "medium", value: "Medium" },
  { key: "high", value: "High" },
];
  const domains = [
    { key: "marketing", value: "Marketing" },
    { key: "sales", value: "Sales" },
    { key: "operations", value: "Operations" },
    { key: "hr", value: "HR" },
    { key: "it", value: "IT" },
  ];

  // Fetch data from local storage on component mount
  // useEffect(() => {
  //   if (id) {
  //     // If id exists, fetch the data for editing
  //     const storedData = JSON.parse(localStorage.getItem('events')) || [];
  //     const eventToEdit = storedData.find((event) => event.id === parseInt(id));
  //     if (eventToEdit) {
  //       setFormData(eventToEdit); // Pre-fill the form with existing data
  //     }
  //   }
  // }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Get existing data from local storage
  //   const storedData = JSON.parse(localStorage.getItem('events')) || [];

  //   if (id) {
  //     // If editing, update the existing entry
  //     const updatedData = storedData.map((event) =>
  //       event.id === parseInt(id) ? formData : event
  //     );
  //     localStorage.setItem('events', JSON.stringify(updatedData));
  //   } else {
  //     // If adding, create a new entry
  //     const updatedData = [...storedData, formData];
  //     localStorage.setItem('events', JSON.stringify(updatedData));
  //   }

  //   // Redirect to the Events page
  //   navigate('/admin/events');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createEventProgram(formData);
      if (response.success) {
        toast.success(response.message || "Event Program Created Successfully");
        navigate('/admin/events');
      }
      else{
        toast.error(response.message || "Failed to create Event Program");
      }
    } catch (error) {
      console.error("Error creating event program:", error);
      toast.error(error.message || "Failed to create event program");
    }
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? "Edit Event" : "Add Event"}
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        {/* Grid Layout for Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event name"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event location"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event description"
              rows="4"
              required
            />
          </div>

          {/* Industry Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Industry</option>
              {industries.map((industry) => (
                <option key={industry.key} value={industry.key}>
                  {industry.value}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Priority</option>
              {priorities.map((priority) => (
                <option key={priority.key} value={priority.key}>
                  {priority.value}
                </option>
              ))}
            </select>
          </div>

          {/* Domain Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Domain
            </label>
            <select
              name="Domain"
              value={formData.Domain}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Priority</option>
              {domains.map((domain) => (
                <option key={domain.key} value={domain.key}>
                  {domain.value}
                </option>
              ))}
            </select>
          </div>

          {/* Event Post */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Post
            </label>
            <textarea
              name="eventPost"
              value={formData.eventPost}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event post"
              rows="4"
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
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEventsAd;