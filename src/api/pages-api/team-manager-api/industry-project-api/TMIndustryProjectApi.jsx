import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const getIndustryProjects = async () => {
    try {
        const response = await axios.get(`${apiUrl}super-admin/industry-projects/get-all-industry-projects`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get industry projects.");
    }
};

export const addIndustryProject = async (data) => {
    try {
        const response = await axios.post(`${apiUrl}super-admin/industry-projects/add-industry-project`, data, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to add industry project.");
    }
};

export const updateIndustryProject = async (projectId, data) => {
    try {
        const response = await axios.put(`${apiUrl}super-admin/industry-projects/${projectId}/update-industry-project`, data, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update industry project.");
    }
};

export const deleteIndustryProject = async (projectId) => {
    try {
        const response = await axios.delete(`${apiUrl}super-admin/industry-projects/${projectId}/delete-industry-project`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete industry project.");
    }
};

export const getIndustryProjectById = async (projectId) => {
    try {
        const response = await axios.get(`${apiUrl}super-admin/industry-projects/${projectId}/get-by-id-industry-project`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get industry project by ID.");
    }
};

export const updateIndustryProjectStatus = async (projectId, data) => {
    try {
        const response = await axios.put(`${apiUrl}super-admin/industry-projects/${projectId}/update-industry-project-status`, data, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update industry project status.");
    }
};