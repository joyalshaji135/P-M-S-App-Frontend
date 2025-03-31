import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const getAllRecruitmentPosts = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/recruitment-posts/get-all-recruitment-posts`, 
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
      console.error("Error fetching recruitment posts:", error);
      throw error;
    }
  };

export const getRecruitmentPostById = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/recruitment-posts/${id}/get-by-id-recruitment-post`, 
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
      console.error("Error fetching recruitment post by ID:", error);
      throw error;
    }
  };

export const deleteRecruitmentPostById = async (id) => {
    try {
      const response = await axios.delete(
        `${apiUrl}super-admin/recruitment-posts/${id}/delete-recruitment-post`, 
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
      console.error("Error deleting recruitment post by ID:", error);
      throw error;
    }
  };

export const updateRecruitmentPostById = async (id, data) => {
  try {
    const response = await axios.put(
      `${apiUrl}super-admin/recruitment-posts/${id}/update-recruitment-post`,
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
    console.error("Error updating recruitment post by ID:", error);
   throw new Error(error.response?.data?.error || "Failed to add team manager");
  }
};

export const addRecruitmentPost = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}super-admin/recruitment-posts/create-recruitment-post`,
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
    console.error("Error adding recruitment post:", error);
   throw new Error(
     error.response?.data?.message || "Failed to add team manager"
   );
  }
};
