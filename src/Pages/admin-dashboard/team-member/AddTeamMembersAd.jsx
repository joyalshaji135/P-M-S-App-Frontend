import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa'; // Import icons

function AddTeamMembersAd() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State for form data
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      district: '',
      zipCode: '',
    },
    role: '',
    description: '',
    status: 'Active',
    photo: null,
    skills: [],
    company: {
      name: '',
      registrationNumber: '',
      email: '',
      phone: '',
      industry: '',
      website: '',
      address: {
        street: '',
        city: '',
        state: '',
        district: '',
        zipCode: '',
      },
    },
  });

  // Fetch data from local storage on component mount
  useEffect(() => {
    if (id) {
      const storedData = JSON.parse(localStorage.getItem('teamMembers')) || [];
      const memberToEdit = storedData.find((member) => member.id === parseInt(id));
      if (memberToEdit) {
        setFormData(memberToEdit);
      }
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

  // Handle skill addition
  const handleAddSkill = () => {
    setFormData({
      ...formData,
      skills: [
        ...formData.skills,
        {
          skillName: '',
          proficiency: '',
          yearsOfExperience: '',
          certification: '',
        },
      ],
    });
  };

  // Handle skill removal
  const handleRemoveSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  // Handle skill input change
  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSkills = formData.skills.map((skill, i) =>
      i === index ? { ...skill, [name]: value } : skill
    );
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const storedData = JSON.parse(localStorage.getItem('teamMembers')) || [];

    if (id) {
      const updatedData = storedData.map((member) =>
        member.id === parseInt(id) ? formData : member
      );
      localStorage.setItem('teamMembers', JSON.stringify(updatedData));
    } else {
      const updatedData = [...storedData, formData];
      localStorage.setItem('teamMembers', JSON.stringify(updatedData));
    }

    navigate('/admin/team-members');
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        {id ? 'Edit Team Member' : 'Add Team Member'}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Grid Layout for Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
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

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handlePhotoUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
              required={!id}
            />
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Preview"
                className="mt-2 w-16 h-16 rounded-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
              <input
                type="text"
                name="skillName"
                value={skill.skillName}
                onChange={(e) => handleSkillChange(index, e)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Skill Name"
                required
              />
              <input
                type="text"
                name="proficiency"
                value={skill.proficiency}
                onChange={(e) => handleSkillChange(index, e)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Proficiency"
                required
              />
              <input
                type="text"
                name="yearsOfExperience"
                value={skill.yearsOfExperience}
                onChange={(e) => handleSkillChange(index, e)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Years of Experience"
                required
              />
              <input
                type="text"
                name="certification"
                value={skill.certification}
                onChange={(e) => handleSkillChange(index, e)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Certification"
              />
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                <FaTrash className="mr-1" /> Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSkill}
            className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2"
          >
            <FaPlus className="mr-1" /> Add Skill
          </button>
        </div>

        {/* Company Information */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Information</label>
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
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
            <input
              type="text"
              name="company.address.street"
              value={formData.company.address.street}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street"
              required
            />
            <input
              type="text"
              name="company.address.city"
              value={formData.company.address.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="City"
              required
            />
            <input
              type="text"
              name="company.address.state"
              value={formData.company.address.state}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="State"
              required
            />
            <input
              type="text"
              name="company.address.district"
              value={formData.company.address.district}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="District"
              required
            />
            <input
              type="text"
              name="company.address.zipCode"
              value={formData.company.address.zipCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="Zip Code"
              required
            />
          </div>
        </div>

        {/* Description (Full Width) */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter description"
            required
          ></textarea>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {id ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTeamMembersAd;