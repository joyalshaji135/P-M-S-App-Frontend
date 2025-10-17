import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiDownload, FiFile, FiX, FiArrowRight } from 'react-icons/fi';
import { getAllDocumentFileApi } from '../../api/pages-api/team-member-api/document-file-api/MTDocumentFileApi';

function DocumentsMb() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  // Priority options
  const priorities = ['High', 'Medium', 'Low'];

  // Fetch documents from API
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getAllDocumentFileApi();
        if (response && response.success) {
          setDocuments(response.fileDocuments);
          setFilteredDocuments(response.fileDocuments);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDocuments();
  }, []);

  // Filter and search logic
  useEffect(() => {
    const filtered = documents.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesFilter = filter === 'all' || doc.priority === filter;
      
      return matchesSearch && matchesFilter;
    });
    setFilteredDocuments(filtered);
    setCurrentPage(1);
  }, [searchText, filter, documents]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDocuments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: { y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 500
      }
    }
  };

  // Get file type from URL
  const getFileType = (url) => {
    if (!url) return 'FILE';
    const extension = url.split('.').pop().toLowerCase();
    return extension === 'pdf' ? 'PDF' : 
           extension === 'docx' ? 'DOC' : 
           extension === 'xls' ? 'XLS' : 'FILE';
  };

  const getPriorityBadge = (priority) => {
    const priorityLower = priority?.toLowerCase() || '';
    switch(priorityLower) {
      case 'high': return 'bg-red-100 text-red-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      case 'low': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleDownload = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-6 bg-blue-50 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading documents...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50 min-h-screen">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Documents</h1>
        <p className="text-gray-600">Manage and view all your important documents</p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div 
        className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Priorities
            </button>
            {priorities.map(priority => (
              <button
                key={priority}
                onClick={() => setFilter(priority)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === priority 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
          
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search documents..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </motion.div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          No documents found
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {currentItems.map((doc) => (
                <motion.div
                  key={doc._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="px-5 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {doc.name}
                        </h3>
                        <span className="inline-block mt-1">
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                            {getFileType(doc.fileDocument)}
                          </span>
                        </span>
                      </div>
                      <button 
                        onClick={() => handleDownload(doc.fileDocument)}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <FiDownload size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow">
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {doc.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 ${getPriorityBadge(doc.priority)} text-xs rounded-full`}>
                        {doc.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-5 py-3 border-t border-gray-200 bg-gray-50">
                    <button
                      onClick={() => setSelectedDocument(doc)}
                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      View Details <FiArrowRight className="ml-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Document Detail Modal */}
      <AnimatePresence>
        {selectedDocument && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedDocument(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">{selectedDocument.name}</h2>
                <button 
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                    <p className="text-gray-700">
                      {selectedDocument.description || 'No description provided'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Details</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Priority:</span> 
                        <span className={`ml-2 ${getPriorityBadge(selectedDocument.priority)} px-2 py-1 rounded-full text-xs`}>
                          {selectedDocument.priority}
                        </span>
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Created By:</span> 
                        <span className="ml-2">{selectedDocument.createdBy?.name || 'Unknown'}</span>
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Created At:</span> 
                        <span className="ml-2">
                          {new Date(selectedDocument.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">File URL</h3>
                    <div className="flex items-center gap-2">
                      <FiFile className="text-gray-400" />
                      <a 
                        href={selectedDocument.fileDocument} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {selectedDocument.fileDocument}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownload(selectedDocument.fileDocument)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                >
                  <FiDownload /> Download
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DocumentsMb;