import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const getAllIndustryProjects = async () => {
    try {
        const response = await axios.get(`${apiUrl}team-manager/industry-projects/get-all-industry-projects`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "x-app-version": appVersion,
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
        const response = await axios.post(`${apiUrl}team-manager/industry-projects/create-industry-project`, data, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "x-app-version": appVersion,
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
        const response = await axios.put(`${apiUrl}team-manager/industry-projects/${projectId}/update-industry-project`, data, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "x-app-version": appVersion,
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
        const response = await axios.delete(`${apiUrl}team-manager/industry-projects/${projectId}/delete-industry-project`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "x-app-version": appVersion,
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
        const response = await axios.get(`${apiUrl}team-manager/industry-projects/${projectId}/get-by-id-industry-project`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "x-app-version": appVersion,
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
        const response = await axios.put(`${apiUrl}team-manager/industry-projects/${projectId}/status-change-industry-project`, data, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "x-app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update industry project status.");
    }
};