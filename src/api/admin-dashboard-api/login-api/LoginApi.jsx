import axios from "axios";
import { setAuthToken } from "../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const loginApi = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}super-admin/auth/login`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'x-app-version': appVersion
        },
        timeout: 10000
      });
  
      if (response.data.token) {
        setAuthToken(response.data.token); // Store the token
      }
      
      return response.data;
    } catch (error) {
      // ... existing error handling
    }
  };