import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addTeamManager,
  getTeamManagerById,
  updateTeamManagerById,
} from "../../../api/pages-api/admin-dashboard-api/team-manager-api/TeamManagerApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function AddTeamManager() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "true",
    role: "team-managers",
    dateOfBirth: "",
    gender: "male",
    preferences: {
      newsletter: false,
      notifications: false,
    },
    address: {
      street: "",
      city: "",
      state: "",
      district: "",
      zipCode: "",
    },
    skills: [],
    company: {
      name: "TechNova Solutions Pvt. Ltd.",
      registrationNumber: "TNPL123456",
      website: "https://www.technova.com",
      email: "info@technova.com",
      phone: "+1-800-555-7890",
      industry: "Information Technology",
    },
  });

  // Fetch data
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await getTeamManagerById(id);
          setFormData(data.teamManager);
        } catch (error) {
          console.error("Error fetching team manager:", error);
          toast.error("Failed to load team manager data");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const actualValue = type === "checkbox" ? checked : value;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: actualValue,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: actualValue,
      }));
    }
  };

  // Handle skills changes
  const handleSkillsChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = { ...updatedSkills[index], [field]: value };
      return { ...prev, skills: updatedSkills };
    });
  };

  // Add/remove skills
  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          skillName: "",
          proficiency: "beginner",
          yearsOfExperience: 0,
          certification: "",
        },
      ],
    }));
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = id
        ? await updateTeamManagerById(id, formData)
        : await addTeamManager(formData);

      if (response?.success) {
        toast.success(response.message || "Team Manager saved successfully");
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to save team manager");
      }
    } catch (error) {
      console.error("Error saving team manager:", error);
      toast.error(error.message || "Failed to save team manager");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-2xl font-bold text-blue-800 mb-2">
          {id ? "Edit Team Manager" : "Add New Team Manager"}
        </h1>
        <p className="text-blue-600 mb-6">
          {id
            ? "Update the team manager details"
            : "Fill in the details to add a new team manager"}
        </p>

        {loading && !id ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            {/* Personal Information Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8 p-6 bg-blue-50 rounded-lg"
            >
              <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth?.split("T")[0] || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-blue-800 mb-1">Last Login</label>
                  <input
                    type="date"
                    name="lastLogin"
                    value={formData.lastLogin?.split("T")[0] || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-1">
                    Preferences
                  </label>
                  <div className="space-y-2 mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="preferences.newsletter"
                        checked={formData.preferences.newsletter}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                      />
                      <span className="ml-2 text-sm text-blue-800">
                        Newsletter
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="preferences.notifications"
                        checked={formData.preferences.notifications}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                      />
                      <span className="ml-2 text-sm text-blue-800">
                        Notifications
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Address and Company Sections */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg">
              {/* Address Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-blue-50 rounded-lg"
              >
                <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Address Information
                </h2>
                <div className="space-y-4">
                  {["street", "city", "state", "district", "zipCode"].map(
                    (field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-blue-800 mb-1 capitalize">
                          {field === "zipCode" ? "ZIP Code" : field}
                        </label>
                        <input
                          type="text"
                          name={`address.${field}`}
                          value={formData.address[field]}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={`Enter ${
                            field === "zipCode" ? "ZIP code" : field
                          }`}
                          required
                        />
                      </div>
                    )
                  )}
                </div>
              </motion.div>

              {/* Company Section */}
              {/* <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-blue-50 rounded-lg"
              > */}
              {/* <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Company Information
                </h2> */}
              {/* <div className="space-y-4">
                  {[
                    { field: 'name', label: 'Company Name', type: 'text' },
                    { field: 'registrationNumber', label: 'Registration Number', type: 'text' },
                    { field: 'email', label: 'Company Email', type: 'email' },
                    { field: 'phone', label: 'Company Phone', type: 'tel' },
                    { field: 'industry', label: 'Industry', type: 'text' },
                    { field: 'website', label: 'Website', type: 'text' }
                  ].map((item) => (
                    <div key={item.field}>
                      <label className="block text-sm font-medium text-blue-800 mb-1">
                        {item.label}
                      </label>
                      <input
                        type={item.type}
                        name={`company.${item.field}`}
                        value={formData.company[item.field]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Enter ${item.label.toLowerCase()}`}
                        required
                      />
                    </div>
                  ))}
                </div> */}
              {/* </motion.div> */}
            </div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8 p-6 bg-blue-50 rounded-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-800 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Skills
                </h2>
                <motion.button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Skill
                </motion.button>
              </div>

              {formData.skills.length === 0 ? (
                <p className="text-blue-600 text-center py-4">
                  No skills added yet
                </p>
              ) : (
                <div className="space-y-4">
                  {formData.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-white rounded-lg shadow-sm border border-blue-100"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-1">
                            Skill Name
                          </label>
                          <input
                            type="text"
                            value={skill.skillName}
                            onChange={(e) =>
                              handleSkillsChange(
                                index,
                                "skillName",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter skill name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-1">
                            Proficiency
                          </label>
                          <select
                            value={skill.proficiency}
                            onChange={(e) =>
                              handleSkillsChange(
                                index,
                                "proficiency",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-1">
                            Years of Experience
                          </label>
                          <input
                            type="number"
                            value={skill.yearsOfExperience}
                            onChange={(e) =>
                              handleSkillsChange(
                                index,
                                "yearsOfExperience",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter years"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-1">
                            Certification
                          </label>
                          <input
                            type="text"
                            value={skill.certification}
                            onChange={(e) =>
                              handleSkillsChange(
                                index,
                                "certification",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter certification"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-2">
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="text-red-600 hover:text-red-800 text-sm flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Form Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-end space-x-4"
            >
              <motion.button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {id ? "Update Team Manager" : "Save Team Manager"}
              </motion.button>
            </motion.div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default AddTeamManager;
