import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const getAllClientFeedbacks = async () => { 
    try {
        const response = await axios.get(
            `${apiUrl}company-owner/client-feedback/get-all-client-feedbacks`,
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
        throw new Error("Failed to get client feedbacks.");
    }
};  

export const getClientFeedbackById = async (feedbackId) => {
    try {
        const response = await axios.get(
            `${apiUrl}company-owner/client-feedback/${feedbackId}/get-by-id-client-feedback`,
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
        throw new Error("Failed to get client feedback by ID.");
    }
};

export const deleteClientFeedback = async (feedbackId) => {
    try {
        const response = await axios.delete(
            `${apiUrl}company-owner/client-feedback/${feedbackId}/delete-client-feedback`,
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
        throw new Error("Failed to delete client feedback.");
    }
};

export const updateClientFeedback = async (feedbackId, data) => {
    try {
        const response = await axios.put(
            `${apiUrl}company-owner/client-feedback/${feedbackId}/update-client-feedback`,
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
        console.error(error);
        throw new Error("Failed to update client feedback.");
    }
};

export const addClientFeedback = async (data) => {
    try {
        const response = await axios.post(
            `${apiUrl}company-owner/client-feedback/create-client-feedback`,
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
        console.error(error);
        throw new Error("Failed to add client feedback.");
    }
};
// status Change
export const updateClientFeedbackStatus = async (feedbackId, data) => {
    try {
        const response = await axios.put(
            `${apiUrl}company-owner/client-feedback/${feedbackId}/status-change-client-feedback`,
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
        console.error(error);
        throw new Error("Failed to update client feedback status.");
    }
};