import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash, FaUserTie, FaBriefcase, FaCalendarAlt, FaPhone, FaEnvelope, FaIndustry, FaExclamation } from 'react-icons/fa';
import { deleteRecruitmentPostById, getAllRecruitmentPosts } from '../../../api/pages-api/company-owner-api/manage-recruitment-api/CORecruitmentApi';
import { toast } from 'react-toastify';

function ManageRecruitmentAd() {
  const [recruitmentData, setRecruitmentData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllRecruitmentPosts();
        setRecruitmentData(data.recruitmentPosts);
        setFilteredData(data.recruitmentPosts);
      } catch (error) {
        console.error('Error fetching recruitment data:', error);
        toast.error('Failed to load recruitment data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchText) {
      const filtered = recruitmentData.filter(
        (recruitment) =>
          recruitment.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          recruitment.recruitmentPosition?.toLowerCase().includes(searchText.toLowerCase()) ||
          recruitment.priority?.name?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(recruitmentData);
    }
    setCurrentPage(1);
  }, [searchText, recruitmentData]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle delete functionality
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recruitment post?')) return;
    
    try {
      const response = await deleteRecruitmentPostById(id);
      if (response.success) {
        const updatedRecruitment = recruitmentData.filter((recruitment) => recruitment._id !== id);
        setRecruitmentData(updatedRecruitment);
        setFilteredData(updatedRecruitment);
        toast.success(response.message || 'Recruitment post deleted successfully');
      } else {
        toast.error(response.message || 'Failed to delete recruitment post');
      }
    } catch (error) {
      console.error('Error deleting recruitment:', error);
      toast.error(error.message || 'Failed to delete recruitment post');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50">
      {/* Header Section */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-blue-800">Manage Recruitment</h1>
          <p className="text-blue-600 mt-1">
            {filteredData.length} {filteredData.length === 1 ? 'post' : 'posts'} found
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
              <FaSearch className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
            />
          </div>
          
          {/* Add Button */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/owner/recruitments/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors text-sm whitespace-nowrap flex items-center"
            >
              <FaPlus className="w-4 h-4 mr-2" />
              Add Post
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Recruitment Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-blue-500 border border-blue-100">
          No recruitment posts found matching your criteria
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((recruitment, index) => (
              <motion.div
                key={recruitment._id}
                className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-medium text-blue-600">#{recruitment.code || indexOfFirstItem + index + 1}</span>
                      <h3 className="text-lg font-bold text-blue-800 mt-1">
                        {recruitment.name || 'N/A'}
                      </h3>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-medium ${
                        recruitment.priority?.name === 'High'
                          ? 'bg-red-100 text-red-800'
                          : recruitment.priority?.name === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {recruitment.priority?.name || 'N/A'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                        <FaBriefcase className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600">Position</p>
                        <p className="text-blue-800 font-medium">{recruitment.recruitmentPosition || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                        <FaIndustry className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600">Industry</p>
                        <p className="text-blue-800 font-medium">{recruitment.industry?.name || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                        <FaCalendarAlt className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600">Date Range</p>
                        <p className="text-blue-800 font-medium">
                          {formatDate(recruitment.recruitmentStartDate)} - {formatDate(recruitment.recruitmentEndDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                        <FaPhone className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600">Contact</p>
                        <p className="text-blue-800 font-medium">{recruitment.recruitmentContactPerson} ({recruitment.recruitmentContactNumber})</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                        <FaEnvelope className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600">Email</p>
                        <p className="text-blue-800 font-medium">{recruitment.recruitmentEmail || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
                        <FaExclamation className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600">Salary</p>
                        <p className="text-blue-800 font-medium">{recruitment.recruitmentSalary || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-blue-100">
                    <Link to={`/owner/recruitments/view/${recruitment._id}`}>
                      <motion.button 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="View"
                      >
                        <FaEye className="h-4 w-4" />
                      </motion.button>
                    </Link>

                    <Link to={`/owner/recruitments/edit/${recruitment._id}`}>
                      <motion.button 
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-xl transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="Edit"
                      >
                        <FaEdit className="h-4 w-4" />
                      </motion.button>
                    </Link>

                    <motion.button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      onClick={() => handleDelete(recruitment._id)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title="Delete"
                    >
                      <FaTrash className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-blue-200 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-xl ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'border border-blue-200 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-blue-200 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

export default ManageRecruitmentAd;