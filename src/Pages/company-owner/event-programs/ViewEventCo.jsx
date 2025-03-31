import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventProgramById } from "../../../api/pages-api/company-owner-api/event-program-api/COEventProgramApi";

function ViewEventCo() {
  const { id } = useParams(); // Get the id from the URL
  const [event, setEvent] = useState(null);

  const fetchEventById = async () => {
    try {
      const response = await getEventProgramById(id);
      setEvent(response.eventPrograms);
    } catch (error) {
      console.error("Error fetching event by ID:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEventById();
    }
  }, [id]);

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Event</h1>

      {/* Main Card */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Name
            </label>
            <p className="text-gray-900 font-medium">{event?.name || "N/A"}</p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <p className="text-gray-900">{event?.location || "N/A"}</p>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <p className="text-gray-900">
              {new Date(event.createdAt).toLocaleDateString() || "N/A"}
            </p>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <p className="text-gray-900">{event?.eventTime || "N/A"}</p>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <p className="text-gray-900">{event?.industry || "N/A"}</p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <p className="text-gray-900">{event?.priority || "N/A"}</p>
          </div>

          {/* Domain */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Domain
            </label>
            <p className="text-gray-900">{event?.Domain || "N/A"}</p>
          </div>

          {/* Event Post */}
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Post
            </label>
            <p className="text-gray-900">{event?.eventPost || "N/A"}</p>
          </div>
          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <p className="text-gray-900">{event?.description || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEventCo;
