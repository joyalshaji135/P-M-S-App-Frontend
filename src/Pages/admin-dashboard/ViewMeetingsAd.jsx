import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewMeetingsAd() {
  const { id } = useParams(); // Get the id from the URL
  const [meeting, setMeeting] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('meetings')) || [];
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
          {/* Meeting Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
            <p className="text-gray-900">{meeting.title}</p>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <p className="text-gray-900">{meeting.time}</p>
          </div>

          {/* Meeting Link */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
            <a
              href={meeting.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Join Meeting
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMeetingsAd;