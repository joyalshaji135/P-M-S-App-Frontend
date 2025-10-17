import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaBriefcase, 
  FaPhone, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaMoneyBillWave,
  FaArrowLeft,
  FaIdBadge,
  FaUserEdit,
  FaHistory,
  FaInfoCircle
} from 'react-icons/fa';
import { getRecruitmentPostById } from '../../../api/pages-api/admin-dashboard-api/manage-recruitment-api/RecruitmentApi';
import { toast } from 'react-toastify';

function ViewRecruitmentAd() {
  const { id } = useParams();
  const [recruitment, setRecruitment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecruitment = async () => {
      try {
        setLoading(true);
        const response = await getRecruitmentPostById(id);
        setRecruitment(response.recruitmentPost);
      } catch (error) {
        console.error('Error fetching recruitment:', error);
        toast.error('Failed to load recruitment details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!recruitment) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600">
        Recruitment post not found
      </div>
    );
  }

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format datetime
  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center mb-8"
      >
        <Link
          to="/admin/recruitment"
          className="mr-4 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <FaArrowLeft className="text-blue-600" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Recruitment Details</h1>
          <p className="text-blue-600 mt-1">Complete information about this recruitment post</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Candidate Profile */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FaUser className="text-4xl text-blue-500" />
              </div>
              <h2 className="text-xl font-bold text-blue-800 text-center">
                {recruitment.name || 'Not specified'}
              </h2>
              <p className="text-blue-600 text-center">
                {recruitment.recruitmentPosition || 'Position not specified'}
              </p>
              <div className="mt-3 px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                {recruitment.code || 'No code'}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 mr-4">
                  <FaBriefcase className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-blue-500">Industry</p>
                  <p className="text-blue-800 font-medium">
                    {recruitment.industry?.name || 'Not specified'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 mr-4">
                  <FaInfoCircle className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-blue-500">Priority</p>
                  <p className="text-blue-800 font-medium">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      recruitment.priority?.name === 'High' ? 'bg-red-100 text-red-800' :
                      recruitment.priority?.name === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {recruitment.priority?.name || 'Not specified'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 mr-4">
                  <FaMoneyBillWave className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-blue-500">Salary</p>
                  <p className="text-blue-800 font-medium">
                    {recruitment.recruitmentSalary ? `$${recruitment.recruitmentSalary}` : 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 mt-6"
          >
            <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
              <FaHistory className="mr-2 text-blue-500" />
              Meta Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
                  <FaUserEdit className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-blue-500">Created By</p>
                  <p className="text-blue-800 font-medium">
                    {recruitment.createdBy?.name || 'Unknown'} ({recruitment.createdBy?.email || 'No email'})
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
                  <FaCalendarAlt className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-blue-500">Created At</p>
                  <p className="text-blue-800 font-medium">
                    {formatDateTime(recruitment.createdAt)}
                  </p>
                </div>
              </div>

              {recruitment.userUpdatedBy && (
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
                    <FaUserEdit className="text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-500">Last Updated By</p>
                    <p className="text-blue-800 font-medium">
                      {recruitment.userUpdatedBy?.name || 'Unknown'} ({recruitment.userUpdatedBy?.email || 'No email'})
                    </p>
                  </div>
                </div>
              )}

              {recruitment.updatedAt && (
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
                    <FaCalendarAlt className="text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-500">Last Updated</p>
                    <p className="text-blue-800 font-medium">
                      {formatDateTime(recruitment.updatedAt)}
                    </p>
                </div>
              </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2">
          {/* Position Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 mb-6"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
              <FaBriefcase className="mr-2 text-blue-500" />
              Position Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 mr-4">
                  <FaIdBadge className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-blue-500">Position Title</p>
                  <p className="text-blue-800 font-medium">
                    {recruitment.recruitmentPosition || 'Not specified'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 mr-4">
                  <FaMapMarkerAlt className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-blue-500">Location</p>
                  <p className="text-blue-800 font-medium">
                    {recruitment.recruitmentLocation || 'Not specified'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 mr-4">
                  <FaCalendarAlt className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-blue-500">Start Date</p>
                  <p className="text-blue-800 font-medium">
                    {formatDate(recruitment.recruitmentStartDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 mr-4">
                  <FaCalendarAlt className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-blue-500">End Date</p>
                  <p className="text-blue-800 font-medium">
                    {formatDate(recruitment.recruitmentEndDate)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 mb-6"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
              <FaUser className="mr-2 text-blue-500" />
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 mr-4">
                  <FaUser className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-blue-500">Contact Person</p>
                  <p className="text-blue-800 font-medium">
                    {recruitment.recruitmentContactPerson || 'Not specified'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 mr-4">
                  <FaPhone className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-blue-500">Contact Number</p>
                  <p className="text-blue-800 font-medium">
                    {recruitment.recruitmentContactNumber || 'Not specified'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 mr-4">
                  <FaEnvelope className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-blue-500">Email</p>
                  <p className="text-blue-800 font-medium">
                    {recruitment.recruitmentEmail || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recruitment Post Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
              <FaInfoCircle className="mr-2 text-blue-500" />
              Recruitment Post Details
            </h3>

            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
              <p className="text-blue-800 whitespace-pre-line">
                {recruitment.recruitmentPost || 'No details provided'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ViewRecruitmentAd;