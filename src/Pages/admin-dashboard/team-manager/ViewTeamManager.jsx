import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamManagerById } from "../../../api/pages-api/admin-dashboard-api/team-manager-api/TeamManagerApi";
import { motion } from "framer-motion";

function ViewTeamManager() {
  const { id } = useParams();
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTeamManagerById(id);
        setManager(data.teamManager);
      } catch (error) {
        console.error("Error fetching team manager:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!manager) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-600">
        Failed to load team manager data
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
        duration: 0.3
      }
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-2xl font-bold text-blue-800">Team Manager Details</h1>
          <p className="text-blue-600 mt-1">Viewing details for {manager.name}</p>
        </motion.div>

        {/* Main Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* Basic Information Section */}
          <motion.div 
            variants={itemVariants}
            className="p-6 border-b border-blue-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-500 text-2xl">👤</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-blue-800">{manager.name}</h2>
                  <p className="text-blue-600">{manager.email}</p>
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      manager.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {manager.status ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <DetailItem label="Phone" value={manager.phone} />
              <DetailItem label="Role" value={manager.role} />
              <DetailItem 
                label="Date of Birth" 
                value={new Date(manager.dateOfBirth).toLocaleDateString()} 
              />
              <DetailItem label="Gender" value={manager.gender} />
              <DetailItem 
                label="Last Login" 
                value={new Date(manager.lastLogin).toLocaleString()} 
              />
            </div>
          </motion.div>

          {/* Preferences Section */}
          <motion.div 
            variants={itemVariants}
            className="p-6 border-b border-blue-100"
          >
            <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Preferences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem 
                label="Newsletter" 
                value={manager.preferences.newsletter ? "Subscribed" : "Not Subscribed"} 
                badgeColor={manager.preferences.newsletter ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}
              />
              <DetailItem 
                label="Notifications" 
                value={manager.preferences.notifications ? "Enabled" : "Disabled"} 
                badgeColor={manager.preferences.notifications ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}
              />
            </div>
          </motion.div>

          {/* Address Section */}
          <motion.div 
            variants={itemVariants}
            className="p-6 border-b border-blue-100"
          >
            <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Street" value={manager.address.street} />
              <DetailItem label="City" value={manager.address.city} />
              <DetailItem label="State" value={manager.address.state} />
              <DetailItem label="District" value={manager.address.district} />
              <DetailItem label="ZIP Code" value={manager.address.zipCode} />
            </div>
          </motion.div>

          {/* Company Section */}
          <motion.div 
            variants={itemVariants}
            className="p-6 border-b border-blue-100"
          >
            <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Company Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Company Name" value={manager.company.name} />
              <DetailItem label="Registration Number" value={manager.company.registrationNumber} />
              <DetailItem label="Company Email" value={manager.company.email} />
              <DetailItem label="Company Phone" value={manager.company.phone} />
              <DetailItem label="Industry" value={manager.company.industry} />
              <DetailItem 
                label="Website" 
                value={
                  <a href={manager.company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {manager.company.website}
                  </a>
                } 
              />
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div 
            variants={itemVariants}
            className="p-6"
          >
            <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Skills
            </h2>
            
            {manager.skills.length === 0 ? (
              <p className="text-blue-500 text-center py-4">No skills added</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {manager.skills.map((skill, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="bg-blue-50 p-4 rounded-lg border border-blue-100"
                  >
                    <div className="space-y-3">
                      <DetailItem label="Skill Name" value={skill.skillName} />
                      <DetailItem label="Proficiency" value={skill.proficiency} />
                      <DetailItem label="Years of Experience" value={skill.yearsOfExperience} />
                      <DetailItem label="Certification" value={skill.certification || "N/A"} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Reusable detail item component
const DetailItem = ({ label, value, badgeColor }) => (
  <div>
    <h3 className="text-sm font-medium text-blue-700">{label}</h3>
    {badgeColor ? (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeColor}`}>
        {value}
      </span>
    ) : (
      <p className="text-gray-800 mt-1">{value}</p>
    )}
  </div>
);

export default ViewTeamManager;