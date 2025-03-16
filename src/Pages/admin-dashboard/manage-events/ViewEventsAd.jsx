import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewEventsAd() {
  const { id } = useParams(); // Get the id from the URL
  const [event, setEvent] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('events')) || [];
    const eventToView = storedData.find((event) => event.id === parseInt(id));
    if (eventToView) {
      setEvent(eventToView);
    }
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Event</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <p className="text-gray-900">{event.name}</p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <p className="text-gray-900">{event.location}</p>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <p className="text-gray-900">{event.date}</p>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <p className="text-gray-900">{event.time}</p>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-gray-900">{event.description}</p>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <p className="text-gray-900">{event.industry}</p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <p className="text-gray-900">{event.priority}</p>
          </div>

          {/* Domain */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
            <p className="text-gray-900">{event.Domain}</p>
          </div>

          {/* Event Post */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Post</label>
            <p className="text-gray-900">{event.eventPost}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEventsAd;