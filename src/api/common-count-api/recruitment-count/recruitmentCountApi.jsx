import axios from "axios";
import { getAuthToken } from "../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

// Recruitment Count Api
export const getRecruitmentCountApi = async () => {
    try {
        const response = await axios.get(
            `${apiUrl}super-admin/common-counters/recruitment-count`,
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
        throw error;   
    }
};