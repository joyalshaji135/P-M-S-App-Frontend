import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addRecruitmentPost, getRecruitmentPostById, updateRecruitmentPostById } from '../../../api/pages-api/company-owner-api/manage-recruitment-api/CORecruitmentApi';
import { toast } from 'react-toastify';

function AddRecruitmentCo() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    recruitmentStatus: 'Active', // Default status
    industry: '',
    priority: '',
    recruitmentPost: '',
    recruitmentPosition: '',
    recruitmentLocation: '',
    recruitmentSalary: '',
    recruitmentStartDate: '',
    recruitmentEndDate: '',
    recruitmentContactPerson: '',
    recruitmentContactNumber: '',
    recruitmentEmail: '',
  });

  // Fetch data from local storage on component mount
  useEffect(() => {
    // getRecruitmentPostById api
    if (id) {
      // not local storage
      getRecruitmentPostById(id)
        .then((data) => {
          setFormData(data.recruitmentPost);
        })
        .catch((error) => {
          console.error("Error fetching recruitment post by ID:", error);
        });
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
          if (id) {
            // If editing, update the existing team manager
        var response =    await updateRecruitmentPostById(id, formData);
          } else {
            // If adding, create a new team manager
       var response =     await addRecruitmentPost(formData);
          }
          if(response?.success){
          toast.success(response.message || "Recruitment created successfully");          
        navigate(-1);  
        }      
        } catch (error) {
          console.error("Error creating event program:", error);
          toast.error(error.message || "Failed to create event program");
        }
    
    // Redirect to the Manage Recruitment page
    navigate('/admin/recruitment');
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? 'Edit Recruitment' : 'Add Recruitment'}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        {/* Grid Layout for Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Candidate Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter candidate name"
              required
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              type="text"
              name="recruitmentPosition"
              value={formData.recruitmentPosition}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter position"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="recruitmentStatus"
              value={formData.recruitmentStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer Sent">Offer Sent</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="60d21b4667d0d8992e610c90">High Level Industry</option>
              <option value="60d21b4667d0d8992e610c90">Medium Level Industry</option>
              <option value="60d21b4667d0d8992e610c90">Low Level Industry</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Recruitment Post */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Post</label>
            <input
              type="text"
              name="recruitmentPost"
              value={formData.recruitmentPost}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recruitment post"
              required
            />
          </div>

          {/* Recruitment Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Position</label>
            <input
              type="text"
              name="recruitmentPosition"
              value={formData.recruitmentPosition}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recruitment position"
              required
            />
          </div>

          {/* Recruitment Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Location</label>
            <input
              type="text"
              name="recruitmentLocation"
              value={formData.recruitmentLocation}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recruitment location"
              required
            />
          </div>

          {/* Recruitment Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Salary</label>
            <input
              type="text"
              name="recruitmentSalary"
              value={formData.recruitmentSalary}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recruitment salary"
              required
            />
          </div>

          {/* Recruitment Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Start Date</label>
            <input
              type="date"
              name="recruitmentStartDate"
              value={formData.recruitmentStartDate.split("T")[0]}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Recruitment End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment End Date</label>
            <input
              type="date"
              name="recruitmentEndDate"
              value={formData.recruitmentEndDate.split("T")[0]}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Recruitment Contact Person */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Contact Person</label>
            <input
              type="text"
              name="recruitmentContactPerson"
              value={formData.recruitmentContactPerson}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recruitment contact person"
              required
            />
          </div>

          {/* Recruitment Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Contact Number</label>
            <input
              type="text"
              name="recruitmentContactNumber"
              value={formData.recruitmentContactNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recruitment contact number"
              required
            />
          </div>

          {/* Recruitment Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Email</label>
            <input
              type="email"
              name="recruitmentEmail"
              value={formData.recruitmentEmail}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recruitment email"
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

export default AddRecruitmentCo;