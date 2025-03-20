import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { getAllTeamMembers } from '../../../api/admin/team-member/TeamMembersApi'; // Adjust the import path
import { GrOverview } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

function MembersMg() {
  const [members, setMembers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTeamMembers();

        if (!response || !response.success || !Array.isArray(response.teamMembers)) {
          throw new Error('Invalid API response or missing teamMembers array');
        }
        setMembers(response.teamMembers);
        setFilteredMembers(response.teamMembers);
        toast.success(response.message || 'Data fetched successfully');
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchText) {
      const filtered = members.filter(
        (member) =>
          (member.name && member.name.toLowerCase().includes(searchText.toLowerCase())) ||
          (member.email && member.email.toLowerCase().includes(searchText.toLowerCase()))
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(members);
    }
  }, [searchText, members]);

  // Handle delete functionality
  const handleDelete = (_id) => {
    const updatedMembers = members.filter((member) => member._id !== _id);
    setMembers(updatedMembers);
    setFilteredMembers(updatedMembers);
  };

  // Table columns
  const columns = [
    {
      name: 'Sl No',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name || 'N/A',
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email || 'N/A',
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.status || 'Unknown'}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          {/* View Button */}
          <Link to={`/team-manager/team-members/view/${row._id}`}> {/* Use _id instead of id */}
            <button className="text-blue-600 hover:text-blue-900">
              {/* View Icon */}
              <GrOverview />
            </button>
          </Link>

          {/* Delete Button */}
          <button
            className="text-red-600 hover:text-red-900"
            onClick={() => handleDelete(row._id)} 
          >
            {/* Delete Icon */}
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Members Management</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link
            to="/team-manager/team-members/add"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Add +
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredMembers || []}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
}

export default MembersMg;