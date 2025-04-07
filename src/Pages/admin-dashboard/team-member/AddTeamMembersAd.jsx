import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrash, FaUser, FaBuilding, FaCode, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  addTeamMember,
  getTeamMemberById,
  updateTeamMemberById,
} from "../../../api/pages-api/admin-dashboard-api/team-member-api/TeamMemberApi";
import { toast } from "react-toastify";

function AddTeamMembersAd() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: {
      street: "",
      city: "",
      state: "",
      district: "",
      zipCode: "",
    },
    role: "",
    status: "Active",
    description: "",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTeamMemberById(id);
        setFormData(response.teamMember);
      } catch (error) {
        console.error("Error fetching team member:", error);
        toast.error("Failed to load team member data");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillsChange = (index, field, value) => {
    setFormData(prev => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = { ...updatedSkills[index], [field]: value };
      return { ...prev, skills: updatedSkills };
    });
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        { skillName: "", proficiency: "Beginner", yearsOfExperience: "", certification: "" }
      ]
    }));
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = id 
        ? await updateTeamMemberById(id, formData)
        : await addTeamMember(formData);
      
      if (response?.success) {
        toast.success(response.message || "Team member saved successfully");
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to save team member");
      }
    } catch (error) {
      console.error("Error saving team member:", error);
      toast.error(error.message || "Failed to save team member");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && id) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center mb-6"
      >
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {id ? "Edit Team Member" : "Add New Team Member"}
          </h1>
          <p className="text-gray-600 mt-1">
            {id ? "Update team member details" : "Fill in the details to add a new team member"}
          </p>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-200"
        >
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 mr-4">
              <FaUser className="text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Full Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Phone*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Role*</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Software Engineer"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Status*</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description about the team member"
                rows="3"
              />
            </div>
          </div>
        </motion.div>

        {/* Address Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Address Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Street*</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123 Main St"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">City*</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="New York"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">State*</label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="NY"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">District*</label>
              <input
                type="text"
                name="address.district"
                value={formData.address.district}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Manhattan"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Zip Code*</label>
              <input
                type="text"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10001"
                required
              />
            </div>
          </div>
        </motion.div>

        {/* Skills Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-200"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-600 mr-4">
                <FaCode className="text-xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Skills & Expertise</h2>
            </div>
            <button
              type="button"
              onClick={addSkill}
              className="flex items-center justify-center md:justify-start px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Skill
            </button>
          </div>

          {formData.skills.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl">
              No skills added yet. Click "Add Skill" to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {formData.skills.map((skill, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Skill Name*</label>
                      <input
                        type="text"
                        value={skill.skillName}
                        onChange={(e) => handleSkillsChange(index, "skillName", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="JavaScript"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Proficiency*</label>
                      <select
                        value={skill.proficiency}
                        onChange={(e) => handleSkillsChange(index, "proficiency", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                      <input
                        type="number"
                        value={skill.yearsOfExperience}
                        onChange={(e) => handleSkillsChange(index, "yearsOfExperience", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="3"
                        min="0"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Certification</label>
                      <input
                        type="text"
                        value={skill.certification}
                        onChange={(e) => handleSkillsChange(index, "certification", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="AWS Certified"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-3">
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="flex items-center text-red-600 hover:text-red-800 text-sm"
                    >
                      <FaTrash className="mr-1" />
                      Remove Skill
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Company Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-200"
        >
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-xl bg-green-100 text-green-600 mr-4">
              <FaBuilding className="text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Company Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Company Name*</label>
              <input
                type="text"
                name="company.name"
                value={formData.company.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Acme Inc."
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Registration Number*</label>
              <input
                type="text"
                name="company.registrationNumber"
                value={formData.company.registrationNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123456789"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Company Email*</label>
              <input
                type="email"
                name="company.email"
                value={formData.company.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="contact@company.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Company Phone*</label>
              <input
                type="tel"
                name="company.phone"
                value={formData.company.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 987-6543"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Industry*</label>
              <input
                type="text"
                name="company.industry"
                value={formData.company.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Technology"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Website*</label>
              <input
                type="url"
                name="company.website"
                value={formData.company.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://company.com"
                required
              />
            </div>
          </div>
        </motion.div>

        {/* Form Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col-reverse md:flex-row justify-end gap-4"
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {id ? 'Updating...' : 'Saving...'}
              </>
            ) : (
              <>{id ? 'Update Member' : 'Save Member'}</>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
}

export default AddTeamMembersAd;