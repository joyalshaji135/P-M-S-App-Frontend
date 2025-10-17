import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

// Meeting api get all api

export const getAllMeetings = async () => {
    try {
        const response = await axios.get(`${apiUrl}team-member/task-wise/get-all-google-meetings`, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`,
                "x-api-key": apiKey,
                "x-app-version": appVersion
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};