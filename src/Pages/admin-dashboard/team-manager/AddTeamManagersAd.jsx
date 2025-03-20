import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeamManagerById } from '../../../api/pages-api/admin-dashboard-api/team-manager-api/TeamManagerApi';

function AddTeamManager() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    status: 'Active', // Default status
    role: 'team-managers',
    password: '',
    confirmPassword: '',
    isDefault: false,
    dateOfBirth: '',
    gender: 'male',
    profilePicture: '',
    lastLogin: '',
    preferences: {
      newsletter: false,
      notifications: false,
    },
    address: {
      street: '',
      city: '',
      state: '',
      district: '',
      zipCode: '',
    },
    skills: [],
    company: {
      name: '',
      registrationNumber: '',
      email: '',
      phone: '',
      industry: '',
      website: ''
    },
  });

  // Fetch data from Database
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
              try {
                const data = await getTeamManagerById(id);
                setFormData(data.teamManager);
              } catch (error) {
                console.error("Error fetching company owner:", error);
              }
    };
    fetchData();
  }
}, [id]);
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
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

  // Handle nested object changes (e.g., address, preferences, company)
  const handleNestedChange = (parent, child, value) => {
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [child]: value,
      },
    });
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
          skillName: '',
          proficiency: 'beginner',
          yearsOfExperience: 0,
          certification: '',
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing data from local storage
    const storedData = JSON.parse(localStorage.getItem('teamManagers')) || [];

    if (id) {
      // If editing, update the existing entry
      const updatedData = storedData.map((manager) =>
        manager.id === parseInt(id) ? formData : manager
      );
      localStorage.setItem('teamManagers', JSON.stringify(updatedData));
    } else {
      // If adding, create a new entry
      const updatedData = [...storedData, formData];
      localStorage.setItem('teamManagers', JSON.stringify(updatedData));
    }

    // Redirect to the Team Managers page
    navigate('/admin/team-managers');
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? 'Edit Team Manager' : 'Add Team Manager'}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        {/* Grid Layout for Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter department"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handlePhotoUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
              required={!id} // Required only for new entries
            />
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Preview"
                className="mt-2 w-16 h-16 rounded-full object-cover"
              />
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter role"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Profile Picture URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
            <input
              type="text"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter profile picture URL"
            />
          </div>

          {/* Last Login */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
            <input
              type="datetime-local"
              name="lastLogin"
              value={formData.lastLogin}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Preferences */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferences</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="preferences.newsletter"
                  checked={formData.preferences.newsletter}
                  onChange={(e) => handleNestedChange('preferences', 'newsletter', e.target.checked)}
                  className="mr-2"
                />
                Newsletter
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="preferences.notifications"
                  checked={formData.preferences.notifications}
                  onChange={(e) => handleNestedChange('preferences', 'notifications', e.target.checked)}
                  className="mr-2"
                />
                Notifications
              </label>
            </div>
          </div>
        </div>

        {/* Address and Company Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Address */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Address</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Street"
                required
              />
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City"
                required
              />
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="State"
                required
              />
              <input
                type="text"
                name="address.district"
                value={formData.address.district}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="District"
                required
              />
              <input
                type="text"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Zip Code"
                required
              />
            </div>
          </div>

          {/* Company */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Company</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="company.name"
                value={formData.company.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Company Name"
                required
              />
              <input
                type="text"
                name="company.registrationNumber"
                value={formData.company.registrationNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Registration Number"
                required
              />
              <input
                type="email"
                name="company.email"
                value={formData.company.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Company Email"
                required
              />
              <input
                type="tel"
                name="company.phone"
                value={formData.company.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Company Phone"
                required
              />
              <input
                type="text"
                name="company.industry"
                value={formData.company.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Industry"
                required
              />
              <input
                type="text"
                name="company.website"
                value={formData.company.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Website"
                required
              />

            </div>
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
                  onChange={(e) => handleSkillsChange(index, 'skillName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Skill Name"
                  required
                />
                <select
                  name="proficiency"
                  value={skill.proficiency}
                  onChange={(e) => handleSkillsChange(index, 'proficiency', e.target.value)}
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
                  onChange={(e) => handleSkillsChange(index, 'yearsOfExperience', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Years of Experience"
                  required
                />
                <input
                  type="text"
                  name="certification"
                  value={skill.certification}
                  onChange={(e) => handleSkillsChange(index, 'certification', e.target.value)}
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

        {/* Description (Full Width) */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter description"
            required
          ></textarea>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {id ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTeamManager;