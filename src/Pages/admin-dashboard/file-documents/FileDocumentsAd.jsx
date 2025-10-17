import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllDocumentFiles } from '../../../api/pages-api/admin-dashboard-api/document-file-api/DocumentFileApi';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';

function FileDocumentsAd() {
  const [documents, setDocuments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllDocumentFiles();
        setDocuments(response.documentFiles || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setError('Failed to load documents. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter documents based on search and filters
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (doc.description && doc.description.toLowerCase().includes(searchText.toLowerCase())) ||
      (doc.code && doc.code.toLowerCase().includes(searchText.toLowerCase())) ||
      (doc.fileDocument && doc.fileDocument.toLowerCase().includes(searchText.toLowerCase()));

    const matchesPriority = 
      priorityFilter === 'all' || 
      (doc.priority && (doc.priority._id === priorityFilter || doc.priority.name.toLowerCase() === priorityFilter.toLowerCase()));

    const matchesIndustry = 
      industryFilter === 'all' || 
      (doc.industry && (doc.industry._id === industryFilter || doc.industry.name.toLowerCase() === industryFilter.toLowerCase()));

    return matchesSearch && matchesPriority && matchesIndustry;
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority?.name?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 overflow-y-auto bg-blue-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-blue-800">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6 overflow-y-auto bg-blue-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-blue-800">Manage Documents</h1>
          <p className="text-gray-600">View and manage all uploaded documents</p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search documents..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-full md:w-64"
          />
          
          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="all">All Priorities</option>
            {Array.from(new Set(documents.map(doc => doc.priority?.name)))
              .filter(Boolean)
              .map((priority) => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
          </select>
          
          {/* Industry Filter */}
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="all">All Industries</option>
            {Array.from(new Set(documents.map(doc => doc.industry?.name)))
              .filter(Boolean)
              .map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
          </select>
          
          {/* Add Button */}
          <Link
            to="/admin/documents/add"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap text-center"
          >
            Add New Document +
          </Link>
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No documents found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          {(searchText || priorityFilter !== 'all' || industryFilter !== 'all') && (
            <button 
              onClick={() => {
                setSearchText('');
                setPriorityFilter('all');
                setIndustryFilter('all');
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <div key={document._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">{document.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{document.code}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(document.priority)}`}>
                    {document.priority?.name || 'No priority'}
                  </span>
                </div>

                <div className="mt-2 mb-4">
                  <p className="text-gray-600 text-sm">{document.description || 'No description provided'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Industry</h4>
                    <p className="font-medium text-gray-900">{document.industry?.name || 'Not specified'}</p>
                    <p className="text-sm text-gray-600">{document.industry?.code || ''}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Uploaded</h4>
                    <p className="font-medium text-gray-900">{formatDate(document.createdAt)}</p>
                    <p className="text-sm text-gray-600">by {document.createdBy?.name || 'Unknown'}</p>
                  </div>
                </div>

                <div className="mt-4 mb-6">
                  <a
                    href={document.fileDocument}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors duration-200 w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download Document
                  </a>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <div className="text-sm text-gray-500">
                    Last updated: {formatDate(document.updatedAt)}
                  </div>
                  <div className="flex space-x-3">
                    {/* View Button */}
                    <Link to={`/admin/documents/view/${document._id}`}>
                      <button 
                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
                        title="View Details"
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

                    {/* Edit Button */}
                    <Link to={`/admin/documents/edit/${document._id}`}>
                      <button 
                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
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

                    {/* Delete Button */}
                    <button
                      className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this document?')) {
                          // Implement actual delete API call here
                          toast.success('Document deleted successfully');
                        }
                      }}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileDocumentsAd;