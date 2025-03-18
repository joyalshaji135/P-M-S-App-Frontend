import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const loginApi = async (email, password , role) => {
    try {
        const response = await axios.post(`${apiUrl}/api/super-admin/auth/login`, 
            { email, password , role}, // Request body
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'x-app-version': appVersion
                }
            }
        );

        return response.data; // Axios automatically parses JSON
    } catch (error) {
        console.error('Login API Error:', error.response?.data || error.message);
        throw error;
    }
};
