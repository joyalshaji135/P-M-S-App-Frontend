import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  deleteEventProgramById, 
  getAllEventPrograms, 
  statusUpdateEventProgramById 
} from '../../../api/pages-api/company-owner-api/event-program-api/COEventProgramApi';
import { toast } from 'react-toastify';
import { FaEye, FaEdit, FaTrash, FaSearch, FaPlus, FaFilter } from 'react-icons/fa';

function ManageEventOwner() {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getAllEventPrograms();
      if (response.success) {
        setEvents(response.eventPrograms);
        setFilteredEvents(response.eventPrograms);
      } else {
        toast.error(response.message || 'Failed to fetch events');
      }
    } catch (error) {
      toast.error('Error fetching events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let results = events;

    // Apply search filter
    if (searchText) {
      results = results.filter(event =>
        event.name.toLowerCase().includes(searchText.toLowerCase()) ||
        event.industry.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      results = results.filter(event => event.priority === priorityFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(event => 
        statusFilter === 'active' ? event.status : !event.status
      );
    }

    setFilteredEvents(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchText, priorityFilter, statusFilter, events]);

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const response = await deleteEventProgramById(id);
      if (response.success) {
        toast.success('Event deleted successfully');
        fetchEvents();
      } else {
        toast.error(response.message || 'Failed to delete event');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete event');
    }
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    try {
      const response = await statusUpdateEventProgramById(id, {
        status: !currentStatus,
      });
      if (response.success) {
        toast.success("Status updated successfully");
        fetchEvents();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Failed to update status");
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
          <h1 className="text-2xl font-bold text-blue-800">Manage Events</h1>
          <p className="text-blue-600 mt-1">
            Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
          {/* Search Bar */}
          <motion.div 
            className="relative w-full md:w-64"
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
              <FaSearch className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm bg-white"
            />
          </motion.div>
          
          {/* Add Button */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/owner/events/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors text-sm whitespace-nowrap flex items-center"
            >
              <FaPlus className="w-4 h-4 mr-2" />
              Add Event
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Filter Section */}
      <motion.div 
        className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center text-blue-600 mb-3">
          <FaFilter className="mr-2" />
          <span className="font-medium">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-blue-700 mb-1">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm bg-white"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-blue-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Events Grid */}
      {loading ? (
        <motion.div 
          className="flex justify-center items-center h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </motion.div>
      ) : filteredEvents.length === 0 ? (
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-8 text-center text-blue-500 border border-blue-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No events found matching your criteria
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEvents.map((event) => (
              <motion.div
                key={event._id}
                className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-blue-800">{event.name}</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusUpdate(event._id, event.status)}
                      className={`px-3 py-1 rounded-xl text-xs font-medium ${
                        event.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {event.status ? "Active" : "Inactive"}
                    </motion.button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-blue-600">Priority</p>
                      <p className="text-blue-800 font-medium">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.priority === 'high' ? 'bg-red-100 text-red-800' :
                          event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.priority}
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-blue-600">Industry</p>
                      <p className="text-blue-800 font-medium">{event.industry}</p>
                    </div>

                    <div>
                      <p className="text-sm text-blue-600">Event Post</p>
                      <p className="text-blue-800 font-medium truncate">{event.eventPost || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-blue-100">
                    <Link to={`/owner/events/view/${event._id}`}>
                      <motion.button 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="View"
                      >
                        <FaEye className="h-4 w-4" />
                      </motion.button>
                    </Link>

                    <Link to={`/owner/events/edit/${event._id}`}>
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
                      onClick={() => handleDelete(event._id)}
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

export default ManageEventOwner;