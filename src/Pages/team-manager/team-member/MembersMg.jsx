import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { deleteTeamMemberById, getAllTeamMembers } from '../../../api/pages-api/team-manager-api/team-member-api/TMTeamMemberApi';


function MembersMg() {
  // State for team members data
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchText, setSearchText] = useState('');

  
  // Fetch data from getAllTeamMembers api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTeamMembers();
        setTeamMembers(data.teamMembers);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };
    fetchData();
  }, []);
  

  // Filter data based on search input
  const filteredData = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchText.toLowerCase()) ||
      member.description.toLowerCase().includes(searchText.toLowerCase())
  );

 // Function to delete a team member
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are Sure ..."
    )
    if(!confirmDelete)
      return

    // Delete the team member Api
    try {
      const response = await deleteTeamMemberById(id)
      if (response.success)
      {
        const updatedMembers = teamMembers.filter((member) => member._id !== id);
        setTeamMembers(updatedMembers);
      }
      const updatedMembers = teamMembers.filter((member) => member._id !== id);
      setTeamMembers(updatedMembers);
    }
    catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  // Columns definition
  const columns = [
    {
      name: 'Name',
      sortable: true,
      cell: (row) => (
        <div className="flex items-center space-x-4">
          <div>
            <p className="font-medium text-black text-sm">{row.name}</p>
          </div>
        </div>
      ),
    },
    {
      name: 'email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold border ${
            row.status === 'Active'
              ? 'border-green-800 bg-green-100 text-green-800'
              : 'border-red-800 bg-red-100 text-red-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          {/* View Button */}
          <Link to={`/team-manager/team-members/view/${row._id}`}>
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
          <Link to={`/team-manager/team-members/edit/${row._id}`}>
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
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Custom styles for the table
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#F5F5F5',
        color: '#333',
        fontWeight: 'bold',
        fontSize: '14px',
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
    cells: {
      style: {
        padding: '0.8rem 0.4rem',
        border: '1px solid #e53e7eb',
      },
    },
    rows: {
      style: {
        borderBottom: '1px solid #e5e7eb',
      },
    },
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto" style={{ zIndex: 1 }}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Team Members</h1>
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
            to="/team-manager/team-members/add"
            className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-black"
          >
            Add +
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
}

export default MembersMg;