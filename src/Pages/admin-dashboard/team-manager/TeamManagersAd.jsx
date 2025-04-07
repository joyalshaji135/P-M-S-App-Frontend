import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteTeamManagerById, getAllTeamManagers } from '../../../api/pages-api/admin-dashboard-api/team-manager-api/TeamManagerApi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function TeamManagersAd() {
  const [teamManagers, setTeamManagers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllTeamManagers();
        // Format status to boolean for consistent filtering
        const formattedManagers = response.teamManagers.map(manager => ({
          ...manager,
          status: manager.status === "true" || manager.status === true
        }));
        setTeamManagers(formattedManagers);
      } catch (error) {
        console.error('Error fetching team managers:', error);
        toast.error('Failed to load team managers');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter data
  const filteredData = teamManagers.filter((manager) => {
    const matchesSearch = 
      manager.name.toLowerCase().includes(searchText.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchText.toLowerCase()) ||
      (manager.description && manager.description.toLowerCase().includes(searchText.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && manager.status) || 
      (statusFilter === 'inactive' && !manager.status);
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Delete function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this team manager?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await deleteTeamManagerById(id);
      
      if (response.success) {
        const updatedManagers = teamManagers.filter((manager) => manager._id !== id);
        setTeamManagers(updatedManagers);
        toast.success('Team manager deleted successfully');
      } else {
        toast.error(response.message || 'Failed to delete team manager');
      }
    } catch (error) {
      console.error('Error deleting team manager:', error);
      toast.error('Failed to delete team manager');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
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
          <h1 className="text-2xl font-bold text-blue-800">Team Managers</h1>
          <p className="text-blue-600 mt-1">
            Showing {currentItems.length} of {filteredData.length} managers
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-blue-800"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search managers..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-blue-800 placeholder-blue-400"
            />
          </div>
          
          {/* Add Button */}
          <Link
            to="/admin/team-managers/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm whitespace-nowrap flex items-center shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Manager
          </Link>
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Cards Grid */}
      {!loading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {currentItems.map((manager, index) => (
            <motion.div
              key={manager._id}
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-xl shadow-sm border border-blue-100 hover:border-blue-300 transition-all duration-300"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-blue-900">{manager.name}</h3>
                    <p className="text-sm text-blue-600">{manager.email}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      manager.status ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {manager.status ? "Active" : "Inactive"}
                  </span>
                </div>
                
                {/* Company Info */}
                <div className="mb-3">
                  <p className="text-sm font-medium text-blue-800">Company:</p>
                  <p className="text-sm text-blue-600">{manager.company?.name || 'Not specified'}</p>
                </div>
                
                {/* Skills */}
                {manager.skills?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-blue-800">Skills:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {manager.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {skill.skillName}
                        </span>
                      ))}
                      {manager.skills.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                          +{manager.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Contact */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-blue-800">Contact:</p>
                  <p className="text-sm text-blue-600">{manager.phone || 'Not specified'}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 border-t border-blue-100 pt-3">
                  <Link to={`/admin/team-managers/view/${manager._id}`}>
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                      title="View"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </Link>

                  <Link to={`/admin/team-managers/edit/${manager._id}`}>
                    <button 
                      className="p-2 text-blue-400 hover:bg-blue-50 rounded-full transition-colors duration-200"
                      title="Edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(manager._id)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors duration-200"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && currentItems.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-blue-100">
          <p className="text-blue-600">No team managers found matching your criteria</p>
        </div>
      )}

      {/* Pagination */}
      {filteredData.length > itemsPerPage && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-l-md border border-blue-200 text-sm font-medium ${
                currentPage === 1 
                  ? 'bg-blue-100 text-blue-400 cursor-not-allowed' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border-t border-b border-blue-200 text-sm font-medium ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-r-md border border-blue-200 text-sm font-medium ${
                currentPage === totalPages 
                  ? 'bg-blue-100 text-blue-400 cursor-not-allowed' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default TeamManagersAd;