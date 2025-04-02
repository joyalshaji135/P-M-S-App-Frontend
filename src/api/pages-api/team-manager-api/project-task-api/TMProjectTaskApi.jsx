import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

// Project Task Api

export const addProjectTask = async (data) => {
    try {
        const response = await axios.post(`${apiUrl}team-manager/task-roles/create-task-role`, data, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "x-app-version": appVersion,
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
        const response = await axios.put(`${apiUrl}team-manager/task-roles/${taskId}/update-task-role`, data, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "x-app-version": appVersion,
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
        const response = await axios.delete(`${apiUrl}team-manager/task-roles/${taskId}/delete-task-role`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "x-app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete project task.");
    }
};

export const getAllProjectTasks = async (projectId) => {
    try {
        const response = await axios.get(`${apiUrl}team-manager/task-roles/get-all-task-roles`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "x-app-version": appVersion,
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
        const response = await axios.get(`${apiUrl}team-manager/task-roles/${taskId}/get-by-id-task-role`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "x-app-version": appVersion,
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
        const response = await axios.put(`${apiUrl}team-manager/task-roles/${taskId}/status-change-task-role`, data, {
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