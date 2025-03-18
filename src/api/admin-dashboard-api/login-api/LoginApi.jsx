import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const loginApi = async (data) => {
    try {
        console.log("Making API request to:", `${apiUrl}super-admin/auth/login`);
        const response = await axios.post(
            `${apiUrl}super-admin/auth/login`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'x-app-version': appVersion
                },
                timeout: 10000 // 10 seconds timeout
            }
        );
        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('API Error Response:', error.response.data);
            console.error('Status Code:', error.response.status);
            throw new Error(error.response.data.message || "Login Failed");
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No Response Received:', error.request);
            throw new Error("Network Error: No response from server");
        } else {
            // Something happened in setting up the request
            console.error('Request Setup Error:', error.message);
            throw new Error("Request Error: " + error.message);
        }
    }
};