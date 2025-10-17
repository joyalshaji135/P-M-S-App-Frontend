import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamMemberById } from "../../../api/pages-api/admin-dashboard-api/team-member-api/TeamMemberApi";
import { motion } from "framer-motion";

function ViewTeamMembersAd() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTeamMemberById(id);
        setMember(response.teamMember);
      } catch (error) {
        console.error("Error fetching team member:", error);
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

  if (!member) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Team member not found
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">Member Profile</h1>
        <p className="text-gray-600 mt-2">View and manage team member details</p>
      </motion.div>

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-3xl font-bold text-blue-600">
            {member.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{member.name}</h2>
                <p className="text-blue-600">{member.role}</p>
              </div>
              
              <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                member.status === "Active" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {member.status}
              </span>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800 font-medium">{member.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800 font-medium">{member.phone || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-gray-800 font-medium">
                  {member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 lg:col-span-1"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Personal Details
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-800">
                {member.address?.street || "N/A"}, {member.address?.city || "N/A"},<br />
                {member.address?.state || "N/A"}, {member.address?.district || "N/A"},<br />
                {member.address?.zipCode || "N/A"}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="text-gray-800">
                {member.description || "No description provided"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skills Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Skills & Expertise
          </h3>
          
          {member.skills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {member.skills.map((skill, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-medium text-gray-800 mb-2">{skill.skillName || "Unnamed Skill"}</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <span className="text-gray-500">Proficiency:</span> {skill.proficiency || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <span className="text-gray-500">Experience:</span> {skill.yearsOfExperience || "N/A"} years
                    </p>
                    <p className="text-gray-700">
                      <span className="text-gray-500">Certification:</span> {skill.certification || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills listed</p>
          )}
        </motion.div>

        {/* Company Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 lg:col-span-3"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Company Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Company Name</p>
              <p className="text-gray-800 font-medium">{member.company.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Registration Number</p>
              <p className="text-gray-800 font-medium">{member.company.registrationNumber}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Industry</p>
              <p className="text-gray-800 font-medium">{member.company.industry}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800 font-medium">{member.company.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-800 font-medium">{member.company.phone}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Website</p>
              <p className="text-gray-800 font-medium">
                {member.company.website ? (
                  <a href={member.company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {member.company.website}
                  </a>
                ) : "N/A"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ViewTeamMembersAd;