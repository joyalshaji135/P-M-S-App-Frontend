import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';

function FileDocumentsAd() {
  const [documents, setDocuments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // For editing documents

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('documents')) || [];
    setDocuments(storedData);
    setFilteredDocuments(storedData); // Initialize filteredDocuments with all data
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchText) {
      const filtered = documents.filter(
        (document) =>
          document.name.toLowerCase().includes(searchText.toLowerCase()) ||
          document.type.toLowerCase().includes(searchText.toLowerCase()) ||
          document.fileDocument.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDocuments(filtered);
    } else {
      setFilteredDocuments(documents); // Reset to all documents if search text is empty
    }
  }, [searchText, documents]);

  // Handle delete functionality
  const handleDelete = (id) => {
    const updatedDocuments = documents.filter((document) => document.id !== id);
    localStorage.setItem('documents', JSON.stringify(updatedDocuments));
    setDocuments(updatedDocuments); // Update state to reflect the deletion
    setFilteredDocuments(updatedDocuments); // Update filtered documents as well
  };

  // Handle form submission (for adding/editing documents)
  const handleSubmit = (formData) => {
    const storedData = JSON.parse(localStorage.getItem('documents')) || [];

    if (id) {
      // If editing, update the existing entry
      const updatedData = storedData.map((document) =>
        document.id === parseInt(id) ? formData : document
      );
      localStorage.setItem('documents', JSON.stringify(updatedData));
    } else {
      // If adding, create a new entry
      const updatedData = [...storedData, formData];
      localStorage.setItem('documents', JSON.stringify(updatedData));
    }

    // Redirect to the Manage Documents page
    navigate('/admin/documents');
  };

  // Table columns
  const columns = [
    {
      name: 'Sl No',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'File Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'File Type',
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: 'Upload Date',
      selector: (row) => row.fileDocument,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          {/* View Button */}
          <Link to={`/admin/documents/view/${row.id}`}>
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
          <Link to={`/admin/documents/edit/${row.id}`}>
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
            onClick={() => handleDelete(row.id)}
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
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Documents</h1>
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
            to="/admin/documents/add"
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
          data={filteredDocuments}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
}

export default FileDocumentsAd;