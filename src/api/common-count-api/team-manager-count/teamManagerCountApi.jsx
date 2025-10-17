import axios from "axios";
import { getAuthToken } from "../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

// team manager count api

export const getTeamManagerCount = async () => {
  try {
    const response = await axios.get(`${apiUrl}team-manager/dashboard/count`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "x-app-version": appVersion,
        "x-api-key": apiKey,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};