import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGoogleMeetSessionById } from "../../../api/pages-api/admin-dashboard-api/google-meet-api/GoogleMeetingApi";
import { format, parseISO } from 'date-fns';

function ViewMeetingsAd() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return format(parseISO(dateString), 'MMMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return 'Not specified';
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours, 10);
      return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
    } catch {
      return timeString;
    }
  };

  // Fetch meeting data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getGoogleMeetSessionById(id);
        setMeeting(response.googleMeet);
        setError(null);
      } catch (error) {
        console.error("Error fetching Google Meet session:", error);
        setError("Failed to load meeting details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading meeting details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Meeting</h3>
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

  if (!meeting) {
    return (
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Meeting not found</h3>
          <p className="mt-1 text-gray-500">The requested meeting could not be loaded</p>
          <Link to="/admin/meetings" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
            Back to meetings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Meeting Details</h1>
          <p className="text-gray-600">View all details of this Google Meet session</p>
        </div>
        <Link 
          to="/admin/meetings" 
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-4 md:mt-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to meetings
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        {/* Card Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{meeting.name}</h2>
              <p className="text-sm text-gray-600">Meeting ID: {meeting.code}</p>
            </div>
            <span className={`mt-2 md:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              meeting.meetingStatus === "Scheduled" ? "bg-blue-100 text-blue-800" :
              meeting.meetingStatus === "Completed" ? "bg-green-100 text-green-800" :
              "bg-gray-100 text-gray-800"
            }`}>
              {meeting.meetingStatus || "Unknown"}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-gray-800">{meeting.description || "No description provided"}</p>
              </div>

              {/* Meeting Details */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Meeting Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-gray-800 font-medium">{formatDate(meeting.meetingDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-gray-800 font-medium">{formatTime(meeting.meetingTime)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Meeting Link</p>
                    <a 
                      href={meeting.meetingLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                    >
                      {meeting.meetingLink}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Name Alias</p>
                    <p className="text-gray-800 font-medium">{meeting.nameAlias || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Customer Information */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Customer</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-800">{meeting.customer?.name || "Not specified"}</p>
                  <p className="text-gray-600 text-sm">{meeting.customer?.email}</p>
                  <p className="text-gray-600 text-sm">{meeting.customer?.phone}</p>
                  
                  {meeting.customer?.address && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Address</p>
                      <p className="text-gray-600 text-sm">
                        {meeting.customer.address.street}<br />
                        {meeting.customer.address.city}, {meeting.customer.address.state}<br />
                        {meeting.customer.address.district}<br />
                        {meeting.customer.address.zipCode}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Information */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Project</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-800">{meeting.industryProject?.projectName || "Not specified"}</p>
                  <p className="text-gray-600 text-sm">Code: {meeting.industryProject?.code || "N/A"}</p>
                </div>
              </div>

              {/* System Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">System Info</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Created By</p>
                      <p className="text-gray-800">{meeting.createdBy?.name || "Unknown"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Created On</p>
                      <p className="text-gray-800">{formatDate(meeting.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Updated</p>
                      <p className="text-gray-800">{formatDate(meeting.updatedAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Default</p>
                      <p className="text-gray-800">{meeting.isDefault ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <Link
            to={`/admin/meetings/edit/${meeting._id}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Meeting
          </Link>
          {/* <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Cancel Meeting
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ViewMeetingsAd;