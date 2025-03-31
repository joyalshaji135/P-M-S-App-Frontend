import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const getAllGoogleMeetSessions = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/google-meet/get-all-google-meets`, 
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
      console.error("Error fetching Google Meet sessions:", error);
      throw error;
    }
  };

export const getGoogleMeetSessionById = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/google-meet/${id}/get-by-id-google-meet`, 
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
      console.error("Error fetching Google Meet session by ID:", error);
      throw error;
    }
  };

export const deleteGoogleMeetSessionById = async (id) => {
    try {
      const response = await axios.delete(
        `${apiUrl}super-admin/google-meet/${id}/delete-session`, 
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
      console.error("Error deleting Google Meet session by ID:", error);
      throw error;
    }
  };

export const updateGoogleMeetSessionById = async (id, data) => {
  try {
    const response = await axios.put(
      `${apiUrl}super-admin/google-meet/${id}/update-google-meet`,
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
    console.error("Error updating Google Meet session by ID:", error);
    throw new Error(
      error.response?.data?.error || "Failed to add team manager"
    );
  }
};

export const addGoogleMeetSession = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}super-admin/google-meet/create-google-meet`,
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
    console.error("Error adding Google Meet session:", error);
   throw new Error(
     error.response?.data?.message || "Failed to add team manager"
   );
  }
};
