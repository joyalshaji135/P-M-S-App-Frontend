import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteTeamMemberById, getAllTeamMembers } from '../../../api/pages-api/company-owner-api/team-member-api/COTeamMemberApi';

function TeamMembersOwner() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('');

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

  const filteredData = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          member.email.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || 
                          (selectedStatus === 'active' && member.status === 'true') || 
                          (selectedStatus === 'inactive' && member.status === 'false');
    
    const matchesSkill = selectedSkill === '' || 
                         member.skills.some(skill => 
                           skill.skillName.toLowerCase().includes(selectedSkill.toLowerCase())
                         );
    
    return matchesSearch && matchesStatus && matchesSkill;
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this team member?");
    if (!confirmDelete) return;

    try {
      await deleteTeamMemberById(id);
      setTeamMembers(prev => prev.filter(member => member._id !== id));
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto" style={{ zIndex: 1 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Team Members</h1>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md"
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <input
          type="text"
          placeholder="Filter by skill..."
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md"
        />
        <Link
          to="/owner/team-members/add"
          className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-black whitespace-nowrap"
        >
          Add +
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((member) => (
          <div key={member._id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-800">{member.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                member.status === 'true' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {member.status === 'true' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{member.email}</p>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {skill.skillName}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 border-t pt-3">
              <Link 
                to={`/owner/team-members/view/${member._id}`}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
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
                View
              </Link>
              <Link
                to={`/owner/team-members/edit/${member._id}`}
                className="text-yellow-600 hover:text-yellow-800 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit
              </Link>
              <button
                onClick={() => handleDelete(member._id)}
                className="text-red-600 hover:text-red-800 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No team members found matching your criteria
        </div>
      )}
    </div>
  );
}

export default TeamMembersOwner;