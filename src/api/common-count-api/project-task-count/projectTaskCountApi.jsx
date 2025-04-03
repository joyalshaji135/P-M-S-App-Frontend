import axios from "axios";
import { getAuthToken } from "../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

// project task count api
export const projectTaskCountApi = async () => {
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
        const response = await axios.get(`${apiUrl}super-admin/common-counters/task-count`, config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
        }
    };