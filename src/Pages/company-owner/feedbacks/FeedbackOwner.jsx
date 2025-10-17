import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllClientFeedbacks } from '../../../api/pages-api/team-manager-api/client-feedback-api/TMClientFeedbackApi';
import { FaSearch, FaEdit, FaTrash, FaEye, FaFilter, FaStar, FaPlus, FaTimes } from 'react-icons/fa';

function FeedbackOwner() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Color palette
  const colors = {
    background: 'bg-white',
    cardBackground: 'bg-white',
    primary: 'bg-blue-50',
    primaryLight: 'bg-blue-100',
    primaryText: 'text-blue-800',
    primaryBorder: 'border-blue-200',
    primaryHover: 'hover:bg-blue-100',
    secondary: 'bg-blue-100',
    secondaryText: 'text-blue-900',
    accent: 'bg-blue-600',
    accentText: 'text-white',
    accentHover: 'hover:bg-blue-700',
    statusActive: 'bg-green-100 text-green-800',
    statusPending: 'bg-yellow-100 text-yellow-800',
    statusInactive: 'bg-red-100 text-red-800',
    ratingFilled: 'text-yellow-400',
    ratingEmpty: 'text-blue-200',
    divider: 'border-blue-100'
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
    }
  };

  const filterVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Fetch feedbacks from API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await getAllClientFeedbacks();
        if (!response.success) throw new Error(response.message || 'Failed to fetch feedbacks');
        setFeedbacks(response.feedbacks);
        setFilteredFeedbacks(response.feedbacks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  // Apply filters
  useEffect(() => {
    const filtered = feedbacks.filter((feedback) => {
      const searchValue = searchText.toLowerCase();
      const commentMatch = feedback.comment?.toLowerCase().includes(searchValue);
      const statusMatch = feedback.feedbackStatus?.toLowerCase().includes(searchValue);
      const customerMatch = feedback.customer?.name.toLowerCase().includes(searchValue);
      const projectMatch = feedback.industryProject?.code.toLowerCase().includes(searchValue);
      const ratingMatch = feedback.rating?.toString().includes(searchValue);
      const searchMatch = commentMatch || statusMatch || customerMatch || projectMatch || ratingMatch;

      const statusFilterMatch = statusFilter === 'All' || feedback.feedbackStatus === statusFilter;

      let ratingFilterMatch = true;
      if (ratingFilter !== 'All') {
        const ratingNum = parseInt(ratingFilter);
        ratingFilterMatch = Math.floor(feedback.rating) === ratingNum;
      }

      return searchMatch && statusFilterMatch && ratingFilterMatch;
    });

    setFilteredFeedbacks(filtered);
  }, [feedbacks, searchText, statusFilter, ratingFilter]);

  // Rating stars display
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.div 
            key={star}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaStar
              className={`w-4 h-4 ${star <= rating ? colors.ratingFilled : colors.ratingEmpty}`}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`flex justify-center items-center h-screen ${colors.background}`}
      >
        <BeatLoader color="#3B82F6" />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`p-6 ${colors.background} text-red-500`}
      >
        Error: {error}
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex-1 p-6 overflow-y-auto ${colors.background}`}
    >
      {/* Header Section */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-6 p-4 ${colors.primary} rounded-xl border ${colors.primaryBorder} shadow-sm`}
      >
        <h1 className={`text-2xl font-bold ${colors.primaryText} mb-4 md:mb-0`}>Client Feedbacks</h1>
        <div className="flex flex-col md:flex-row w-full md:w-auto space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-blue-400" />
            </div>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Search feedbacks..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full border ${colors.primaryBorder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${colors.primaryHover} transition-all`}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center px-4 py-2 ${showFilters ? colors.accent : colors.secondary} ${showFilters ? colors.accentText : colors.secondaryText} rounded-lg ${colors.primaryHover} transition-all border ${colors.primaryBorder} shadow-sm`}
          >
            {showFilters ? <FaTimes className="mr-2" /> : <FaFilter className="mr-2" />}
            {showFilters ? 'Hide Filters' : 'Filters'}
          </motion.button>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/owner/feedbacks/add"
              className={`flex items-center justify-center px-6 py-2 ${colors.accent} ${colors.accentText} rounded-lg ${colors.accentHover} transition-all shadow-sm`}
            >
              <FaPlus className="mr-2" />
              Add Feedback
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`mb-6 p-4 ${colors.cardBackground} rounded-xl shadow-sm border ${colors.primaryBorder} overflow-hidden`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium ${colors.primaryText} mb-1`}>Status</label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`w-full p-2 border ${colors.primaryBorder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${colors.primaryHover} transition-all`}
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </motion.select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${colors.primaryText} mb-1`}>Rating</label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className={`w-full p-2 border ${colors.primaryBorder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${colors.primaryHover} transition-all`}
                >
                  <option value="All">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </motion.select>
              </div>
              <div className="flex items-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setStatusFilter('All');
                    setRatingFilter('All');
                    setSearchText('');
                  }}
                  className={`px-4 py-2 ${colors.secondary} ${colors.secondaryText} rounded-lg ${colors.primaryHover} transition-all border ${colors.primaryBorder} shadow-sm w-full`}
                >
                  Clear Filters
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Cards */}
      {filteredFeedbacks.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredFeedbacks.map((feedback) => (
            <motion.div
              key={feedback._id}
              variants={cardVariants}
              whileHover="hover"
              className={`${colors.cardBackground} rounded-xl shadow-md p-6 transition-all duration-300 border ${colors.primaryBorder}`}
            >
              <div className="flex justify-between items-start mb-4 pb-3 border-b ${colors.divider}">
                <div>
                  <h3 className={`text-lg font-semibold ${colors.primaryText}`}>
                    {feedback.customer?.name || 'Anonymous Customer'}
                  </h3>
                  <p className={`text-sm ${colors.secondaryText}`}>
                    Project: {feedback.industryProject?.code || 'N/A'}
                  </p>
                  <p className={`text-sm ${colors.secondaryText}`}>
                    Project: {feedback.industryProject?.projectName || 'N/A'}
                  </p>
                </div>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    feedback.feedbackStatus === 'Active'
                      ? colors.statusActive
                      : feedback.feedbackStatus === 'Pending'
                      ? colors.statusPending
                      : colors.statusInactive
                  }`}
                >
                  {feedback.feedbackStatus}
                </motion.span>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-3">
                  {renderStars(feedback.rating)}
                  <span className={`ml-2 ${colors.secondaryText}`}>({feedback.rating}/5)</span>
                </div>
                <p className={`text-gray-700 line-clamp-3 mb-4`}>{feedback.comment}</p>
              </div>

              <div className="flex justify-between items-center text-sm pt-3 border-t ${colors.divider}">
                <span className={`${colors.secondaryText}`}>
                  {new Date(feedback.submittedAt).toLocaleDateString()}
                </span>
                <div className="flex space-x-3">
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      to={`/owner/feedbacks/view/${feedback._id}`}
                      className={`text-blue-600 hover:text-blue-800 transition-colors flex items-center`}
                      title="View"
                    >
                      <FaEye />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      to={`/owner/feedbacks/edit/${feedback._id}`}
                      className={`text-blue-600 hover:text-blue-800 transition-colors flex items-center`}
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <button
                      onClick={() => handleDeleteFeedback(feedback._id)}
                      className={`text-red-600 hover:text-red-800 transition-colors flex items-center`}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center py-12 ${colors.secondaryText} rounded-xl ${colors.primaryLight} border ${colors.primaryBorder}`}
        >
          No feedbacks found matching your search criteria
        </motion.div>
      )}
    </motion.div>
  );
}

export default FeedbackOwner;