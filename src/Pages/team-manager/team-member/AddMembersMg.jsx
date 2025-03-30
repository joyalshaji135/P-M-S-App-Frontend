import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTeamMembers } from "../../../api/admin/team-member/TeamMembersApi";
import { toast } from "react-toastify";

function AddMembersMg() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State for form data
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    email: "",
    phone: "",
    role: "team-members",
    password: "",
    confirmPassword: "",
    isDefault: false,
    dateOfBirth: "",
    gender: "male",
    profilePicture: "",
    lastLogin: "",
    newsletter: true,
    notifications: true,
    street: "",
    city: "",
    state: "",
    district: "",
    zipCode: "",
    skills: [
      {
        skillName: "",
        proficiency: "",
        yearsOfExperience: "",
        certification: "",
      },
    ],
    companyName: "",
    registrationNumber: "",
    companyEmail: "",
    companyPhone: "",
    industry: "",
    website: "",
    companyStreet: "",
    companyCity: "",
    companyState: "",
    companyDistrict: "",
    companyZipCode: "",
  });

  // Fetch data from local storage on component mount
  useEffect(() => {
    if (id) {
      const storedData = JSON.parse(localStorage.getItem("membersMg")) || [];
      const memberToEdit = storedData.find(
        (member) => member.id === parseInt(id)
      );
      if (memberToEdit) {
        setFormData(memberToEdit);
      }
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle skills input changes
  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  // Add a new skill field
  const addSkillField = () => {
    setFormData({
      ...formData,
      skills: [
        ...formData.skills,
        {
          skillName: "",
          proficiency: "beginner",
          yearsOfExperience: "",
          certification: "",
        }, // Set default proficiency
      ],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSkills = formData.skills.map((skill) => ({
      ...skill,
      proficiency: skill.proficiency || "beginner", // Set default if empty
    }));

    setFormData({
      ...formData,
      skills: updatedSkills,
    });

    const data = {
      ...formData,
      skills: updatedSkills, // Use the updated skills
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        district: formData.district,
        zipCode: formData.zipCode,
      },
      company: {
        name: formData.companyName,
        registrationNumber: formData.registrationNumber,
        email: formData.companyEmail,
        phone: formData.companyPhone,
        industry: formData.industry,
        website: formData.website,
        address: {
          street: formData.companyStreet,
          city: formData.companyCity,
          state: formData.companyState,
          district: formData.companyDistrict,
          zipCode: formData.companyZipCode,
        },
      },
      preferences: {
        newsletter: formData.newsletter,
        notifications: formData.notifications,
      },
    };

    try {
      const response = await createTeamMembers(data);
      toast.success("Team member created successfully");
      navigate("/team-manager/team-members");
    } catch (error) {
      console.error("Error creating/updating team member:", error);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 ">
        {id ? "Edit Member" : "Add Member"}
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg  space-y-8"
      >
        {/* Team Member Information Section */}
        <div className="space-y-6">
          {/* <h2 className="text-xl font-semibold text-gray-800">Team Member Information</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone*
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role*
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="admin">Admin</option>
                <option value="company-owners">Company Owners</option>
                <option value="team-managers">Team Managers</option>
                <option value="team-members">Team Members</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password*
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password*
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm password"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                // required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Profile Picture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture URL
              </label>
              <input
                type="url"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter URL"
              />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Newsletter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Receive Newsletter
              </label>
              <select
                name="newsletter"
                value={formData.newsletter}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                // required
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            {/* Notifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Receive Notifications
              </label>
              <select
                name="notifications"
                value={formData.notifications}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                // required
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Street */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street*
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter street"
                required
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City*
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city"
                required
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State*
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter state"
                required
              />
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District*
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter district"
                required
              />
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code*
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter zip code"
                required
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
          {formData.skills.map((skill, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Skill Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  name="skillName"
                  value={skill.skillName}
                  onChange={(e) => handleSkillChange(index, e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter skill name"
                  // required
                />
              </div>

              {/* Proficiency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proficiency
                </label>
                <select
                  name="proficiency"
                  value={skill.proficiency}
                  onChange={(e) => handleSkillChange(index, e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  // required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={skill.yearsOfExperience}
                  onChange={(e) => handleSkillChange(index, e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter years"
                  // required
                />
              </div>

              {/* Certification */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certification
                </label>
                <input
                  type="text"
                  name="certification"
                  value={skill.certification}
                  onChange={(e) => handleSkillChange(index, e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter certification"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSkillField}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Skill
          </button>
        </div>

        {/* Company Information Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Company Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
                // required
              />
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter registration number"
                // required
              />
            </div>

            {/* Company Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Email
              </label>
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company email"
                // required
              />
            </div>

            {/* Company Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Phone
              </label>
              <input
                type="text"
                name="companyPhone"
                value={formData.companyPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company phone"
                // required
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter industry"
                // required
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter website URL"
              />
            </div>
          </div>
        </div>

        {/* Company Address Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Company Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Company Street */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street
              </label>
              <input
                type="text"
                name="companyStreet"
                value={formData.companyStreet}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter street"
                // required
              />
            </div>

            {/* Company City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="companyCity"
                value={formData.companyCity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city"
                // required
              />
            </div>

            {/* Company State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                name="companyState"
                value={formData.companyState}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter state"
                // required
              />
            </div>

            {/* Company District */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <input
                type="text"
                name="companyDistrict"
                value={formData.companyDistrict}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter district"
                // required
              />
            </div>

            {/* Company Zip Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code
              </label>
              <input
                type="text"
                name="companyZipCode"
                value={formData.companyZipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter zip code"
                // required
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMembersMg;
