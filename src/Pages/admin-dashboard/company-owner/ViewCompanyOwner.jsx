import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanyOwnerById } from '../../../api/pages-api/admin-dashboard-api/company-owner-api/CompanyOwnerApi';

function ViewCompanyOwner() {
  const { id } = useParams(); // Get the id from the URL
  const [owner, setOwner] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyOwnerById(id);
        setOwner(data.companyOwner);
      } catch (error) {
        console.error('Error fetching company owner:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!owner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Company Owner</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo and Name */}
          <div className="flex items-center space-x-4">
            <span className="text-xl font-medium">{owner.name}</span>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <p className="text-gray-900">{owner.role}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">{owner.email}</p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <p className="text-gray-900">{owner.phone}</p>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <p className="text-gray-900">{owner.dateOfBirth}</p>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <p className="text-gray-900">{owner.gender}</p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <p className="text-gray-900">{owner.status ? 'Active' : 'Not Active'}</p>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <p className="text-gray-900">
              {owner.address.street}, <br /> {owner.address.city}, <br /> {owner.address.state}, <br /> {owner.address.district}, <br /> {owner.address.zipCode}
            </p>
          </div>

          {/* Preferences */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferences</label>
            <div className="space-y-1">
              <p className="text-gray-900">
                Newsletter: {owner.preferences.newsletter ? 'Subscribed' : 'Not Subscribed'}
              </p>
              <p className="text-gray-900">
                Notifications: {owner.preferences.notifications ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>

          {/* Company Details */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Details</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Company Name</label>
                <p className="text-gray-900">{owner.company.name}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Registration Number</label>
                <p className="text-gray-900">{owner.company.registrationNumber}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Website</label>
                <p className="text-gray-900">{owner.company.website}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Company Email</label>
                <p className="text-gray-900">{owner.company.email}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Company Phone</label>
                <p className="text-gray-900">{owner.company.phone}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Industry</label>
                <p className="text-gray-900">{owner.company.industry}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCompanyOwner;