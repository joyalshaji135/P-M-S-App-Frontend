import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const getAllDocumentFiles = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/document-files/get-all-document-files`, 
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
      console.error("Error fetching document files:", error);
      throw error;
    }
  };

export const getDocumentFileById = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/document-files/${id}/get-by-id-document-files`, 
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
      console.error("Error fetching document file by ID:", error);
      throw error;
    }
  };

export const deleteDocumentFileById = async (id) => {
    try {
      const response = await axios.delete(
        `${apiUrl}super-admin/document-files/${id}/delete-file`, 
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
      console.error("Error deleting document file by ID:", error);
      throw error;
    }
  };

export const updateDocumentFileById = async (id, data) => {
  try {
    const response = await axios.put(
      `${apiUrl}super-admin/document-files/${id}/update-document-files`,
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
    console.error("Error updating document file by ID:", error);
    throw error;
  }
};

export const addDocumentFile = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}super-admin/document-files/create-document-files`,
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
    console.error("Error adding document file:", error);
    throw error;
  }
};
