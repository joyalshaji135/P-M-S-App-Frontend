import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCompanyOwners, deleteCompanyOwnerById } from '../../../api/pages-api/admin-dashboard-api/company-owner-api/CompanyOwnerApi';
import { motion } from 'framer-motion';

function CompanyOwners() {
  const [companyOwners, setCompanyOwners] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchData = async () => {
    try {
      const response = await getAllCompanyOwners();
      // Map the API response to match your component's expected structure
      const formattedOwners = response.companyOwners.map(owner => ({
        ...owner,
        status: owner.status === "true" || owner.status === true // Handle both string and boolean status
      }));
      setCompanyOwners(formattedOwners);
    } catch (error) {
      console.error('Error fetching company owners:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter data based on search input and status filter
  const filteredData = companyOwners.filter((owner) => {
    const matchesSearch = 
      owner.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (owner.company?.name?.toLowerCase().includes(searchText.toLowerCase()) ?? false);
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && owner.status) || 
      (statusFilter === 'inactive' && !owner.status);
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company owner?");
    if (!confirmDelete) return;

    try {
      const response = await deleteCompanyOwnerById(id);
      if (response.success) {
        const updatedOwners = companyOwners.filter((owner) => owner._id !== id);
        setCompanyOwners(updatedOwners);
      }
    } catch (error) {
      console.error('Error deleting company owner:', error);
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto" style={{ zIndex: 1, backgroundColor: '#f0f8ff' }}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Company Owners</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name or company..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full md:w-64"
          />
          
          {/* Add Button */}
          <Link
            to="/admin/company-owner/add"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm whitespace-nowrap"
          >
            Add Owner +
          </Link>
        </div>
      </div>

      {/* Cards Grid */}
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentItems.map((owner, index) => (
            <motion.div
              key={owner._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{owner.name}</h3>
                    <p className="text-sm text-gray-600">{owner.company?.name || 'No company'}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      owner.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {owner.status ? "Active" : "Inactive"}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Contact:</span> {owner.phone || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Email:</span> {owner.email || 'N/A'}
                  </p>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Link to={`/admin/company-owner/view/${owner._id}`}>
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

                  <Link to={`/admin/company-owner/edit/${owner._id}`}>
                    <button 
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors duration-200"
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
                    onClick={() => handleDelete(owner._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
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
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm">
          <p className="text-gray-500">No company owners found matching your criteria</p>
        </div>
      )}

      {/* Pagination */}
      {filteredData.length > itemsPerPage && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border-t border-b border-gray-300 text-sm font-medium ${
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
              className={`px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
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

export default CompanyOwners;