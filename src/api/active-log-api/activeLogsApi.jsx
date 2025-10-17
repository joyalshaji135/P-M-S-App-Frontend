import axios from "axios";
import { getAuthToken } from "../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

// Client Feedback Count APi

export const getAllActivityLogs = async () => {
    try {
        const token = await getAuthToken();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                "x-app-version": appVersion,
            },    
        };
        const response = await axios.get(`${apiUrl}company-owner/active-log/get-all-active-logs`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
        }
    };