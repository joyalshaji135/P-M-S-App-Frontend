import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const getAllTeamManagers = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/team-managers/get-all-team-managers`, 
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
      console.error("Error fetching team managers:", error);
      throw error;
    }
};

export const getTeamManagerById = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/team-managers/${id}/get-by-id-team-manager`, 
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
      console.error("Error fetching team manager by ID:", error);
      throw error;
    }
};

// Delete Team Manager by ID
export const deleteTeamManagerById = async (id) => {
    try {
      const response = await axios.delete(
        `${apiUrl}super-admin/team-managers/${id}/delete-team-manager`, 
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
      console.error("Error deleting team manager by ID:", error);
      throw error;
    }
};

// Update Team Manager by ID
export const updateTeamManagerById = async (id, data) => {
  try {
    const response = await axios.put(
      `${apiUrl}super-admin/team-managers/${id}/update-team-manager`,
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
    console.error("Error updating team manager by ID:", error);
    throw error;
  }
};

// Add Team Manager
export const addTeamManager = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}super-admin/team-managers/create-team-manager`,
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
    console.error("Error adding team manager:", error);
    throw error;
  }
};
