import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  addClientFeedback, 
  updateClientFeedback, 
  getClientFeedbackById
} from '../../../api/pages-api/team-manager-api/client-feedback-api/TMClientFeedbackApi';
import { BeatLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaStar, FaChevronDown } from 'react-icons/fa';
import { getAllIndustryProjects, getAllTeamManagers } from '../../../api/comon-dropdown-api/ComonDropDownApi';

function AddFeedbackMb() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [dropdownsLoading, setDropdownsLoading] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    customer: '',
    industryProject: '',
    rating: 3,
    comment: '',
    feedbackStatus: 'Active',
    submittedAt: new Date().toISOString().slice(0, 16)
  });

  // Check if we're editing an existing feedback
  const isEditMode = !!id;

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      setDropdownsLoading(true);
      try {
        // Fetch projects
        const projectsResponse = await getAllIndustryProjects();
        if (projectsResponse.success) {
          setProjects(projectsResponse.industryProjects || []);
        }

        // Fetch customers (team managers)
        const customersResponse = await getAllTeamManagers();
        if (customersResponse.success) {
          setCustomers(customersResponse.teamManagerList || []);
        }
      } catch (err) {
        setError('Failed to load dropdown data');
      } finally {
        setDropdownsLoading(false);
      }
    };

    fetchDropdownData();
  }, []);

  // Fetch feedback data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchFeedback = async () => {
        setLoading(true);
        try {
          const response = await getClientFeedbackById(id);
          if (!response.success) throw new Error(response.message || 'Failed to fetch feedback');
          
          const feedback = response.feedback;
          setFormData({
            customer: feedback.customer?._id || '',
            industryProject: feedback.industryProject?._id || '',
            rating: feedback.rating || 3,
            comment: feedback.comment || '',
            feedbackStatus: feedback.feedbackStatus || 'Active',
            submittedAt: new Date(feedback.submittedAt).toISOString().slice(0, 16)
          });
        } catch (err) {
          setError(err.message);
          navigate('/team-manager/feedbacks');
        } finally {
          setLoading(false);
        }
      };

      fetchFeedback();
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

  // Handle rating change
  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format the data for API
      const feedbackData = {
        customer: formData.customer,
        industryProject: formData.industryProject,
        rating: Number(formData.rating),
        comment: formData.comment,
        feedbackStatus: formData.feedbackStatus,
        submittedAt: new Date(formData.submittedAt).toISOString()
      };

      let response;
      if (isEditMode) {
        response = await updateClientFeedback(id, feedbackData);
      } else {
        response = await addClientFeedback(feedbackData);
      }

      if (!response.success) {
        throw new Error(response.message || 'Failed to save feedback');
      }

      // Redirect to the feedback list page
      navigate('/team-manager/feedbacks');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render star rating input
  const renderStarRating = () => {
    return (
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(star)}
            className="focus:outline-none"
          >
            <FaStar
              className={`w-6 h-6 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          </button>
        ))}
        <span className="ml-2 text-gray-600">({formData.rating}/5)</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="#3B82F6" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 p-6 overflow-y-auto bg-white"
    >
      {/* Header Section */}
      <div className="flex items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/team-manager/feedbacks')}
          className="mr-4 p-2 bg-blue-50 rounded-full hover:bg-blue-100"
        >
          <FaArrowLeft className="text-blue-800" />
        </motion.button>
        <h1 className="text-2xl font-semibold text-blue-800">
          {isEditMode ? 'Edit Feedback' : 'Add Feedback'}
        </h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      {/* Feedback Form */}
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md border border-blue-200"
      >
        {/* Customer Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
          <div className="relative">
            <select
              name="customer"
              value={formData.customer}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
              required
              disabled={dropdownsLoading}
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name} ({customer.email})
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FaChevronDown className="text-gray-400" />
            </div>
          </div>
          {dropdownsLoading && (
            <div className="mt-1 text-sm text-gray-500">Loading customers...</div>
          )}
        </div>

        {/* Project Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
          <div className="relative">
            <select
              name="industryProject"
              value={formData.industryProject}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
              required
              disabled={dropdownsLoading}
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.code} - {project.projectName}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FaChevronDown className="text-gray-400" />
            </div>
          </div>
          {dropdownsLoading && (
            <div className="mt-1 text-sm text-gray-500">Loading projects...</div>
          )}
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          {renderStarRating()}
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <div className="relative">
            <select
              name="feedbackStatus"
              value={formData.feedbackStatus}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
              required
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FaChevronDown className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Submission Date */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Submission Date</label>
          <input
            type="datetime-local"
            name="submittedAt"
            value={formData.submittedAt}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            disabled={loading || dropdownsLoading}
          >
            <FaSave className="mr-2" />
            {loading ? 'Saving...' : isEditMode ? 'Update Feedback' : 'Save Feedback'}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default AddFeedbackMb;