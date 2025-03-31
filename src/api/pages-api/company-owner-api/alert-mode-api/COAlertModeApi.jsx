import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const getAllAlerts = async () => { 
    try {
        const response = await axios.get(
            `${apiUrl}super-admin/alerts/get-all-alerts`,
            {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    "app-version": appVersion,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get alerts.");
    }
};  

export const getAlertById = async (alertId) => {
    try {
        const response = await axios.get(
            `${apiUrl}super-admin/alerts/${alertId}/get-by-id-alert`,
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
        console.error(error);
        throw new Error("Failed to get alert by ID.");
    }
};

export const deleteAlert = async (alertId) => {
    try {
        const response = await axios.delete(
            `${apiUrl}super-admin/alerts/${alertId}/delete-alert`,
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
        console.error(error);
        throw new Error("Failed to delete alert.");
    }
};

export const updateAlert = async (alertId, data) => {
    try {
        const response = await axios.put(
            `${apiUrl}super-admin/alerts/${alertId}/update-alert`,
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
        console.error(error);
        throw new Error("Failed to update alert.");
    }
};

export const addAlert = async (data) => {
    try {
        const response = await axios.post(
            `${apiUrl}super-admin/alerts/add-alert`,
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
        console.error(error);
        throw new Error("Failed to add alert.");
    }
};

// Status Change
export const updateAlertStatus = async (alertId, data) => {
    try {
        const response = await axios.put(
            `${apiUrl}super-admin/alerts/${alertId}/update-alert-status`,
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
        console.error(error);
        throw new Error("Failed to update alert status.");
    }
};
