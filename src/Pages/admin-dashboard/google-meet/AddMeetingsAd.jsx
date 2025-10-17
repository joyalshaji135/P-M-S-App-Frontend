import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addGoogleMeetSession, getGoogleMeetSessionById, updateGoogleMeetSessionById } from '../../../api/pages-api/admin-dashboard-api/google-meet-api/GoogleMeetingApi';
import { toast } from 'react-toastify';
import { getLoggedUser } from '../../../helper/auth';
import { getAllIndustryProjects } from '../../../api/comon-dropdown-api/ComonDropDownApi';

function AddMeetingsAd() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = getLoggedUser();

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    customer: userId._id,
    meetingTime: '',
    meetingLink: '',
    industryProject: '',
    meetingDate: '',
    meetingStatus: 'Scheduled'
  });

  // State for dropdown options
  const [industryProjects, setIndustryProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch industry projects and meeting data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch industry projects
        const projectsResponse = await getAllIndustryProjects();
        setIndustryProjects(projectsResponse.industryProjects || []);

        // If editing, fetch meeting data
        if (id) {
          const meetingResponse = await getGoogleMeetSessionById(id);
          const meetingData = meetingResponse.googleMeet;
          
          // Format date for input field
          const formattedDate = meetingData.meetingDate 
            ? meetingData.meetingDate.split('T')[0] 
            : '';
            
          setFormData({
            ...meetingData,
            meetingDate: formattedDate
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load required data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    setIsSubmitting(true);
    
    try {
      let response;
      
      // Prepare the data to send
      const payload = {
        ...formData,
        // Ensure customer ID is included
        customer: userId._id
      };

      if (id) {
        response = await updateGoogleMeetSessionById(id, payload);
      } else {
        response = await addGoogleMeetSession(payload);
      }

      if (response.success) {
        toast.success(response.message || "Meeting saved successfully");
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to save meeting");
      }
    } catch (error) {
      console.error("Error saving meeting:", error);
      toast.error(error.message || "Failed to save meeting");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {id ? 'Edit Meeting' : 'Schedule New Meeting'}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-100 transition-colors"
          >
            ← Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
          {/* Grid Layout for Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Team sync, Client review, etc."
                required
              />
            </div>

            {/* Industry Project */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry Project <span className="text-red-500">*</span>
              </label>
              <select
                name="industryProject"
                value={formData.industryProject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjR2NnY4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[right:0.5rem_center] bg-[length:1.5em]"
                required
              >
                <option value="">Select a project...</option>
                {industryProjects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.projectName}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Agenda, discussion points, objectives..."
                required
              ></textarea>
            </div>

            {/* Meeting Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="meetingDate"
                value={formData.meetingDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            {/* Meeting Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="meetingTime"
                value={formData.meetingTime}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            {/* Meeting Link */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Link (Google Meet) <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="https://meet.google.com/abc-defg-hij"
                pattern="https://.*"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Please enter a valid Google Meet URL starting with https://
              </p>
            </div>

            {/* Meeting Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Status <span className="text-red-500">*</span>
              </label>
              <select
                name="meetingStatus"
                value={formData.meetingStatus}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjR2NnY4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[right:0.5rem_center] bg-[length:1.5em]"
                required
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isSubmitting 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {id ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                <>{id ? 'Update Meeting' : 'Schedule Meeting'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMeetingsAd;