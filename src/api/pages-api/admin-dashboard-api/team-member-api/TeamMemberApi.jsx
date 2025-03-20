import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const getAllTeamMembers = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/team-members/get-all-team-members`, 
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
      console.error("Error fetching team members:", error);
      throw error;
    }
};

export const getTeamMemberById = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/team-members/${id}/get-by-id-team-member`, 
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
      console.error("Error fetching team member by ID:", error);
      throw error;
    }
};

// Delete Team Member by ID
export const deleteTeamMemberById = async (id) => {
    try {
      const response = await axios.delete(
        `${apiUrl}super-admin/team-members/${id}/delete-team-member`, 
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
      console.error("Error deleting team member by ID:", error);
      throw error;
    }
};

// Update Team Member by ID
export const updateTeamMemberById = async (id, data) => {
  try {
    const response = await axios.put(
      `${apiUrl}super-admin/team-members/${id}/update-team-member`,
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
    console.error("Error updating team member by ID:", error);
    throw error;
  }
};

// Add Team Member
export const addTeamMember = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}super-admin/team-members/create-team-member`,
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
    console.error("Error adding team member:", error);
    throw error;
  }
};
