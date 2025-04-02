import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGoogleMeetSessionById } from "../../../api/pages-api/company-owner-api/google-meet-api/COGoogleMeetingApi";

function ViewMeetings() {
  const { id } = useParams(); // Get the id from the URL
  const [meeting, setMeeting] = useState(null);

  // Fetch data from getGoogleMeetSessionById api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGoogleMeetSessionById(id);
        const data = response.googleMeet;
        setMeeting(data);
      } catch (error) {
        console.error("Error fetching Google Meet session:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!meeting) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        View Meeting
      </h1>

      {/* Main Card */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Meeting Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Title
            </label>
            <p className="text-gray-900 font-medium">
              {meeting?.name || "N/A"}
            </p>
          </div>

          {/* Meeting Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Description
            </label>
            <p className="text-gray-900">{meeting?.description || "N/A"}</p>
          </div>

          {/* Meeting Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Date
            </label>
            <p className="text-gray-900">
              {meeting?.meetingDate
                ? new Date(meeting.meetingDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          {/* Meeting Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Time
            </label>
            <p className="text-gray-900">{meeting?.meetingTime || "N/A"}</p>
          </div>

          {/* Meeting Link */}
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Link
            </label>
            <a
              href={meeting?.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {meeting?.meetingLink || "N/A"}
            </a>
          </div>

          {/* Meeting Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Status
            </label>
            <p
              className={`text-gray-900 ${
                meeting?.meetingStatus === "Scheduled"
                  ? "text-green-600"
                  : meeting?.meetingStatus === "Completed"
                  ? "text-gray-600"
                  : "text-red-600"
              }`}
            >
              {meeting?.meetingStatus || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMeetings;
