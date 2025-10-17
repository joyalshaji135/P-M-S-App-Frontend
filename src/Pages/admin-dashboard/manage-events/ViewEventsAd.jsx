import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import { getEventProgramById } from "../../../api/pages-api/admin-dashboard-api/event-program-api/EventProgramApi";
import { toast } from "react-toastify";

function ViewEventsAd() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEventById = async () => {
    try {
      setLoading(true);
      const response = await getEventProgramById(id);
      setEvent(response.eventPrograms);
    } catch (error) {
      console.error("Error fetching event by ID:", error);
      toast.error("Failed to load event details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchEventById();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-600">
        Event not found
      </div>
    );
  }

  // Format date and time
  const formattedDate = new Date(event.eventDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = event.eventTime ? 
    new Date(`1970-01-01T${event.eventTime}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }) : "N/A";

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-blue-50">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center mb-6"
      >
        <Link
          to="/admin/events"
          className="mr-4 p-2 rounded-full hover:bg-blue-100 transition-colors"
        >
          <FaArrowLeft className="text-blue-600" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Event Details</h1>
          <p className="text-blue-600 mt-1">View complete information about this event</p>
        </div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm p-6 border border-blue-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Name */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-blue-800 border-b border-blue-100 pb-2">
              {event.name}
            </h2>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <div className="flex items-center text-blue-600">
              <FaMapMarkerAlt className="mr-2" />
              <span className="text-sm font-medium">Location</span>
            </div>
            <p className="text-blue-800 font-medium pl-6">{event.location || "N/A"}</p>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <div className="flex items-center text-blue-600">
              <FaCalendarAlt className="mr-2" />
              <span className="text-sm font-medium">Date</span>
            </div>
            <p className="text-blue-800 font-medium pl-6">{formattedDate || "N/A"}</p>
          </div>

          {/* Time */}
          <div className="space-y-2">
            <div className="flex items-center text-blue-600">
              <FaClock className="mr-2" />
              <span className="text-sm font-medium">Time</span>
            </div>
            <p className="text-blue-800 font-medium pl-6">{formattedTime}</p>
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <p className="text-sm text-blue-600 font-medium">Industry</p>
            <p className="text-blue-800 font-medium">{event.industry || "N/A"}</p>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <p className="text-sm text-blue-600 font-medium">Priority</p>
            <p className="text-blue-800 font-medium">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                event.priority === 'high' ? 'bg-red-100 text-red-800' :
                event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {event.priority || "N/A"}
              </span>
            </p>
          </div>

          {/* Domain */}
          <div className="space-y-2">
            <p className="text-sm text-blue-600 font-medium">Domain</p>
            <p className="text-blue-800 font-medium">{event.Domain || "N/A"}</p>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <p className="text-sm text-blue-600 font-medium">Status</p>
            <p className={`text-sm font-medium px-3 py-1 rounded-xl inline-block ${
              event.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {event.status ? "Active" : "Inactive"}
            </p>
          </div>

          {/* Event Post */}
          <div className="md:col-span-2 space-y-2">
            <p className="text-sm text-blue-600 font-medium">Event Post</p>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-blue-800">{event.eventPost || "N/A"}</p>
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2 space-y-2">
            <p className="text-sm text-blue-600 font-medium">Description</p>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-blue-800">{event.description || "N/A"}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ViewEventsAd;