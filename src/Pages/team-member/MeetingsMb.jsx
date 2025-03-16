import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

function MeetingsMb() {
  const [meetings, setMeetings] = useState([]);

  // Mock data for meetings (replace with actual data fetching logic if needed)
  useEffect(() => {
    const mockMeetings = [
      {
        id: 1,
        description: 'Team Sync Meeting',
        time: '2023-10-15T10:00:00',
        link: 'https://meet.example.com/team-sync', // Meeting link
      },
      {
        id: 2,
        description: 'Project Planning',
        time: '2023-10-16T14:30:00',
        link: 'https://meet.example.com/project-planning', // Meeting link
      },
      {
        id: 3,
        description: 'Client Review',
        time: '2023-10-17T09:00:00',
        link: 'https://meet.example.com/client-review', // Meeting link
      },
    ];
    setMeetings(mockMeetings);
  }, []);

  // Table columns
  const columns = [
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: 'Time',
      selector: (row) => new Date(row.time).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Join Meeting',
      cell: (row) => (
        <a
          href={row.link} // Link to the meeting
          target="_blank" // Open in a new tab
          rel="noopener noreferrer" // Security best practice
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Join Meeting
        </a>
      ),
      ignoreRowClick: true, // Prevents row click from triggering the link
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Meetings</h1>

      {/* DataTable */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <DataTable
          columns={columns}
          data={meetings}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
}

export default MeetingsMb;