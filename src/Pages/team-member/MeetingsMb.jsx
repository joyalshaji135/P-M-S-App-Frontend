import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiExternalLink, FiCalendar, FiClock, FiX, FiArrowRight } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllMeetings } from '../../api/pages-api/team-member-api/meetings/MTMeetingApi';

function MeetingsMb() {
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const itemsPerPage = 5;

  const statusFilters = {
    'all': 'All Meetings',
    'Scheduled': 'Scheduled',
    'Completed': 'Completed',
    'Cancelled': 'Cancelled'
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await getAllMeetings();
        setMeetings(response.googleMeetings);
        setFilteredMeetings(response.googleMeetings);
      } catch (error) {
        console.error("Failed to fetch meetings:", error);
      }
    };
    fetchMeetings();
  }, []);

  useEffect(() => {
    const filtered = meetings.filter(meeting => {
      const meetingDate = new Date(meeting.meetingDate);
      const afterStartDate = startDate ? meetingDate >= startDate : true;
      const beforeEndDate = endDate ? meetingDate <= endDate : true;
      const matchesStatus = filter === 'all' || meeting.meetingStatus === filter;
      
      const searchTerms = searchText.toLowerCase().split(' ');
      const searchFields = [
        meeting.name,
        meeting.description,
        meeting.meetingStatus,
        meeting.code
      ].join(' ').toLowerCase();
      
      const matchesSearch = searchTerms.every(term => 
        searchFields.includes(term)
      );

      return afterStartDate && beforeEndDate && matchesStatus && matchesSearch;
    });

    setFilteredMeetings(filtered);
    setCurrentPage(1);
  }, [searchText, filter, startDate, endDate, meetings]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMeetings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);

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

  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'scheduled': return 'bg-blue-100 text-blue-600';
      case 'completed': return 'bg-green-100 text-green-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Meetings
      </motion.h1>

      <motion.div 
        className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Date Range</label>
              <div className="flex gap-2">
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                />
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="End Date"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(statusFilters).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === key 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Search Meetings</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, description, status, or code..."
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
          </div>
        </div>
      </motion.div>

      {filteredMeetings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          No meetings found
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {currentItems.map((meeting) => (
                <motion.div
                  key={meeting._id}
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
                          {meeting.name}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                          <FiCalendar className="inline-block" />
                          <span>{formatDate(meeting.meetingDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiClock className="inline-block" />
                          <span>{meeting.meetingTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow">
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {meeting.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 ${getStatusBadge(meeting.meetingStatus)} text-xs rounded-full`}>
                        {meeting.meetingStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                    <button
                      onClick={() => setSelectedMeeting(meeting)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      Details <FiArrowRight className="ml-1" />
                    </button>
                    <a
                      href={meeting.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center"
                    >
                      <FiExternalLink className="mr-1.5" /> Join Meeting
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

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

      <AnimatePresence>
        {selectedMeeting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMeeting(null)}
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
                      {selectedMeeting.name}
                    </h2>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <FiCalendar className="inline-block" />
                      <span>{formatDate(selectedMeeting.meetingDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiClock className="inline-block" />
                      <span>{selectedMeeting.meetingTime}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedMeeting(null)}
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
                      {selectedMeeting.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Details</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Status:</span> 
                        <span className={`ml-2 ${getStatusBadge(selectedMeeting.meetingStatus)} px-2 py-1 rounded-full text-xs`}>
                          {selectedMeeting.meetingStatus}
                        </span>
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Meeting Code:</span> {selectedMeeting.code}
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Meeting Link</h3>
                    <a 
                      href={selectedMeeting.meetingLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all text-sm"
                    >
                      {selectedMeeting.meetingLink}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedMeeting(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center"
                >
                  Close
                </button>
                <a
                  href={selectedMeeting.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                >
                  <FiExternalLink className="mr-2" /> Join Meeting
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MeetingsMb;