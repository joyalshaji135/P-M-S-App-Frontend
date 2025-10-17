import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getAllActivityLogs } from '../../../api/pages-api/activity-logs-api'; // You'll need to create this API function
import { toast } from 'react-toastify';
import moment from 'moment'; // For date formatting

function ActivityLogger() {
  const [logs, setLogs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [dateFilter, setDateFilter] = useState('');

  // Fetch logs from API
  const fetchLogs = async () => {
    try {
      const response = await getAllActivityLogs();
      if (response.success) {
        setLogs(response.logs);
        setFilteredLogs(response.logs);
      } else {
        console.error('Failed to fetch logs:', response.message);
        setLogs([]);
        setFilteredLogs([]);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let result = logs;

    if (searchText) {
      result = result.filter(log =>
        log.userId.name.toLowerCase().includes(searchText.toLowerCase()) ||
        log.action.toLowerCase().includes(searchText.toLowerCase()) ||
        (log.actionId && log.actionId.name && log.actionId.name.toLowerCase().includes(searchText.toLowerCase())) ||
        log.description.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    if (dateFilter) {
      result = result.filter(log => 
        moment(log.timestamp).format('YYYY-MM-DD') === dateFilter
      );
    }

    setFilteredLogs(result);
  }, [searchText, dateFilter, logs]);

  // Table columns
  const columns = [
    {
      name: "Timestamp",
      selector: (row) => moment(row.timestamp).format('DD MMM YYYY, hh:mm A'),
      sortable: true,
      width: '180px'
    },
    {
      name: "User",
      selector: (row) => row.userId.name,
      sortable: true,
    },
    {
      name: "Module",
      selector: (row) => row.module,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: true,
    },
    {
      name: "Target",
      cell: (row) => (
        row.actionId && row.actionId.name ? 
          `${row.actionId.name} (${row.actionId.role || ''})` : 
          'N/A'
      ),
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      wrap: true,
      width: '300px'
    }
  ];

  return (
    <div className="flex-1 p-6 overflow-y-auto" style={{ zIndex: 1 }}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Activity Logs</h1>
        <div className="flex items-center space-x-4">
          {/* Date Filter */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search logs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Refresh Button */}
          <button
            onClick={fetchLogs}
            className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-black flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredLogs}
          pagination
          highlightOnHover
          responsive
          defaultSortFieldId="timestamp"
          defaultSortAsc={false}
        />
      </div>
    </div>
  );
}

export default ActivityLogger;