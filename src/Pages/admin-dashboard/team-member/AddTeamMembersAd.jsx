import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa"; // Import icons
import {
  addTeamMember,
  getTeamMemberById,
  updateTeamMemberById,
} from "../../../api/pages-api/admin-dashboard-api/team-member-api/TeamMemberApi";
import { toast } from "react-toastify";

function AddTeamMembersAd() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      district: "",
      zipCode: "",
    },
    role: "",
    status: "Active",
    skills: [],
    company: {
      name: "",
      registrationNumber: "",
      email: "",
      phone: "",
      industry: "",
      website: "",
    },
  });

  // Fetch data from getTeamMemberById api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTeamMemberById(id);
        const data = response.teamMember;
        setFormData(data);
      } catch (error) {
        console.error("Error fetching team member:", error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          photo: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle skills array changes
  const handleSkillsChange = (index, field, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index][field] = value;
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  // Add a new skill to the skills array
  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [
        ...formData.skills,
        {
          skillName: "",
          proficiency: "beginner",
          yearsOfExperience: 0,
          certification: "",
        },
      ],
    });
  };

  // Remove a skill from the skills array
  const removeSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // If editing, update the existing team manager
        var response = await updateTeamMemberById(id, formData);
      } else {
        // If adding, create a new team manager
        var response = await addTeamMember(formData);
      }
      if (response?.success) {
        toast.success(response.message || "Team member saved successfully");
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to save team member");
      }
    } catch (error) {
      console.error("Error saving team members:", error);
      toast.error(error.message || "Failed to save team members");
    }
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        {id ? "Edit Team Member" : "Add Team Member"}
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {/* Grid Layout for Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name csacasc"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street"
              required
            />
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="City"
              required
            />
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="State"
              required
            />
            <input
              type="text"
              name="address.district"
              value={formData.address.district}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="District"
              required
            />
            <input
              type="text"
              name="address.zipCode"
              value={formData.address.zipCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="Zip Code"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter role"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills</h2>
          {formData.skills.map((skill, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="skillName"
                  value={skill.skillName}
                  onChange={(e) =>
                    handleSkillsChange(index, "skillName", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Skill Name"
                  required
                />
                <select
                  name="proficiency"
                  value={skill.proficiency}
                  onChange={(e) =>
                    handleSkillsChange(index, "proficiency", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={skill.yearsOfExperience}
                  onChange={(e) =>
                    handleSkillsChange(
                      index,
                      "yearsOfExperience",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Years of Experience"
                  required
                />
                <input
                  type="text"
                  name="certification"
                  value={skill.certification}
                  onChange={(e) =>
                    handleSkillsChange(index, "certification", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Certification"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="mt-2 text-red-600 hover:text-red-800"
              >
                Remove Skill
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSkill}
            className="mt-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-lg">+</span> Add Skill
          </button>
        </div>

        {/* Company Information */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Information
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="company.name"
              value={formData.company.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company Name"
              required
            />
            <input
              type="text"
              name="company.registrationNumber"
              value={formData.company.registrationNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Registration Number"
              required
            />
            <input
              type="email"
              name="company.email"
              value={formData.company.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company Email"
              required
            />
            <input
              type="tel"
              name="company.phone"
              value={formData.company.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company Phone"
              required
            />
            <input
              type="text"
              name="company.industry"
              value={formData.company.industry}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Industry"
              required
            />
            <input
              type="text"
              name="company.website"
              value={formData.company.website}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Website"
              required
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTeamMembersAd;
