import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const getAllClientFeedbacks = async () => { 
    try {
        const response = await axios.get(
            `${apiUrl}super-admin/client-feedbacks/get-all-client-feedbacks`,
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
        throw new Error("Failed to get client feedbacks.");
    }
};  

export const getClientFeedbackById = async (feedbackId) => {
    try {
        const response = await axios.get(
            `${apiUrl}super-admin/client-feedbacks/${feedbackId}/get-by-id-client-feedback`,
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
        throw new Error("Failed to get client feedback by ID.");
    }
};

export const deleteClientFeedback = async (feedbackId) => {
    try {
        const response = await axios.delete(
            `${apiUrl}super-admin/client-feedbacks/${feedbackId}/delete-client-feedback`,
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
        throw new Error("Failed to delete client feedback.");
    }
};

export const updateClientFeedback = async (feedbackId, data) => {
    try {
        const response = await axios.put(
            `${apiUrl}super-admin/client-feedbacks/${feedbackId}/update-client-feedback`,
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
        throw new Error("Failed to update client feedback.");
    }
};

export const addClientFeedback = async (data) => {
    try {
        const response = await axios.post(
            `${apiUrl}super-admin/client-feedbacks/add-client-feedback`,
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
        throw new Error("Failed to add client feedback.");
    }
};
// status Change
export const updateClientFeedbackStatus = async (feedbackId, data) => {
    try {
        const response = await axios.put(
            `${apiUrl}super-admin/client-feedbacks/${feedbackId}/update-client-feedback-status`,
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
        throw new Error("Failed to update client feedback status.");
    }
};