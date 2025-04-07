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
  FaArrowLeft
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
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!recruitment) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-600">
        Recruitment post not found
      </div>
    );
  }

  // Format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-blue-50">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center mb-6"
      >
        <Link
          to="/admin/recruitment"
          className="mr-4 p-2 rounded-full hover:bg-blue-100 transition-colors"
        >
          <FaArrowLeft className="text-blue-600" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Recruitment Details</h1>
          <p className="text-blue-600 mt-1">View complete information about this candidate</p>
        </div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm p-6 border border-blue-100"
      >
        {/* Candidate Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-4 border-b border-blue-100">
          <div>
            <h2 className="text-xl font-bold text-blue-800">{recruitment.candidateName || recruitment.name}</h2>
            <p className="text-blue-600">{recruitment.recruitmentPosition || recruitment.position}</p>
          </div>
          <span
            className={`mt-2 md:mt-0 px-3 py-1 rounded-xl text-sm font-medium ${
              recruitment.recruitmentStatus === 'Active'
                ? 'bg-green-100 text-green-800'
                : recruitment.recruitmentStatus === 'Inactive'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {recruitment.recruitmentStatus}
          </span>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">Personal Information</h3>
            
            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                <FaUser className="text-sm" />
              </div>
              <div>
                <p className="text-xs text-blue-600">Full Name</p>
                <p className="text-blue-800 font-medium">{recruitment.candidateName || recruitment.name}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                <FaBriefcase className="text-sm" />
              </div>
              <div>
                <p className="text-xs text-blue-600">Industry</p>
                <p className="text-blue-800 font-medium">{recruitment.industry}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                <FaBriefcase className="text-sm" />
              </div>
              <div>
                <p className="text-xs text-blue-600">Priority</p>
                <p className="text-blue-800 font-medium">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    recruitment.priority === 'High' ? 'bg-red-100 text-red-800' :
                    recruitment.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {recruitment.priority}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Position Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">Position Details</h3>
            
            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                <FaBriefcase className="text-sm" />
              </div>
              <div>
                <p className="text-xs text-blue-600">Position</p>
                <p className="text-blue-800 font-medium">{recruitment.recruitmentPosition || recruitment.position}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                <FaMapMarkerAlt className="text-sm" />
              </div>
              <div>
                <p className="text-xs text-blue-600">Location</p>
                <p className="text-blue-800 font-medium">{recruitment.recruitmentLocation}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                <FaMoneyBillWave className="text-sm" />
              </div>
              <div>
                <p className="text-xs text-blue-600">Salary</p>
                <p className="text-blue-800 font-medium">{recruitment.recruitmentSalary}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">Timeline</h3>
            
            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                <FaCalendarAlt className="text-sm" />
              </div>
              <div>
                <p className="text-xs text-blue-600">Start Date</p>
                <p className="text-blue-800 font-medium">{formatDate(recruitment.recruitmentStartDate)}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                <FaCalendarAlt className="text-sm" />
              </div>
              <div>
                <p className="text-xs text-blue-600">End Date</p>
                <p className="text-blue-800 font-medium">{formatDate(recruitment.recruitmentEndDate)}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">Contact Information</h3>
            
            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                <FaUser className="text-sm" />
              </div>
              <div>
                <p className="text-xs text-blue-600">Contact Person</p>
                <p className="text-blue-800 font-medium">{recruitment.recruitmentContactPerson}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                <FaPhone className="text-sm" />
              </div>
              <div>
                <p className="text-xs text-blue-600">Contact Number</p>
                <p className="text-blue-800 font-medium">{recruitment.recruitmentContactNumber}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                <FaEnvelope className="text-sm" />
              </div>
              <div>
                <p className="text-xs text-blue-600">Email</p>
                <p className="text-blue-800 font-medium">{recruitment.recruitmentEmail}</p>
              </div>
            </div>
          </div>

          {/* Recruitment Post */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">Recruitment Post</h3>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-blue-800">{recruitment.recruitmentPost}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ViewRecruitmentAd;