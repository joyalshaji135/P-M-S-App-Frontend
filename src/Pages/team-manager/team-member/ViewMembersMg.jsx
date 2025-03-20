import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewMembersMg() {
  const { id } = useParams(); // Get the id from the URL
  const [member, setMember] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('membersMg')) || [];
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

      <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
        {/* Personal Information Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Photo and Name */}
            <div className="flex items-center space-x-4">
              <img
                src={member.profilePicture || 'https://via.placeholder.com/100'}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <span className="text-xl font-medium">{member.name}</span>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{member.email}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <p className="text-gray-900">{member.phone}</p>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <p className="text-gray-900">{member.dateOfBirth}</p>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <p className="text-gray-900">{member.gender}</p>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Newsletter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Newsletter</label>
              <p className="text-gray-900">{member.newsletter ? 'Subscribed' : 'Not Subscribed'}</p>
            </div>

            {/* Notifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notifications</label>
              <p className="text-gray-900">{member.notifications ? 'Enabled' : 'Disabled'}</p>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Street */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
              <p className="text-gray-900">{member.street}</p>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <p className="text-gray-900">{member.city}</p>
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <p className="text-gray-900">{member.state}</p>
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
              <p className="text-gray-900">{member.zipCode}</p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {member.skills.map((skill, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800">{skill.skillName}</h3>
                <p className="text-sm text-gray-600">Proficiency: {skill.proficiency}</p>
                <p className="text-sm text-gray-600">Experience: {skill.yearsOfExperience} years</p>
                {skill.certification && (
                  <p className="text-sm text-gray-600">Certification: {skill.certification}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Company Information Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <p className="text-gray-900">{member.companyName}</p>
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
              <p className="text-gray-900">{member.registrationNumber}</p>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <p className="text-gray-900">{member.industry}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMembersMg;