import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

function DocumentsMb() {
  const [documents, setDocuments] = useState([]); // Initialize documents as an empty array
  const [searchText, setSearchText] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  // Mock data for documents (replace with actual data fetching logic if needed)
  useEffect(() => {
    const mockDocuments = [
      {
        id: 1,
        name: 'Project Report',
        description: 'Monthly project progress report',
        date: '2023-10-15T10:00:00',
        fileUrl: 'https://example.com/files/project-report.pdf',
      },
      {
        id: 2,
        name: 'Meeting Notes',
        description: 'Notes from the team meeting',
        date: '2023-10-16T14:30:00',
        fileUrl: 'https://example.com/files/meeting-notes.pdf',
      },
      {
        id: 3,
        name: 'Budget Plan',
        description: 'Q4 budget allocation plan',
        date: '2023-10-17T09:00:00',
        fileUrl: 'https://example.com/files/budget-plan.pdf',
      },
    ];
    setDocuments(mockDocuments);
    setFilteredDocuments(mockDocuments);
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = documents.filter(
      (doc) =>
        doc.name.toLowerCase().includes(searchValue) ||
        doc.description.toLowerCase().includes(searchValue)
    );
    setFilteredDocuments(filtered);
  };

  // Table columns
  const columns = [
    {
      name: 'Sl No',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Name / Description',
      cell: (row) => (
        <div>
          <div className="font-semibold">{row.name}</div>
          <div className="text-sm text-gray-600">{row.description}</div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Date and Time',
      selector: (row) => new Date(row.date).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Download',
      cell: (row) => (
        <a
          href={row.fileUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Download
        </a>
      ),
      ignoreRowClick: true, // Prevents row click from triggering the link
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Documents</h1>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search documents..."
            value={searchText}
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredDocuments}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
}

export default DocumentsMb;