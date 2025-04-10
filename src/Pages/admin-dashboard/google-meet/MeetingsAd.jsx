import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllGoogleMeetSessions } from '../../../api/pages-api/admin-dashboard-api/google-meet-api/GoogleMeetingApi';
import { format, parseISO } from 'date-fns';

function MeetingsAd() {
  const [meetings, setMeetings] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from getAllGoogleMeetSessions api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllGoogleMeetSessions();
        setMeetings(data.googleMeets);
        setError(null);
      } catch (error) {
        console.error('Error fetching Google Meet sessions:', error);
        setError('Failed to load meetings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter meetings based on search text, status, and date
  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch = 
      meeting.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (meeting.description && meeting.description.toLowerCase().includes(searchText.toLowerCase())) ||
      (meeting.customer?.name && meeting.customer.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (meeting.code && meeting.code.toLowerCase().includes(searchText.toLowerCase()));

    const matchesStatus = 
      statusFilter === 'all' || 
      meeting.meetingStatus?.toLowerCase() === statusFilter.toLowerCase();

    const matchesDate = 
      !dateFilter || 
      (meeting.meetingDate && new Date(meeting.meetingDate).toISOString().split('T')[0] === dateFilter);

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Handle delete functionality
  const handleDelete = (id) => {
    const updatedMeetings = meetings.filter((meeting) => meeting._id !== id);
    setMeetings(updatedMeetings);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 overflow-y-auto bg-blue-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-blue-800">Loading meetings...</p>
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
          <h1 className="text-2xl font-semibold text-blue-800">Manage Google Meets</h1>
          <p className="text-gray-600">View and manage all scheduled Google Meet sessions</p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto gap-4">
          {/* Add Button */}
          <Link
            to="/admin/meetings/add"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap text-center flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Add New Meeting
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Bar */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search meetings..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
            />
          </div>
          
          {/* Status Filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          
          {/* Date Filter */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              id="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
            />
          </div>
        </div>
      </div>

      {/* Meetings Grid */}
      {filteredMeetings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No meetings found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          {searchText || statusFilter !== 'all' || dateFilter ? (
            <button 
              onClick={() => {
                setSearchText('');
                setStatusFilter('all');
                setDateFilter('');
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredMeetings.map((meeting) => (
            <div key={meeting._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-blue-800">{meeting.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        meeting.meetingStatus === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                        meeting.meetingStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {meeting.meetingStatus || 'Unknown'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{meeting.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatDate(meeting.meetingDate)}</p>
                    <p className="text-sm text-gray-500">{meeting.meetingTime || 'No time specified'}</p>
                  </div>
                </div>

                <div className="mt-2 mb-4">
                  <p className="text-gray-600 text-sm">{meeting.description || 'No description provided'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Customer</h4>
                    <p className="font-medium text-gray-900">{meeting.customer?.name || 'Not specified'}</p>
                    <p className="text-sm text-gray-600">{meeting.customer?.email || ''}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Project</h4>
                    <p className="font-medium text-gray-900">{meeting.industryProject?.projectName || 'Not specified'}</p>
                    <p className="text-sm text-gray-600">{meeting.industryProject?.code || ''}</p>
                  </div>
                </div>

                <div className="mt-4 mb-6">
                  <a
                    href={meeting.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors duration-200 w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Join Meeting
                  </a>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <div className="text-sm text-gray-500">
                    Created by: {meeting.createdBy?.name || 'Unknown'} on {formatDate(meeting.createdAt)}
                  </div>
                  <div className="flex space-x-3">
                    {/* View Button */}
                    <Link to={`/admin/meetings/view/${meeting._id}`}>
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
                    <Link to={`/admin/meetings/edit/${meeting._id}`}>
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
                      onClick={() => handleDelete(meeting._id)}
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

export default MeetingsAd;