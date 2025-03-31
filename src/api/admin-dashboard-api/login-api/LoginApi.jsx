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

    const { token, customer } = response.data;

    // Save token and customer data in localStorage with role-specific keys
    localStorage.setItem(`${role}_Token`, token); // e.g., "team-managers_Token"
    localStorage.setItem(`${role}_User`, JSON.stringify(customer)); // e.g., "team-managers_User"

    return { token, user: customer };
  } catch (error) {
    if (error.response) {
      const errorMsg = error.response.data.message || "Login failed. Please check your credentials.";
      throw new Error(errorMsg);
    } else if (error.request) {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};