import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteTeamMemberById, getAllTeamMembers } from '../../../api/pages-api/admin-dashboard-api/team-member-api/TeamMemberApi';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function TeamMembers() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8; // Reduced for better card display

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllTeamMembers();
        setTeamMembers(data.teamMembers);
      } catch (error) {
        console.error('Error fetching team members:', error);
        toast.error('Failed to load team members');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = teamMembers.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchText.toLowerCase()) ||
      member.email.toLowerCase().includes(searchText.toLowerCase()) ||
      (member.description && member.description.toLowerCase().includes(searchText.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && member.status) || 
      (statusFilter === 'inactive' && !member.status);
    
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this team member?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await deleteTeamMemberById(id);
      
      if (response.success) {
        const updatedMembers = teamMembers.filter((member) => member._id !== id);
        setTeamMembers(updatedMembers);
        toast.success('Team member deleted successfully');
      } else {
        toast.error(response.message || 'Failed to delete team member');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast.error('Failed to delete team member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50">
      {/* Header Section */}
      <motion.div 
        className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-800">Team Members</h1>
            <p className="text-blue-600 mt-1">
              {teamMembers.length} {teamMembers.length === 1 ? 'member' : 'members'} found
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search members..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            
            <Link
              to="/admin/team-members/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm whitespace-nowrap flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Member
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Cards Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : currentItems.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8 text-center text-blue-500">
          No team members found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentItems.map((member) => (
            <motion.div
              key={member._id}
              className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-lg font-medium">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{member.email}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">
                    {member.role || 'Not specified'}
                  </span>
                  <motion.span
                    className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                      member.status 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {member.status ? "Active" : "Inactive"}
                  </motion.span>
                </div>

                {member.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {member.description}
                  </p>
                )}

                <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                  <Link to={`/admin/team-members/view/${member._id}`}>
                    <motion.button 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
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
                    </motion.button>
                  </Link>

                  <Link to={`/admin/team-members/edit/${member._id}`}>
                    <motion.button 
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
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
                    </motion.button>
                  </Link>

                  <motion.button
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    onClick={() => handleDelete(member._id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
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
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredData.length > itemsPerPage && (
        <motion.div 
          className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4 mt-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
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
    </div>
  );
}

export default TeamMembers;