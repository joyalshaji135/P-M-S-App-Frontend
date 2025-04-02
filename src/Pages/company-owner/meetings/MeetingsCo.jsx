import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getAllGoogleMeetSessions } from '../../../api/pages-api/company-owner-api/google-meet-api/COGoogleMeetingApi';

function MeetingCo() {
  const [meetings, setMeetings] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [meetingsPerPage] = useState(6);
  const [filters, setFilters] = useState({
    status: 'all',
    date: 'all',
    sort: 'newest'
  });

  // Fetch data from getAllGoogleMeetSessions api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getAllGoogleMeetSessions();
        setMeetings(data.googleMeets);
        setFilteredMeetings(data.googleMeets);
      } catch (error) {
        console.error('Error fetching Google Meet sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Apply all filters and search
  useEffect(() => {
    let result = [...meetings];

    // Apply search filter
    if (searchText) {
      result = result.filter(
        (meeting) =>
          meeting.name.toLowerCase().includes(searchText.toLowerCase()) ||
          meeting.meetingTime.toLowerCase().includes(searchText.toLowerCase()) ||
          meeting.meetingDate.toLowerCase().includes(searchText.toLowerCase()) ||
          meeting.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(meeting => meeting.meetingStatus === filters.status);
    }

    // Apply date filter
    if (filters.date !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (filters.date === 'today') {
        result = result.filter(meeting => {
          const meetingDate = new Date(meeting.meetingDate);
          return meetingDate.toDateString() === today.toDateString();
        });
      } else if (filters.date === 'upcoming') {
        result = result.filter(meeting => {
          const meetingDate = new Date(meeting.meetingDate);
          return meetingDate >= today;
        });
      } else if (filters.date === 'past') {
        result = result.filter(meeting => {
          const meetingDate = new Date(meeting.meetingDate);
          return meetingDate < today;
        });
      }
    }

    // Apply sorting
    if (filters.sort === 'newest') {
      result.sort((a, b) => new Date(b.meetingDate) - new Date(a.meetingDate));
    } else if (filters.sort === 'oldest') {
      result.sort((a, b) => new Date(a.meetingDate) - new Date(b.meetingDate));
    } else if (filters.sort === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredMeetings(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchText, meetings, filters]);

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(filteredMeetings);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFilteredMeetings(items);
  };

  // Handle delete functionality
  const handleDelete = (id) => {
    const updatedMeetings = meetings.filter((meeting) => meeting._id !== id);
    setMeetings(updatedMeetings);
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Pagination logic
  const indexOfLastMeeting = currentPage * meetingsPerPage;
  const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
  const currentMeetings = filteredMeetings.slice(indexOfFirstMeeting, indexOfLastMeeting);
  const totalPages = Math.ceil(filteredMeetings.length / meetingsPerPage);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      y: -5,
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      transition: {
        duration: 0.2,
      },
    },
  };

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-semibold text-gray-800"
        >
          Manage Google Meets
        </motion.h1>
        <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto gap-4">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full md:w-64"
          >
            <input
              type="text"
              placeholder="Search meetings..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>
          {/* Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link
              to="/team-manager/meetings/add"
              className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-black transition-colors duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Meeting
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Status Filter */}
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status-filter"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <select
              id="date-filter"
              value={filters.date}
              onChange={(e) => setFilters({...filters, date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <label htmlFor="sort-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              id="sort-filter"
              value={filters.sort}
              onChange={(e) => setFilters({...filters, sort: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">By Name</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setFilters({
                  status: 'all',
                  date: 'all',
                  sort: 'newest'
                });
                setSearchText('');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredMeetings.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm p-8 text-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No meetings found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchText || filters.status !== 'all' || filters.date !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Get started by creating a new meeting'}
          </p>
          <div className="mt-6">
            <Link
              to="/owner/meetings/add"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Meeting
            </Link>
          </div>
        </motion.div>
      )}

      {/* Cards Grid with Drag and Drop */}
      {!isLoading && filteredMeetings.length > 0 && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="meetings" direction="horizontal">
            {(provided) => (
              <motion.div
                {...provided.droppableProps}
                ref={provided.innerRef}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentMeetings.map((meeting, index) => (
                  <Draggable key={meeting._id} draggableId={meeting._id} index={index}>
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 relative"
                      >
                        {/* Drag handle */}
                        <div className="absolute top-2 right-2 text-gray-400 cursor-move">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                          </svg>
                        </div>
                        
                        <div className="p-5">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{meeting.name}</h3>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{meeting.description}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(meeting.meetingStatus)}`}>
                              {meeting.meetingStatus}
                            </span>
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(meeting.meetingDate)} at {meeting.meetingTime}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Created by: {meeting.createdBy?.name || 'Unknown'}
                            </div>
                          </div>

                          <div className="mt-6 flex justify-between items-center">
                            <a
                              href={meeting.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Join Meeting
                            </a>

                            <div className="flex space-x-2">
                              {/* View Button */}
                              <Link to={`/owner/meetings/view/${meeting._id}`}>
                                <button className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </Link>

                              {/* Edit Button */}
                              <Link to={`/owner/meetings/edit/${meeting._id}`}>
                                <button className="p-1.5 rounded-md text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 transition-colors duration-200">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                  </svg>
                                </button>
                              </Link>

                              {/* Delete Button */}
                              <button
                                onClick={() => handleDelete(meeting._id)}
                                className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </motion.div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* Pagination */}
      {!isLoading && filteredMeetings.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span className="sr-only">Previous</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === page ? 'bg-blue-50 text-blue-600 border-blue-500' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span className="sr-only">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default MeetingCo;