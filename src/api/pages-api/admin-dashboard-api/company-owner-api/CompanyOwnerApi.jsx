import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const getAllCompanyOwners = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/company-owners/get-all-company-owner`, 
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "x-app-version": appVersion,
            "x-api-key": apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching company owners:", error);
      throw error; // You can handle this error in your component
    }
  };

export const getCompanyOwnerById = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/company-owners/${id}/get-by-id-company-owner`, 
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "x-app-version": appVersion,
            "x-api-key": apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching company owner by ID:", error);
      throw error; // You can handle this error in your component
    }
  };

//   Delete Company Owner by ID

export const deleteCompanyOwnerById = async (id) => {
    try {
      const response = await axios.delete(
        `${apiUrl}super-admin/company-owners/${id}/delete-company-owner`, 
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "x-app-version": appVersion,
            "x-api-key": apiKey,
          },
        }
      );
      return response.data;
    }
    catch (error) {
      console.error("Error deleting company owner by ID:", error);
      throw error; // You can handle this error in your component
    }
  };

//   Update Company Owner by ID

export const updateCompanyOwnerById = async (id, data) => {
  try {
    const response = await axios.put(
      `${apiUrl}super-admin/company-owners/${id}/update-company-owner`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "x-app-version": appVersion,
          "x-api-key": apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating company owner by ID:", error);
    throw error; // You can handle this error in your component
  }
};

// Add Company Owner

export const addCompanyOwner = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}super-admin/company-owners/create-company-owner`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "x-app-version": appVersion,
          "x-api-key": apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding company owner:", error);
    throw error; // You can handle this error in your component
  }
}