import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCompanyOwner,
  getCompanyOwnerById,
  updateCompanyOwnerById,
} from "../../../api/pages-api/admin-dashboard-api/company-owner-api/CompanyOwnerApi";
import { toast } from "react-toastify";

function AddCompanyOwner() {
  const navigate = useNavigate();
  // const { id } = useParams();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "company-owners", // Default role
    address: {
      street: "",
      city: "",
      state: "",
      district: "",
      zipCode: "",
    },
    preferences: {
      newsletter: false,
      notifications: false,
    },
    company: {
      name: "",
      registrationNumber: "",
      website: "",
      email: "",
      phone: "",
      industry: "",
    },
    dateOfBirth: "",
    gender: "male",
  });

  // Fetch data from API on component mount

  // const fetchData = async () => {
  //   try {
  //     const data = await getCompanyOwnerById(id);
  //     setFormData(data.companyOwner);
  //   } catch (error) {
  //     console.error("Error fetching company owner:", error);
  //   }
  // };
  //  useEffect(() => {
  //    if (id) {
  //      fetchData();
  //    }
  //  }, [id]);

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

  // Handle nested input changes (e.g., address, preferences, company)
  const handleNestedInputChange = (e, parent) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [name]: type === "checkbox" ? checked : value,
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
          profilePicture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
        // If editing, update the existing entry
      const response =  await addCompanyOwner( formData);
     if(response.success){
      toast.success(response.message || "Company Owner Updated Successfully");
      navigate(-1);
     }else{
      toast.error(response.message || "Failed to update Company Owner");
     }
     

      // Redirect to the Company Owners page
      
    } catch (error) {
      console.error("Error updating company owner:", error);
      toast.error("Failed to update Company Owner");
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        {/* Grid Layout for Form Fields */}
        <div className="">
          {/* Left Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="space-y-4">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth.split("T")[0]} // Extract the date part
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
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled
                >
                  <option value="company-owners">Company Owner</option>
                  {/* <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option> */}
                </select>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address Section */}
              <fieldset className="border border-gray-300 p-4 rounded-md">
                <legend className="text-sm font-medium text-gray-700 px-2">
                  Address
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </fieldset>

              {/* Company Details Section */}
              <fieldset className="border border-gray-300 p-4 rounded-md">
                <legend className="text-sm font-medium text-gray-700 px-2">
                  Company Details
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    type="text"
                    name="company.website"
                    value={formData.company.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company Website"
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
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        {/* Preferences (Full Width) */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferences
          </label>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.preferences.newsletter}
              onChange={(e) => handleNestedInputChange(e, "preferences")}
              className="mr-2"
            />
            <span>Subscribe to Newsletter</span>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.preferences.notifications}
              onChange={(e) => handleNestedInputChange(e, "preferences")}
              className="mr-2"
            />
            <span>Enable Notifications</span>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
          <button
            type="reset"
            className="ml-4 px-6 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCompanyOwner;
