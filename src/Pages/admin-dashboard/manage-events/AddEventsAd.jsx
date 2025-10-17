import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaSave } from "react-icons/fa";
import {
  createEventProgram,
  updateEventProgramById,
  getEventProgramById
} from "../../../api/pages-api/admin-dashboard-api/event-program-api/EventProgramApi";
import { toast } from "react-toastify";

function AddEventsAd() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    eventTime: "",
    eventDate: "",
    description: "",
    industry: "",
    priority: "",
    eventPost: "",
    Domain: "",
  });

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

  useEffect(() => {
    if (id) {
      const fetchEventData = async () => {
        try {
          setLoading(true);
          const response = await getEventProgramById(id);
          if (response.success) {
            setFormData(response.eventPrograms);
          } else {
            toast.error(response.message || "Failed to fetch event data");
          }
        } catch (error) {
          toast.error(error.message || "Error fetching event data");
        } finally {
          setLoading(false);
        }
      };
      fetchEventData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (id) {
        await updateEventProgramById(id, formData);
        toast.success("Event updated successfully");
      } else {
        await createEventProgram(formData);
        toast.success("Event created successfully");
      }
      navigate("/admin/events");
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error(error.message || "Failed to save event");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-blue-50">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center mb-6"
      >
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-blue-100 transition-colors"
        >
          <FaArrowLeft className="text-blue-600" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
            {id ? "Edit Event" : "Create New Event"}
          </h1>
          <p className="text-blue-600 mt-1">
            {id ? "Update event details" : "Fill in the details to create a new event"}
          </p>
        </div>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm p-6 border border-blue-100"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-700">Event Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                placeholder="Enter event name"
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-700">Location*</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                placeholder="Enter event location"
                required
              />
            </div>

            {/* Date and Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-700">Date*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                  <FaCalendarAlt />
                </div>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate ? new Date(formData.eventDate).toISOString().split("T")[0] : ""}
                  onChange={handleInputChange}
                  className="w-full pl-10 px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-700">Time*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                  <FaClock />
                </div>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleInputChange}
                  className="w-full pl-10 px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Industry and Priority */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-700">Industry*</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-700">Priority*</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
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

            {/* Domain */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-700">Domain*</label>
              <select
                name="Domain"
                value={formData.Domain}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                required
              >
                <option value="">Select Domain</option>
                {domains.map((domain) => (
                  <option key={domain.key} value={domain.key}>
                    {domain.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-blue-700">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                placeholder="Enter event description"
                rows="4"
                required
              />
            </div>

            {/* Event Post */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-blue-700">Event Post*</label>
              <textarea
                name="eventPost"
                value={formData.eventPost}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                placeholder="Enter event post content"
                rows="4"
                required
              />
            </div>
          </div>

          {/* Form Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-end mt-8"
          >
            <motion.button
              type="submit"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {id ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  {id ? 'Update Event' : 'Create Event'}
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

export default AddEventsAd;