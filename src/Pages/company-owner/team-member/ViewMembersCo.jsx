import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamMemberById } from "../../../api/pages-api/company-owner-api/team-member-api/COTeamMemberApi";

function ViewMembersCo() {
  const { id } = useParams(); // Get the id from the URL
  const [member, setMember] = useState(null);

  // Fetch data from getTeamMemberById api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTeamMemberById(id);
        const data = response.teamMember;
        setMember(data);
      } catch (error) {
        console.error("Error fetching team member:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!member) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        View Team Member
      </h1>

      {/* Main Card */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo and Name */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-xl">👤</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <p className="text-gray-900 font-medium">{member?.name}</p>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-gray-900">{member?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Of Birth
            </label>
            <p className="text-gray-900">
              {member.dateOfBirth
                ? new Date(member?.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <p className="text-gray-900">{member?.phone}</p>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <p className="text-gray-900">
              {member?.address?.street}, {member?.address?.city},{" "}
              {member?.address?.state}, {member?.address?.district},{" "}
              {member?.address?.zipCode}
            </p>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <p className="text-gray-900">{member?.role}</p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <p
              className={`text-gray-900 ${
                member?.status === "Active" ? "text-green-600" : "text-red-600"
              }`}
            >
              {member?.status}
            </p>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <p className="text-gray-900">{member?.description}</p>
          </div>

          {/* Skills */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {member.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="space-y-2">
                    <p className="text-gray-900">
                      <strong>Skill Name:</strong> {skill?.skillName || "N/A"}
                    </p>
                    <p className="text-gray-900">
                      <strong>Proficiency:</strong>{" "}
                      {skill?.proficiency || "N/A"}
                    </p>
                    <p className="text-gray-900">
                      <strong>Years of Experience:</strong>{" "}
                      {skill?.yearsOfExperience || "N/A"}
                    </p>
                    <p className="text-gray-900">
                      <strong>Certification:</strong>{" "}
                      {skill?.certification || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Information */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Information
            </label>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-900">
                    <strong>Name:</strong> {member.company.name}
                  </p>
                  <p className="text-gray-900">
                    <strong>Registration Number:</strong>{" "}
                    {member.company.registrationNumber}
                  </p>
                  <p className="text-gray-900">
                    <strong>Email:</strong> {member.company.email}
                  </p>
                  <p className="text-gray-900">
                    <strong>Phone:</strong> {member.company.phone}
                  </p>
                </div>
                <div>
                  <p className="text-gray-900">
                    <strong>Industry:</strong> {member.company.industry}
                  </p>
                  <p className="text-gray-900">
                    <strong>Website:</strong> {member.company.website}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMembersCo;
