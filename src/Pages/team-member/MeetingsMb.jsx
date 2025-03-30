import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiUsers, FiLink2, FiX, FiArrowRight } from 'react-icons/fi';

function MeetingsMb() {
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [filter, setFilter] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  // Enhanced mock data with past meetings
  useEffect(() => {
    const mockMeetings = [
      {
        id: 1,
        description: 'Team Sync Meeting',
        time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        link: 'https://meet.example.com/team-sync',
        participants: ['John', 'Sarah', 'Mike', 'Emily', 'David'],
        agenda: 'Weekly team updates and blockers discussion\n- Review last week\'s progress\n- Identify current blockers\n- Plan for upcoming sprint',
        room: 'Virtual Meeting Room A'
      },
      {
        id: 2,
        description: 'Project Planning',
        time: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
        link: 'https://meet.example.com/project-planning',
        participants: ['Emma', 'David', 'Lisa'],
        agenda: 'Q4 project roadmap and resource allocation\n- Review project timeline\n- Assign team responsibilities\n- Budget discussion',
        room: 'Conference Room B'
      },
      {
        id: 3,
        description: 'Client Review',
        time: new Date(Date.now() - 86400000).toISOString(), // Yesterday (past meeting)
        link: 'https://meet.example.com/client-review',
        participants: ['Client Team', 'Sales', 'Product'],
        agenda: 'Demo of new features and feedback collection\n- Present latest updates\n- Gather client feedback\n- Q&A session',
        room: 'Client Meeting Room'
      },
      {
        id: 4,
        description: 'Design Workshop',
        time: new Date(Date.now() + 3600000).toISOString(), // In 1 hour
        link: 'https://meet.example.com/design-workshop',
        participants: ['Design Team', 'Product Managers'],
        agenda: 'UI/UX improvements brainstorming\n- Review current designs\n- Collect improvement ideas\n- Create action items',
        room: 'Design Studio'
      }
    ];
    setMeetings(mockMeetings);
  }, []);

  // Filter meetings based on status and search query
  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         meeting.agenda.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isUpcoming = new Date(meeting.time) > new Date();
    const matchesFilter = filter === 'all' || 
                         (filter === 'upcoming' && isUpcoming) || 
                         (filter === 'past' && !isUpcoming);
    
    return matchesSearch && matchesFilter;
  });

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

  // Format time to relative (e.g., "in 1 hour", "yesterday")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((date - now) / 1000);
    
    if (diffInSeconds > 0) {
      // Future meeting
      if (diffInSeconds < 60) return `Starting soon`;
      if (diffInSeconds < 3600) return `in ${Math.floor(diffInSeconds / 60)} min`;
      if (diffInSeconds < 86400) return `in ${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) > 1 ? 's' : ''}`;
      return `in ${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) > 1 ? 's' : ''}`;
    } else {
      // Past meeting
      const absDiff = Math.abs(diffInSeconds);
      if (absDiff < 60) return `Just ended`;
      if (absDiff < 3600) return `${Math.floor(absDiff / 60)} min ago`;
      if (absDiff < 86400) return `${Math.floor(absDiff / 3600)} hour${Math.floor(absDiff / 3600) > 1 ? 's' : ''} ago`;
      return `${Math.floor(absDiff / 86400)} day${Math.floor(absDiff / 86400) > 1 ? 's' : ''} ago`;
    }
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

      {/* Filters and Search */}
      <motion.div 
        className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'upcoming' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'past' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All
            </button>
          </div>
          
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search meetings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Meetings Grid */}
      {filteredMeetings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          No meetings found
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredMeetings.map((meeting) => {
              const isUpcoming = new Date(meeting.time) > new Date();
              
              return (
                <motion.div
                  key={meeting.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className={`px-5 py-4 border-b ${
                    isUpcoming ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {meeting.description}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isUpcoming ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {formatRelativeTime(meeting.time)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow">
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <FiClock className="mr-2" />
                      {new Date(meeting.time).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <FiUsers className="mr-2" />
                      {meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {meeting.agenda.split('\n')[0]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                    <button
                      onClick={() => setSelectedMeeting(meeting)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      Details <FiArrowRight className="ml-1" />
                    </button>
                    {isUpcoming && (
                      <a
                        href={meeting.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center"
                      >
                        <FiLink2 className="mr-1.5" /> Join
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Meeting Detail Modal */}
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
              <div className={`px-6 py-4 border-b ${
                new Date(selectedMeeting.time) > new Date() 
                  ? 'border-blue-200 bg-blue-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {selectedMeeting.description}
                  </h2>
                  <button 
                    onClick={() => setSelectedMeeting(null)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  {formatRelativeTime(selectedMeeting.time)} • {selectedMeeting.room}
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                      <FiClock className="mr-2" /> Time
                    </h3>
                    <p className="text-gray-700">
                      {new Date(selectedMeeting.time).toLocaleString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                      <FiLink2 className="mr-2" /> Meeting Link
                    </h3>
                    <a 
                      href={selectedMeeting.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all text-sm"
                    >
                      {selectedMeeting.link.replace('https://', '')}
                    </a>
                  </div>
                  
                  <div className="md:col-span-3">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Agenda</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="text-gray-700 whitespace-pre-wrap font-sans">
                        {selectedMeeting.agenda}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="md:col-span-3">
                    <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                      <FiUsers className="mr-2" /> Participants ({selectedMeeting.participants.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMeeting.participants.map((participant, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center"
                        >
                          {participant}
                        </span>
                      ))}
                    </div>
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
                {new Date(selectedMeeting.time) > new Date() && (
                  <a
                    href={selectedMeeting.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                  >
                    <FiLink2 className="mr-2" /> Join Meeting
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MeetingsMb;