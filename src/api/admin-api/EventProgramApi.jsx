const API_BASE_URL = process.env.VITE_API_BASE_URL || "";
const apikey = process.env.VITE_API_KEY || "";
const appVersion = process.env.VITE_APP_VERSION || "";
const axios = require("axios");
const { getAdminBearerToken } = require("../../helpers/tokenHelpers");

// Create Event Program
async function createEventProgram(data) {
  try {
    const token = await getAdminBearerToken();
    if (!token) throw new Error("Authentication token is missing");
    
    const response = await axios.post(`${API_BASE_URL}/api/super-admin/event-programs/create-event-programs`, data, {
      withCredentials: true,
      headers: {
        "x-api-key": apikey,
        "x-app-version": appVersion,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event program:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create event program");
  }
}

// Edit Event Program
async function updateEventProgramById(id, updatedData) {
  try {
    const token = await getAdminBearerToken();
    if (!token) throw new Error("Authentication token is missing");
    
    const response = await axios.put(`${API_BASE_URL}/api/super-admin/event-programs/create-event-programs/${id}`, updatedData, {
      withCredentials: true,
      headers: {
        "x-api-key": apikey,
        "x-app-version": appVersion,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event program:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update event program");
  }
}

// Fetch Event Programs
async function fetchEventPrograms() {
  try {
    const token = await getAdminBearerToken();
    if (!token) throw new Error("Authentication token is missing");
    
    const response = await axios.get(`${API_BASE_URL}/api/super-admin/event-programs/create-event-programs/`, {
      params: { page, limit, search },
      headers: {
        "x-api-key": apikey,
        "x-app-version": appVersion,
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      eventProgramsList: response.data.data.data,
      total: response.data.data.total,
    };
  } catch (error) {
    console.error("Error fetching event programs:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch event programs");
  }
}

// Fetch Event Program by ID
async function fetchEventProgramById(id) {
  try {
    const token = await getAdminBearerToken();
    if (!token) throw new Error("Authentication token is missing");
    
    const response = await axios.get(`${API_BASE_URL}/api/super-admin/event-programs/create-event-programs${id}`, {
      withCredentials: true,
      headers: {
        "x-api-key": apikey,
        "x-app-version": appVersion,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching event program by ID:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch event program by ID");
  }
}

// Update Event Program Status
async function updateEventProgramStatusById(id, status) {
  try {
    const token = await getAdminBearerToken();
    if (!token) throw new Error("Authentication token is missing");
    
    const response = await axios.patch(
      `${API_BASE_URL}/api/super-admin/event-programs/create-event-programs/${id}/status`,
      { status, id },
      {
        withCredentials: true,
        headers: {
          "x-api-key": apikey,
          "x-app-version": appVersion,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating event program status:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update event program status");
  }
}

// Delete Event Program
async function deleteEventProgram(id) {
  try {
    const token = await getAdminBearerToken();
    if (!token) throw new Error("Authentication token is missing");
    
    const response = await axios.delete(`${API_BASE_URL}/api/super-admin/event-programs/create-event-programs/${id}`, {
      withCredentials: true,
      headers: {
        "x-api-key": apikey,
        "x-app-version": appVersion,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting event program:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete event program");
  }
}

module.exports = {
  createEventProgram,
  updateEventProgramById,
  fetchEventPrograms,
  fetchEventProgramById,
  updateEventProgramStatusById,
  deleteEventProgram,
};