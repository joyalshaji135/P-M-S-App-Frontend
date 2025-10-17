import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  addCompanyOwner,
  getCompanyOwnerById,
  updateCompanyOwnerById,
} from "../../../api/pages-api/admin-dashboard-api/company-owner-api/CompanyOwnerApi";
import {
  getAllState,
  getAllDistrict,
} from "../../../api/comon-dropdown-api/ComonDropDownApi";

function AddCompanyOwner() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "company-owners",
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
      name: "TechNova Solutions Pvt. Ltd.",
      registrationNumber: "TNPL123456",
      website: "https://www.technova.com",
      email: "info@technova.com",
      phone: "+918590343392",
      industry: "Information Technology"
    },    
    dateOfBirth: "",
    gender: "male",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [statesList, setStatesList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [isFetchingDistricts, setIsFetchingDistricts] = useState(false);
  const [prevStateId, setPrevStateId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  // Memoized district fetcher
  const fetchDistricts = useCallback(
    async (stateId) => {
      if (!stateId || stateId === prevStateId) return;

      setIsFetchingDistricts(true);
      try {
        const response = await getAllDistrict(stateId);
        setDistrictsList(response.result); // Directly use response.result
        setPrevStateId(stateId);
      } catch (error) {
        toast.error("Failed to load districts");
        console.error("District fetch error:", error);
      } finally {
        setIsFetchingDistricts(false);
      }
    },
    [prevStateId]
  );

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        // Fetch states
        const statesResponse = await getAllState();
        setStatesList(statesResponse.data);

        if (id) {
          // Fetch existing company owner data
          const data = await getCompanyOwnerById(id);
          const initialData = data.companyOwner;

          setFormData({
            ...initialData,
            address: {
              ...initialData.address,
              stateId: initialData.address.stateId || "",
            },
          });

          // If state is already selected, fetch districts
          if (initialData.address.stateId) {
            await fetchDistricts(initialData.address.stateId);
          }
        }
      } catch (error) {
        toast.error("Failed to load initial data");
        console.error("Initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeData();
  }, [id, fetchDistricts]);

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    const stateName = e.target.options[e.target.selectedIndex].text;

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        state: stateName,
        stateId: stateId,
        district: "",
      },
    }));

    await fetchDistricts(stateId);
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        district: districtName,
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNestedInputChange = (e, parent) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = id
        ? await updateCompanyOwnerById(id, formData)
        : await addCompanyOwner(formData);

      if (response?.success) {
        toast.success(response.message || "Operation successful");
        navigate("/admin/company-owner");
      } else {
        toast.error(response?.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {id ? "Edit Company Owner" : "Add New Company Owner"}
          </h2>
          <p className="text-gray-600 mt-1">
            {id
              ? "Update the company owner details"
              : "Fill in the details to add a new company owner"}
          </p>
        </div>

        {/* Personal Information Section */}
        <motion.div
          className="mb-8 p-6 bg-blue-50 rounded-lg"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
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
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="John Doe"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="john@example.com"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="+1234567890"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth.split("T")[0]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled
              >
                <option value="company-owners">Company Owner</option>
              </select>
            </motion.div>
          </div>
        </motion.div>

        {/* Address Section */}
        <motion.div
          className="mb-8 p-6 bg-blue-50 rounded-lg"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
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
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="123 Main St"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="New York"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.address.stateId}
                onChange={handleStateChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={isLoading}
              >
                <option value="">Select State</option>
                {statesList.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.address.district}
                onChange={handleDistrictChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={!formData.address.stateId || isFetchingDistricts}
              >
                <option value="">Select District</option>
                {districtsList.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="10001"
                required
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Company Information Section */}
        {/* <motion.div
          className="mb-8 p-6 bg-blue-50 rounded-lg"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            Company Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company.name"
                value={formData.company.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Acme Inc."
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company.registrationNumber"
                value={formData.company.registrationNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="123456789"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company.website"
                value={formData.company.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://example.com"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="company.email"
                value={formData.company.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="info@example.com"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="company.phone"
                value={formData.company.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="+1234567890"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company.industry"
                value={formData.company.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Technology"
                required
              />
            </motion.div>
          </div>
        </motion.div> */}

        {/* Preferences Section */}
        <motion.div
          className="mb-8 p-6 bg-blue-50 rounded-lg"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Preferences
          </h3>
          <div className="space-y-3">
            <motion.div className="flex items-center" variants={itemVariants}>
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.preferences.newsletter}
                onChange={(e) => handleNestedInputChange(e, "preferences")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="newsletter"
                className="ml-2 block text-sm text-gray-700"
              >
                Subscribe to Newsletter
              </label>
            </motion.div>

            <motion.div className="flex items-center" variants={itemVariants}>
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                checked={formData.preferences.notifications}
                onChange={(e) => handleNestedInputChange(e, "preferences")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="notifications"
                className="ml-2 block text-sm text-gray-700"
              >
                Enable Notifications
              </label>
            </motion.div>
          </div>
        </motion.div>

        {/* Form Actions */}
        <motion.div
          className="flex justify-end space-x-4 mt-8"
          variants={itemVariants}
        >
          <button
            type="button"
            onClick={() => navigate("/admin/company-owner")}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading && (
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
            {id ? "Update Company Owner" : "Add Company Owner"}
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}

export default AddCompanyOwner;
