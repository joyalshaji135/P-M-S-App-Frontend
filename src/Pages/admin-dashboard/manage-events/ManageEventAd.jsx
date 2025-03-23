import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { deleteEventProgramById, getAllEventPrograms, statusUpdateEventProgramById } from '../../../api/pages-api/admin-dashboard-api/event-program-api/EventProgramApi';
import { toast } from 'react-toastify';

function ManageEventAd() {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Handle search functionality
  useEffect(() => {
    if (searchText) {
      const filtered = events.filter(
        (event) =>
          event.name.toLowerCase().includes(searchText.toLowerCase()) ||
          event.location.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events); // Reset to all events if search text is empty
    }
  }, [searchText, events]);
const fetchEvents = async () => {
  try {
    const response = await getAllEventPrograms();
    if (response.success) {
      setEvents(response.eventPrograms);
      setFilteredEvents(response.eventPrograms); // Initialize filteredEvents with all events
    } else {
      console.error('Failed to fetch events:', response.message);
      setEvents([]);
      setFilteredEvents([]);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }                                                                                                                             
}
useEffect(() => {
  fetchEvents();
},[]);
  // Handle event deletion
  const handleDelete = async (id) => {
        // Delete the team member Api
        try {
          const response = await deleteEventProgramById(id)
          if (response.success)
          {
            const updatedEvents = events.filter((event) => event._id!== id);
            setEvents(updatedEvents);
            setFilteredEvents(updatedEvents); // Refresh the table after deleting
            toast.success(response.message || 'Event deleted successfully');
          }
          else
          {
            console.error('Failed to delete event:', response.message);
            toast.error(response.message || 'Failed to delete event');
          }
        } catch (error) {
          console.error('Error deleting event:', error);
          toast.error(error.message || 'Failed to delete event');
        }
  };
const handleStatusUpdate = async (id, currentStatus) => {
  try {
    // Toggle between "Active" and "Inactive"
    const updatedStatus = !currentStatus ;
console.log("updatedStatus", updatedStatus);
    const response = await statusUpdateEventProgramById(id, {
      status: updatedStatus,
    });

    if (response.success) {
      toast.success(response.message || "Status updated successfully");
      fetchEvents(); // Refresh the table after updating
    } else {
      console.error("Failed to update status:", response.message);
      toast.error(response.message || "Failed to update status");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error(error.message || "Failed to update status");
  }
};

  // Table columns
  const columns = [
    {
      name: "Event Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
      sortable: true,
    },
    {
      name: "Industry",
      selector: (row) => `${row.industry}`,
      sortable: true,
    },
    {
      name: "Event Post",
      selector: (row) => row.eventPost,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <button
          onClick={() => handleStatusUpdate(row._id, row.status)}
          className={`px-3 py-1 rounded-full text-sm font-medium border transition duration-300 ${
            row.status
              ? "border-green-600 bg-green-100 text-green-700 hover:bg-green-200"
              : "border-red-600 bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          {row.status ? "Active" : "Inactive"}
        </button>
      ),
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          {/* View Button */}
          <Link to={`/admin/events/view/${row._id}`}>
            <button className="text-blue-600 hover:text-blue-900">
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
          <Link to={`/admin/events/edit/${row._id}`}>
            <button className="text-yellow-600 hover:text-yellow-900">
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
            className="text-red-600 hover:text-red-900"
            onClick={() => handleDelete(row._id)}
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
      ),
    },
  ];

  return (
    <div className="flex-1 p-6 overflow-y-auto" style={{ zIndex: 1 }}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Events</h1>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Add Button */}
          <Link
            to="/admin/events/add"
            className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-black"
          >
            Add +
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredEvents}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
}

export default ManageEventAd;