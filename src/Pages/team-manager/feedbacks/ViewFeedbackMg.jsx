import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaStar, FaUser, FaProjectDiagram, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { getClientFeedbackById } from '../../../api/pages-api/team-manager-api/client-feedback-api/TMClientFeedbackApi';
import { BeatLoader } from 'react-spinners';

function ViewFeedbackMg() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Color palette
  const colors = {
    background: 'bg-white',
    cardBackground: 'bg-white',
    primary: 'bg-blue-50',
    primaryText: 'text-blue-800',
    primaryBorder: 'border-blue-200',
    primaryHover: 'hover:bg-blue-100',
    accent: 'bg-blue-600',
    accentText: 'text-white',
    accentHover: 'hover:bg-blue-700',
    statusActive: 'bg-green-100 text-green-800',
    statusPending: 'bg-yellow-100 text-yellow-800',
    statusInactive: 'bg-red-100 text-red-800',
    ratingFilled: 'text-yellow-400',
    ratingEmpty: 'text-blue-200'
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Fetch feedback by ID
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await getClientFeedbackById(id);
        if (!response.success) throw new Error(response.message || 'Failed to fetch feedback');
        setFeedback(response.feedback);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [id]);

  // Rating stars display
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`w-5 h-5 ${star <= rating ? colors.ratingFilled : colors.ratingEmpty}`}
          />
        ))}
        <span className="ml-2 text-gray-600">({rating}/5)</span>
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

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="p-6 text-gray-500">
        No feedback found
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex-1 p-6 overflow-y-auto ${colors.background}`}
    >
      {/* Header Section */}
      <div className="flex items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/team-manager/feedbacks')}
          className={`mr-4 p-2 ${colors.primary} rounded-full ${colors.primaryHover}`}
        >
          <FaArrowLeft className={`${colors.primaryText}`} />
        </motion.button>
        <h1 className={`text-2xl font-semibold ${colors.primaryText}`}>Feedback Details</h1>
      </div>

      {/* Feedback Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`${colors.cardBackground} rounded-xl shadow-md p-6 border ${colors.primaryBorder}`}
      >
        {/* Feedback Code and Status */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-between items-center mb-6 pb-4 border-b border-blue-100"
        >
          <div>
            <span className={`text-sm ${colors.secondaryText}`}>Feedback ID:</span>
            <h2 className="text-lg font-medium text-gray-800">{feedback.code}</h2>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              feedback.feedbackStatus === 'Active'
                ? colors.statusActive
                : feedback.feedbackStatus === 'Pending'
                ? colors.statusPending
                : colors.statusInactive
            }`}
          >
            {feedback.feedbackStatus}
          </span>
        </motion.div>

        {/* Rating */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center mb-2">
            <FaStar className={`mr-2 ${colors.ratingFilled}`} />
            <span className="font-medium text-gray-700">Customer Rating</span>
          </div>
          {renderStars(feedback.rating)}
        </motion.div>

        {/* Comment */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center mb-2">
            <FaInfoCircle className={`mr-2 ${colors.primaryText}`} />
            <span className="font-medium text-gray-700">Feedback Comment</span>
          </div>
          <div className={`p-4 ${colors.primary} rounded-lg`}>
            <p className="text-gray-700">{feedback.comment}</p>
          </div>
        </motion.div>

        {/* Customer Details */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center mb-2">
            <FaUser className={`mr-2 ${colors.primaryText}`} />
            <span className="font-medium text-gray-700">Customer Details</span>
          </div>
          <div className={`p-4 ${colors.primary} rounded-lg`}>
            <p className="text-gray-700">
              <span className="font-medium">Name:</span> {feedback.customer?.name || 'N/A'}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {feedback.customer?.email || 'N/A'}
            </p>
          </div>
        </motion.div>

        {/* Project Details */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center mb-2">
            <FaProjectDiagram className={`mr-2 ${colors.primaryText}`} />
            <span className="font-medium text-gray-700">Project Details</span>
          </div>
          <div className={`p-4 ${colors.primary} rounded-lg`}>
            <p className="text-gray-700">
              <span className="font-medium">Project Code:</span> {feedback.industryProject?.code || 'N/A'}
            </p>
          </div>
        </motion.div>

        {/* Submission Details */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center mb-2">
            <FaCalendarAlt className={`mr-2 ${colors.primaryText}`} />
            <span className="font-medium text-gray-700">Submission Details</span>
          </div>
          <div className={`p-4 ${colors.primary} rounded-lg`}>
            <p className="text-gray-700">
              <span className="font-medium">Submitted At:</span> {new Date(feedback.submittedAt).toLocaleString()}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Created By:</span> {feedback.createdBy?.name || 'N/A'}
            </p>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-end mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/team-manager/feedbacks')}
            className={`px-6 py-2 ${colors.accent} ${colors.accentText} rounded-lg ${colors.accentHover} transition-colors`}
          >
            Back to Feedbacks
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ViewFeedbackMg;