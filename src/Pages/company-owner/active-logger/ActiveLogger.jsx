import React, { useEffect, useState } from 'react';
import { getAllActivityLogs } from '../../../api/active-log-api/activeLogsApi';
import { toast } from 'react-toastify';

function ActiveLogger() {
  const [activeLogs, setActiveLogs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Increased items per page for 4x2 grid

  // Fetch active logs (unchanged)
  const fetchActiveLogs = async () => {
    try {
      const response = await getAllActivityLogs();
      if (response.success) {
        setActiveLogs(response.activeLog);
        setFilteredLogs(response.activeLog);
      } else {
        toast.error(response.message || 'Failed to fetch logs');
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching logs');
    }
  };

  useEffect(() => {
    fetchActiveLogs();
  }, []);

  // Search functionality (unchanged)
  useEffect(() => {
    const filtered = activeLogs.filter(log => {
      const searchLower = searchText.toLowerCase();
      return (
        log.userId?.name?.toLowerCase().includes(searchLower) ||
        log.module?.toLowerCase().includes(searchLower) ||
        log.action?.toLowerCase().includes(searchLower) ||
        log.description?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [searchText, activeLogs]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  // Generate page numbers with limited display
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Action type styling (unchanged)
  const getActionStyle = (action) => {
    switch (action.toLowerCase()) {
      case 'create':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto" style={{ zIndex: 1 }}>
      {/* Header Section (unchanged) */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Activity Logs</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search logs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>

      {/* Logs Grid - Updated for 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentLogs.length === 0 ? (
          <div className="col-span-full text-center py-6 text-gray-500">
            No activity logs found
          </div>
        ) : (
          currentLogs.map((log) => (
            <div
              key={log._id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Card content (unchanged) */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getActionStyle(
                        log.action
                      )}`}
                    >
                      {log.action}
                    </span>
                    <span className="text-sm text-gray-500">
                      {log.module}
                    </span>
                  </div>
                  <p className="text-gray-800 mb-2">{log.description}</p>
                  <div className="text-sm text-gray-600">
                    <p>
                      <span className="font-medium">User:</span>{' '}
                      {log.userId?.name || 'Unknown'}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{' '}
                      {new Date(log.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Compact Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            First
          </button>
          
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {getPageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>

          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}

export default ActiveLogger;