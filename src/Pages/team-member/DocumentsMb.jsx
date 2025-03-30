import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiDownload, FiFile, FiCalendar, FiX, FiArrowRight } from 'react-icons/fi';

function DocumentsMb() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [filter, setFilter] = useState('all');

  // Enhanced mock data with different document types
  useEffect(() => {
    const mockDocuments = [
      {
        id: 1,
        name: 'Project Report Q3',
        description: 'Detailed quarterly progress report with metrics and team performance',
        date: '2023-10-15T10:00:00',
        fileUrl: 'https://example.com/files/project-report.pdf',
        type: 'pdf',
        size: '2.4 MB',
        category: 'Reports'
      },
      {
        id: 2,
        name: 'Meeting Notes - October',
        description: 'Key decisions and action items from team meetings',
        date: '2023-10-16T14:30:00',
        fileUrl: 'https://example.com/files/meeting-notes.docx',
        type: 'doc',
        size: '1.1 MB',
        category: 'Minutes'
      },
      {
        id: 3,
        name: 'Budget Plan 2024',
        description: 'Annual budget allocation with department breakdown',
        date: '2023-10-17T09:00:00',
        fileUrl: 'https://example.com/files/budget-plan.xlsx',
        type: 'xls',
        size: '3.2 MB',
        category: 'Financial'
      },
      {
        id: 4,
        name: 'Product Roadmap',
        description: 'Updated product development timeline and milestones',
        date: '2023-10-18T11:00:00',
        fileUrl: 'https://example.com/files/roadmap.pdf',
        type: 'pdf',
        size: '1.8 MB',
        category: 'Plans'
      },
      {
        id: 5,
        name: 'User Research Findings',
        description: 'Compiled data from recent user interviews and surveys',
        date: '2023-10-19T16:45:00',
        fileUrl: 'https://example.com/files/research.pdf',
        type: 'pdf',
        size: '4.5 MB',
        category: 'Research'
      }
    ];
    setDocuments(mockDocuments);
    setFilteredDocuments(mockDocuments);
  }, []);

  // Handle search and filter
  useEffect(() => {
    const filtered = documents.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesFilter = filter === 'all' || doc.category.toLowerCase() === filter.toLowerCase();
      
      return matchesSearch && matchesFilter;
    });
    setFilteredDocuments(filtered);
  }, [searchText, filter, documents]);

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

  // Get file icon based on type
  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf':
        return <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">PDF</span>;
      case 'doc':
      case 'docx':
        return <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">DOC</span>;
      case 'xls':
      case 'xlsx':
        return <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">XLS</span>;
      default:
        return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">FILE</span>;
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
              All Documents
            </button>
            <button
              onClick={() => setFilter('Reports')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'Reports' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Reports
            </button>
            <button
              onClick={() => setFilter('Minutes')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'Minutes' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Minutes
            </button>
            <button
              onClick={() => setFilter('Financial')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'Financial' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Financial
            </button>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredDocuments.map((doc) => (
              <motion.div
                key={doc.id}
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
                        {getFileIcon(doc.type)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {doc.size}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex-grow">
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {doc.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FiCalendar className="mr-2" />
                    {new Date(doc.date).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {doc.category}
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
                    href={doc.fileUrl}
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
                      {getFileIcon(selectedDocument.type)}
                      <span className="ml-2 text-sm text-gray-600">
                        {selectedDocument.category} • {selectedDocument.size}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                    <p className="text-gray-700">
                      {selectedDocument.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Uploaded</h3>
                    <p className="text-gray-700">
                      {new Date(selectedDocument.date).toLocaleString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  
                  <div className="md:col-span-3">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">File URL</h3>
                    <a 
                      href={selectedDocument.fileUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all text-sm"
                    >
                      {selectedDocument.fileUrl}
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
                  href={selectedDocument.fileUrl}
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