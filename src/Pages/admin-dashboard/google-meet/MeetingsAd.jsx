import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllGoogleMeetSessions } from '../../../api/pages-api/admin-dashboard-api/google-meet-api/GoogleMeetingApi';

function MeetingsAd() {
  const [meetings, setMeetings] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Fetch data from getAllGoogleMeetSessions api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllGoogleMeetSessions();
        setMeetings(data.googleMeets);
      } catch (error) {
        console.error('Error fetching Google Meet sessions:', error);
      }
    };
    fetchData();
  }, []);

  // Filter meetings based on search text
  const filteredMeetings = meetings.filter(
    (meeting) =>
      meeting.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (meeting.meetingTime && meeting.meetingTime.toLowerCase().includes(searchText.toLowerCase()))
  );

  // Handle delete functionality
  const handleDelete = (id) => {
    const updatedMeetings = meetings.filter((meeting) => meeting.id !== id);
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    setMeetings(updatedMeetings);
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl font-semibold text-blue-800">Manage Google Meets</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search meetings..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-full md:w-64"
          />
          {/* Add Button */}
          <Link
            to="/admin/meetings/add"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap text-center"
          >
            Add New Meeting +
          </Link>
        </div>
      </div>

      {/* Meetings Grid */}
      {filteredMeetings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500">No meetings found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeetings.map((meeting, index) => (
            <div key={meeting._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">{meeting.name}</h3>
                    <p className="text-sm text-blue-600 mt-1">
                      {meeting.meetingTime || 'No time specified'}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    #{index + 1}
                  </span>
                </div>

                <div className="mt-4 mb-6">
                  <a
                    href={meeting.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors duration-200 w-full text-center"
                  >
                    Join Meeting
                  </a>
                </div>

                <div className="flex justify-end space-x-3 border-t border-blue-50 pt-4">
                  {/* View Button */}
                  <Link to={`/admin/meetings/view/${meeting._id}`}>
                    <button 
                      className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
                      title="View"
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
          ))}
        </div>
      )}
    </div>
  );
}

export default MeetingsAd;