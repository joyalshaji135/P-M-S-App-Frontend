import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewMembersCo() {
  const { id } = useParams(); // Get the id from the URL
  const [member, setMember] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('teamMembers')) || [];
    const memberToView = storedData.find((member) => member.id === parseInt(id));
    if (memberToView) {
      setMember(memberToView);
    }
  }, [id]);

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Member</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo and Name */}
          <div className="flex items-center space-x-4">
            <img
              src={member.photo || 'https://via.placeholder.com/50'}
              alt={member.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <span className="text-xl font-medium">{member.name}</span>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-gray-900">{member.description}</p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <p className="text-gray-900">{member.status}</p>
          </div>

          {/* Additional Fields (if any) */}
          {/* Example: Email */}
          {member.email && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{member.email}</p>
            </div>
          )}

          {/* Example: Phone */}
          {member.phone && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <p className="text-gray-900">{member.phone}</p>
            </div>
          )}

          {/* Example: Address */}
          {member.address && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <p className="text-gray-900">{member.address}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewMembersCo;