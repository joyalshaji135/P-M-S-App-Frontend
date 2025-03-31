import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewMeetings() {
  const { id } = useParams(); // Get the id from the URL
  const [meeting, setMeeting] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('meetingsMg')) || [];
    const meetingToView = storedData.find((meeting) => meeting.id === parseInt(id));
    if (meetingToView) {
      setMeeting(meetingToView);
    }
  }, [id]);

  if (!meeting) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Meeting</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Meeting Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Name</label>
            <p className="text-gray-900">{meeting.name}</p>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-gray-900">{meeting.description}</p>
          </div>

          {/* Industry Project */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry Project</label>
            <p className="text-gray-900">{meeting.industryProject}</p>
          </div>

          {/* Customer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
            <p className="text-gray-900">{meeting.customer}</p>
          </div>

          {/* Meeting Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Date</label>
            <p className="text-gray-900">{new Date(meeting.meetingDate).toLocaleDateString()}</p>
          </div>

          {/* Meeting Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Time</label>
            <p className="text-gray-900">{meeting.meetingTime}</p>
          </div>

          {/* Meeting Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
            <a
              href={meeting.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Join Meeting
            </a>
          </div>

          {/* Meeting Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Status</label>
            <p className="text-gray-900">{meeting.meetingStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMeetings;