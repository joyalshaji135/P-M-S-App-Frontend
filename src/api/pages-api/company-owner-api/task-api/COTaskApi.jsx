import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

// project task api

export const getAllProjectTasks = async (projectId) => {
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/project-tasks/get-all-project-tasks/${projectId}`,
      {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching project tasks:", error);
    return null;
  }
};

export const getProjectTaskById = async (taskId) => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/project-tasks/${taskId}/get-by-id-project-tasks`,
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching project task:", error);
      return null;
    }
  };

export const createProjectTask = async (data) => {
    try {
      const response = await axios.post(
        `${apiUrl}super-admin/project-tasks/create-project-tasks`,
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
      console.error("Error creating project task:", error);
      throw error;
    }
  };

export const updateProjectTask = async (taskId, data) => {
    try {
      const response = await axios.put(
        `${apiUrl}super-admin/project-tasks/${taskId}/update-project-task`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "app-version": appVersion,
            "x-api-key": apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating project task:", error);
      throw error;
    }
  };

export const deleteProjectTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}super-admin/project-tasks/${taskId}/delete-project-task`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "app-version": appVersion,
            "x-api-key": apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting project task:", error);
      throw error;
    }
  };

// updateProjectTaskStatus

export const updateProjectTaskStatus = async (taskId, status) => {
    try {
      const response = await axios.put(
        `${apiUrl}super-admin/project-tasks/${taskId}/update-status-project-task`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "app-version": appVersion,
            "x-api-key": apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating project task status:", error);
      throw error;
    }
  };