import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const loginApi = async ({ email, password, role }) => {
  try {
    const response = await axios.post(
      `${apiUrl}super-admin/auth/login`,
      { email, password, role },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "x-app-version": appVersion,
        },
        timeout: 10000,
      }
    );

    // Extract token and customer from the response
    const { token, customer } = response.data; 
    console.log("API Response:", customer, token);

    // Save token and customer data in localStorage
    localStorage.setItem("Token", token); // Save token under role-specific key
    localStorage.setItem(role, JSON.stringify(customer)); // Save customer data under role-specific key

    // Return extracted token and customer data
    return { token, user: customer }; 
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Error setting up request");
    }
  }
};
