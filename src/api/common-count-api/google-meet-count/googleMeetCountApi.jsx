import axios from "axios";
import { getAuthToken } from "../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

// Google Meet count Api

export const googleMeetCountApi = async () => {
    try {
        const token = await getAuthToken();
        const response = await axios.get(
            `${apiUrl}super-admin/common-counters/google-meet-count`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "x-api-key": apiKey,
                    "x-app-version": appVersion,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
