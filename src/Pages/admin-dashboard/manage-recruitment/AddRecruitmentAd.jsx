import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaBriefcase, FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaMoneyBillWave, FaArrowLeft, FaSave } from 'react-icons/fa';
import { addRecruitmentPost, getRecruitmentPostById, updateRecruitmentPostById } from '../../../api/pages-api/admin-dashboard-api/manage-recruitment-api/RecruitmentApi';
import { toast } from 'react-toastify';

function AddRecruitmentAd() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    recruitmentStatus: 'Interview Scheduled',
    industry: 'High Level Industry',
    priority: 'Medium',
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
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await getRecruitmentPostById(id);
          const data = response.recruitmentPost;
          // Format dates for input fields
          const formattedData = {
            ...data,
            recruitmentStartDate: data.recruitmentStartDate ? data.recruitmentStartDate.split('T')[0] : '',
            recruitmentEndDate: data.recruitmentEndDate ? data.recruitmentEndDate.split('T')[0] : ''
          };
          setFormData(formattedData);
        } catch (error) {
          console.error("Error fetching recruitment post:", error);
          toast.error("Failed to load recruitment data");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
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
      let response;
      if (id) {
        response = await updateRecruitmentPostById(id, formData);
      } else {
        response = await addRecruitmentPost(formData);
      }
      
      if (response?.success) {
        toast.success(response.message || (id ? "Recruitment updated successfully" : "Recruitment created successfully"));
        navigate('/admin/recruitment');
      } else {
        toast.error(response?.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving recruitment:", error);
      toast.error(error.message || "Failed to save recruitment");
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
            {id ? 'Edit Recruitment' : 'Add New Recruitment'}
          </h1>
          <p className="text-blue-600 mt-1">
            {id ? 'Update recruitment details' : 'Fill in the details to add a new recruitment'}
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
            {/* Candidate Information */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">Candidate Information</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700">Candidate Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  placeholder="Enter candidate name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700">Industry*</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  required
                >
                  <option value="High Level Industry">High Level Industry</option>
                  <option value="Medium Level Industry">Medium Level Industry</option>
                  <option value="Low Level Industry">Low Level Industry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700">Status*</label>
                <select
                  name="recruitmentStatus"
                  value={formData.recruitmentStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  required
                >
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Offer Sent">Offer Sent</option>
                  <option value="Rejected">Rejected</option>
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
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {/* Position Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">Position Details</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700">Position Title*</label>
                <input
                  type="text"
                  name="recruitmentPosition"
                  value={formData.recruitmentPosition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  placeholder="Enter position title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700">Location*</label>
                <input
                  type="text"
                  name="recruitmentLocation"
                  value={formData.recruitmentLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  placeholder="Enter location"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700">Salary*</label>
                <input
                  type="text"
                  name="recruitmentSalary"
                  value={formData.recruitmentSalary}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  placeholder="Enter salary"
                  required
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">Timeline</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700">Start Date*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                    <FaCalendarAlt className="text-sm" />
                  </div>
                  <input
                    type="date"
                    name="recruitmentStartDate"
                    value={formData.recruitmentStartDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700">End Date*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                    <FaCalendarAlt className="text-sm" />
                  </div>
                  <input
                    type="date"
                    name="recruitmentEndDate"
                    value={formData.recruitmentEndDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">Contact Information</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700">Contact Person*</label>
                <input
                  type="text"
                  name="recruitmentContactPerson"
                  value={formData.recruitmentContactPerson}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  placeholder="Enter contact person"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700">Contact Number*</label>
                <input
                  type="text"
                  name="recruitmentContactNumber"
                  value={formData.recruitmentContactNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  placeholder="Enter contact number"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700">Email*</label>
                <input
                  type="email"
                  name="recruitmentEmail"
                  value={formData.recruitmentEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            {/* Recruitment Post */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-blue-700">Recruitment Post*</label>
              <textarea
                name="recruitmentPost"
                value={formData.recruitmentPost}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                placeholder="Enter recruitment post details"
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
                  {id ? 'Update Recruitment' : 'Create Recruitment'}
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

export default AddRecruitmentAd;