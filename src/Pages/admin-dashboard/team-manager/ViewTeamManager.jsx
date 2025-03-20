import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamManagerById } from '../../../api/pages-api/admin-dashboard-api/team-manager-api/TeamManagerApi';

function ViewTeamManager() {
  const { id } = useParams(); // Get the id from the URL
  const [manager, setManager] = useState(null);

  // Fetch data from getTeamManagerById
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeamManagerById(id);
        setManager(data.teamManager);
      } catch (error) {
        console.error('Error fetching company owner:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!manager) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Team Manager</h1>
  
      {/* Main Card */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        {/* Basic Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Photo and Name */}
            <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900">{manager.name}</p>
            </div>
  
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{manager.email}</p>
            </div>
  
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <p className="text-gray-900">{manager.phone}</p>
            </div>
  
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <p className="text-gray-900">{manager.role}</p>
            </div>
  
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <p className="text-gray-900">{manager.status ? 'Active' : 'Inactive'}</p>
            </div>
          </div>
        </div>
  
        {/* Personal Details Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <p className="text-gray-900">{new Date(manager.dateOfBirth).toLocaleDateString()}</p>
            </div>
  
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <p className="text-gray-900">{manager.gender}</p>
            </div>
  
            {/* Profile Picture URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
              <p className="text-gray-900">{manager.profilePicture}</p>
            </div>
  
            {/* Last Login */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
              <p className="text-gray-900">{new Date(manager.lastLogin).toLocaleString()}</p>
            </div>
          </div>
        </div>
  
        {/* Preferences Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Newsletter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Newsletter</label>
              <p className="text-gray-900">{manager.preferences.newsletter ? 'Subscribed' : 'Not Subscribed'}</p>
            </div>
  
            {/* Notifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notifications</label>
              <p className="text-gray-900">{manager.preferences.notifications ? 'Enabled' : 'Disabled'}</p>
            </div>
          </div>
        </div>
  
        {/* Address Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Street */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
              <p className="text-gray-900">{manager.address.street}</p>
            </div>
  
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <p className="text-gray-900">{manager.address.city}</p>
            </div>
  
            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <p className="text-gray-900">{manager.address.state}</p>
            </div>
  
            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
              <p className="text-gray-900">{manager.address.district}</p>
            </div>
  
            {/* Zip Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
              <p className="text-gray-900">{manager.address.zipCode}</p>
            </div>
          </div>
        </div>
  
        {/* Company Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Company</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <p className="text-gray-900">{manager.company.name}</p>
            </div>
  
            {/* Registration Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
              <p className="text-gray-900">{manager.company.registrationNumber}</p>
            </div>
  
            {/* Company Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
              <p className="text-gray-900">{manager.company.email}</p>
            </div>
  
            {/* Company Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Phone</label>
              <p className="text-gray-900">{manager.company.phone}</p>
            </div>
  
            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <p className="text-gray-900">{manager.company.industry}</p>
            </div>
  
            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <p className="text-gray-900">{manager.company.website}</p>
            </div>
  
            {/* Company Address */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Company Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Street */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                  <p className="text-gray-900">{manager.company.address.street}</p>
                </div>
  
                {/* Company City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <p className="text-gray-900">{manager.company.address.city}</p>
                </div>
  
                {/* Company State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <p className="text-gray-900">{manager.company.address.state}</p>
                </div>
  
                {/* Company District */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <p className="text-gray-900">{manager.company.address.district}</p>
                </div>
  
                {/* Company Zip Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  <p className="text-gray-900">{manager.company.address.zipCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Skills Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {manager.skills.map((skill, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  {/* Skill Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                    <p className="text-gray-900">{skill.skillName}</p>
                  </div>
  
                  {/* Proficiency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency</label>
                    <p className="text-gray-900">{skill.proficiency}</p>
                  </div>
  
                  {/* Years of Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <p className="text-gray-900">{skill.yearsOfExperience}</p>
                  </div>
  
                  {/* Certification */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certification</label>
                    <p className="text-gray-900">{skill.certification || 'N/A'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
 
}

export default ViewTeamManager;