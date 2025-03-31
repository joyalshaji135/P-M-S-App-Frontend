import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

// industry project api

export const getAllIndustryProjects = async () => {
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
        console.error("Error fetching industry projects:", error);
        throw error;
    }
};

export const addIndustryProject = async (industryProject) => {
    try {
        const response = await axios.post(`${apiUrl}super-admin/industry-projects/add-industry-project`, industryProject, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding industry project:", error);
        throw error;
    }
};

export const updateIndustryProject = async (industryProject) => {
    try {
        const response = await axios.put(`${apiUrl}super-admin/industry-projects/${industryProject.id}/update-industry-project`, industryProject, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating industry project:", error);
        throw error;
    }
};

export const deleteIndustryProject = async (industryProjectId) => {
    try {
        const response = await axios.delete(`${apiUrl}super-admin/industry-projects/${industryProjectId}/delete-industry-project`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting industry project:", error);
        throw error;
    }
};

// get by id

export const getIndustryProjectById = async (industryProjectId) => {
    try {
        const response = await axios.get(`${apiUrl}super-admin/industry-projects/${industryProjectId}/get-industry-project-by-id`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "app-version": appVersion,
                "x-api-key": apiKey,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching industry project by ID:", error);
        throw error;
    }
};

// update status

export const updateIndustryProjectStatus = async (industryProjectId, data) => {
    try {
        const response = await axios.put(
            `${apiUrl}super-admin/industry-projects/${industryProjectId}/update-industry-project-status`,
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
        console.error("Error updating industry project status by ID:", error);
        throw error;
    }
};