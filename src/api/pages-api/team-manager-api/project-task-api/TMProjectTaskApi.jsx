import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

// Project Task Api

export const addProjectTask = async (data) => {
    try {
        const response = await axios.post(`${apiUrl}super-admin/project-tasks/add-project-task`, data, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to add project task.");
    }
};

export const updateProjectTask = async (taskId, data) => {
    try {
        const response = await axios.put(`${apiUrl}super-admin/project-tasks/${taskId}/update-project-task`, data, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update project task.");
    }
};

export const deleteProjectTask = async (taskId) => {
    try {
        const response = await axios.delete(`${apiUrl}super-admin/project-tasks/${taskId}/delete-project-task`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete project task.");
    }
};

export const getProjectTasks = async (projectId) => {
    try {
        const response = await axios.get(`${apiUrl}super-admin/project-tasks/${projectId}/get-all-project-tasks`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get project tasks.");
    }
};

export const getProjectTaskById = async (taskId) => {
    try {
        const response = await axios.get(`${apiUrl}super-admin/project-tasks/${taskId}/get-by-id-project-task`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get project task by id.");
    }
};

export const updateProjectTaskStatus = async (taskId, data) => {
    try {
        const response = await axios.put(`${apiUrl}super-admin/project-tasks/${taskId}/update-project-task-status`, data, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update project task status.");
    }
};