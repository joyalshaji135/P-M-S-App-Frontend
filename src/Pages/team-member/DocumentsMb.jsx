import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiDownload, FiFile, FiX, FiArrowRight } from 'react-icons/fi';

function DocumentsMb() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Industry mapping based on your example ID
  const industries = {
    '60d21b4667d0d8992e610c90': 'Technology',
    '60d21b4667d0d8992e610c91': 'Finance',
    '60d21b4667d0d8992e610c92': 'Healthcare'
  };

  // Mock data based on your API structure
  useEffect(() => {
    const mockDocuments = [
      {
        name: 'John Doe',
        description: 'A detailed document outlining the project scope.',
        industry: '60d21b4667d0d8992e610c90',
        priority: 'High',
        fileDocument: 'https://example.com/uploads/project_proposal.pdf'
      },
      {
        name: 'Jane Smith',
        description: 'Quarterly financial report summary',
        industry: '60d21b4667d0d8992e610c91',
        priority: 'Medium',
        fileDocument: 'https://example.com/uploads/financial_report.docx'
      },
      {
        name: 'Mike Johnson',
        description: 'Healthcare compliance guidelines',
        industry: '60d21b4667d0d8992e610c92',
        priority: 'Low',
        fileDocument: 'https://example.com/uploads/healthcare_guidelines.pdf'
      }
    ];
    setDocuments(mockDocuments);
    setFilteredDocuments(mockDocuments);
  }, []);

  // Filter and search logic
  useEffect(() => {
    const filtered = documents.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesFilter = filter === 'all' || doc.industry === filter;
      
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
    const extension = url.split('.').pop().toLowerCase();
    return extension === 'pdf' ? 'PDF' : 
           extension === 'docx' ? 'DOC' : 
           extension === 'xls' ? 'XLS' : 'FILE';
  };

  // Get priority badge style
  const getPriorityBadge = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      case 'low': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Documents
      </motion.h1>

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
              All Industries
            </button>
            {Object.entries(industries).map(([id, name]) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search documents..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
            />
            {searchText && (
              <button
                onClick={() => setSearchText('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <FiX size={18} />
              </button>
            )}
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
                  key={doc.name}
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
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow">
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {doc.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {industries[doc.industry]}
                      </span>
                      <span className={`px-2 py-1 ${getPriorityBadge(doc.priority)} text-xs rounded-full`}>
                        {doc.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                    <button
                      onClick={() => setSelectedDocument(doc)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      Details <FiArrowRight className="ml-1" />
                    </button>
                    <a
                      href={doc.fileDocument}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center"
                    >
                      <FiDownload className="mr-1.5" /> Download
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          <motion.div 
            className="mt-6 flex justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center"
            >
              Next
            </button>
          </motion.div>
        </>
      )}

      {/* Document Detail Modal */}
      <AnimatePresence>
        {selectedDocument && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedDocument(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {selectedDocument.name}
                    </h2>
                    <div className="mt-1 flex items-center">
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                        {getFileType(selectedDocument.fileDocument)}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedDocument(null)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                    <p className="text-gray-700">
                      {selectedDocument.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Details</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Industry:</span> {industries[selectedDocument.industry]}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Priority:</span> 
                        <span className={`ml-2 ${getPriorityBadge(selectedDocument.priority)} px-2 py-1 rounded-full text-xs`}>
                          {selectedDocument.priority}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">File URL</h3>
                    <a 
                      href={selectedDocument.fileDocument} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all text-sm"
                    >
                      {selectedDocument.fileDocument}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center"
                >
                  Close
                </button>
                <a
                  href={selectedDocument.fileDocument}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                >
                  <FiDownload className="mr-2" /> Download Document
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DocumentsMb;