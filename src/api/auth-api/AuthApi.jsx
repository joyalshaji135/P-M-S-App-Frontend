import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const apikey = import.meta.env.VITE_API_KEY;
const appVersion = import.meta.env.VITE_APP_VERSION;

/**
 * Register API
 * @param {Object} customerData - Customer data to register
 * @returns {Promise<Object>} - Response object
 */
export const registerApi = async (customerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, customerData, {
      headers: {
        'x-api-key': apikey,
        'x-app-version': appVersion,
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error registering the customer!", error);
    throw error;
  }
};

/**
 * Login API
 * @param {string} email - Customer email
 * @param {string} password - Customer password
 * @returns {Promise<Object>} - Response object
 */
export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/super-admin/auth-super-admin/customer-login`,
      { email, password },
      {
        withCredentials: true,
        headers: {
          'x-api-key': apikey,
          'x-app-version': appVersion,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("There was an error logging in!", error);
    throw error;
  }
};

/**
 * Get User Profile API
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - Response object
 */
export const getUserProfileApi = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'x-api-key': apikey,
        'x-app-version': appVersion,
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the user profile!", error);
    throw error;
  }
};