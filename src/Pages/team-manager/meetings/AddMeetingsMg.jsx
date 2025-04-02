import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addGoogleMeetSession, getGoogleMeetSessionById, updateGoogleMeetSessionById } from '../../../api/pages-api/company-owner-api/google-meet-api/COGoogleMeetingApi';
import { toast } from 'react-toastify';

function AddMeetingsMg() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    customer: '',
    meetingTime: '',
    meetingLink: '',
    industryProject: '',
    meetingDate: '',
    meetingStatus: '',
    industryProjects: ''
  });

  // State for dropdown options
  const [industryProjects, setIndustryProjects] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Fetch data from getGoogleMeetSessionById
  useEffect(() => {
    if (id) {
      // Fetch data from getGoogleMeetSessionById api
      const fetchData = async () => {
        try {
          const response = await getGoogleMeetSessionById(id);
          const data = response.googleMeet;
          setFormData(data);
        } catch (error) {
          console.error('Error fetching meeting:', error);
        }
      };
      fetchData();
    }
    // Fetch industryProjects and customers (example data)
    setIndustryProjects([
      { _id: '64a1b2c3d4e5f6a7b8c9d0e2', name: 'Project 1' },
      { _id: '64a1b2c3d4e5f6a7b8c9d0e2', name: 'Project 2' },
    ]);
    setCustomers([
      { _id: '64a1b2c3d4e5f6a7b8c9d0e2', name: 'Customer 1' },
      { _id: '64a1b2c3d4e5f6a7b8c9d0e2', name: 'Customer 2' },
    ]);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
try {
  

    // Add or update meeting
    if (id) {
      // Update meeting
    var response =  await updateGoogleMeetSessionById(id, formData);
    } else {
      // Add meeting
    var response = await addGoogleMeetSession(formData);
    }
    if(response.success){
      toast.success(response.message || "Meeting saved successfully");
    navigate(-1);
    }
    else{
      toast.error(response.message || "Failed to save meeting");
    }
  }
   
catch (error) {
  console.error("Error adding meeting:", error);
  toast.error(error.message || "Failed to save meeting");
}
}
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? 'Edit Meeting' : 'Add Meeting'}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        {/* Grid Layout for Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter meeting title"
              required
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter meeting description"
              required
            ></textarea>
          </div>

          {/* Industry Project */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry Project</label>
            <select
              name="industryProject"
              value={formData.industryProject}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Industry Project</option>
              {industryProjects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Customer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
            <select
              name="customer"
              value={formData.customer}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Meeting Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Date</label>
            <input
              type="date"
              name="meetingDate"
              value={formData.meetingDate.split("T")[0]}
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
          <div className="col-span-2">
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
              <option value="">Select Status</option>
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