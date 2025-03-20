import axios from "axios"
import { getAuthToken } from "../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;


export const createTeamMembers = async (data) => {
    try {
        const response = await axios.post(`${apiUrl}super-admin/team-members/create-team-member`, 
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

export const getAllTeamMembers = async () => {
    try {
        const response = await axios.get(`${apiUrl}super-admin/team-members/get-all-team-members`, 
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
}