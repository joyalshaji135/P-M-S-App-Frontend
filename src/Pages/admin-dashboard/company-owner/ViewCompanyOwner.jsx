import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanyOwnerById } from '../../../api/pages-api/admin-dashboard-api/company-owner-api/CompanyOwnerApi';
import { motion } from 'framer-motion';

function ViewCompanyOwner() {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getCompanyOwnerById(id);
        setOwner(data.companyOwner);
      } catch (error) {
        console.error('Error fetching company owner:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!owner) {
    return (
      <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Company Owner not found</h2>
          <p className="text-gray-600 mt-2">The requested company owner could not be loaded.</p>
        </div>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Company Owner Details</h1>
          <p className="text-gray-600 mt-2">Viewing details for {owner.name}</p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Full Name" value={owner.name} />
                <DetailItem label="Email" value={owner.email} />
                <DetailItem label="Phone" value={owner.phone} />
                <DetailItem label="Role" value={owner.role} />
                <DetailItem 
                  label="Date of Birth" 
                  value={new Date(owner.dateOfBirth).toLocaleDateString("en-GB")} 
                />
                <DetailItem label="Gender" value={owner.gender} />
              </div>
            </div>
          </motion.div>

          {/* Status & Preferences Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="bg-green-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Status & Preferences
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem 
                  label="Status" 
                  value={
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      owner.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {owner.status ? "Active" : "Inactive"}
                    </span>
                  } 
                />
                <DetailItem 
                  label="Newsletter" 
                  value={
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      owner.preferences.newsletter ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {owner.preferences.newsletter ? "Subscribed" : "Not Subscribed"}
                    </span>
                  } 
                />
                <DetailItem 
                  label="Notifications" 
                  value={
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      owner.preferences.notifications ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {owner.preferences.notifications ? "Enabled" : "Disabled"}
                    </span>
                  } 
                />
              </div>
            </div>
          </motion.div>

          {/* Address Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="bg-indigo-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Address Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Street" value={owner.address.street} />
                <DetailItem label="City" value={owner.address.city} />
                <DetailItem label="State" value={owner.address.state} />
                <DetailItem label="District" value={owner.address.district} />
                <DetailItem label="ZIP Code" value={owner.address.zipCode} />
              </div>
            </div>
          </motion.div>

          {/* Company Details Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="bg-purple-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Company Details
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Company Name" value={owner.company.name} />
                <DetailItem label="Registration Number" value={owner.company.registrationNumber} />
                <DetailItem label="Website" value={
                  <a href={owner.company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {owner.company.website}
                  </a>
                } />
                <DetailItem label="Company Email" value={owner.company.email} />
                <DetailItem label="Company Phone" value={owner.company.phone} />
                <DetailItem label="Industry" value={owner.company.industry} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Reusable detail item component
const DetailItem = ({ label, value }) => (
  <div className="mb-2">
    <h3 className="text-sm font-medium text-gray-500">{label}</h3>
    <p className="mt-1 text-sm text-gray-900">
      {value || <span className="text-gray-400">Not specified</span>}
    </p>
  </div>
);

export default ViewCompanyOwner;