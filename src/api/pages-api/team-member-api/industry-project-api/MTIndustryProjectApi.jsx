import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

// Get All Industry Project Api 
export const getClientTaskById = async (client_id) => {
    try {
        const response = await axios.get(
            `${apiUrl}team-member/task-wise/${client_id}/task-wise-client`,
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
        console.error(error);
        throw new Error("Failed to get client task by ID.");
    }
};

// Get All Industry Project Api 
export const getAllIndustryProjects = async () => {
    try {
        const response = await axios.get(
            `${apiUrl}team-member/task-wise/get-all-industry-projects`,
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
        console.error(error);
        throw new Error("Failed to get industry projects.");
    }
};