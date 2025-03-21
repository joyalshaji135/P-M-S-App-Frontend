import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

export const getAllEventPrograms = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/event-programs/get-all-event-programs`,
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
    console.error("Error fetching event programs:", error);
    throw error;
  }
};
export const getEventProgramById = async (id) => {
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/event-programs/${id}/get-by-id-event-programs`,
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
    console.error("Error fetching event program by ID:", error);
    throw error;
  }
};

export const createEventProgram = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}super-admin/event-programs/create-event-programs`,
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
    console.error("Error creating event program:", error);
    throw error;
  }
};

export const updateEventProgramById = async (id, data) => {
  try {
    const response = await axios.put(
      `${apiUrl}super-admin/event-programs/${id}/update-event-programs`,
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
    console.error("Error updating event program by ID:", error);
    throw error;
  }
};

export const deleteEventProgramById = async (id) => {
  try {
    const response = await axios.delete(
      `${apiUrl}super-admin/event-programs/${id}/delete-event-programs`,
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
    console.error("Error deleting event program by ID:", error);
    throw error;
  }
};

export const statusUpdateEventProgramById = async (id, data) => {
  try {
    const response = await axios.patch(
      `${apiUrl}super-admin/event-programs/${id}/status-change-event-programs`,
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
    console.error("Error status updating event program by ID:", error);
    throw error;
  }
};
