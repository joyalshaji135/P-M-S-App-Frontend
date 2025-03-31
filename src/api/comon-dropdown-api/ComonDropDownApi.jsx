import axios from "axios";
import { getAuthToken } from "../../helper/auth";


const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

// Team Member

export const getAllTeamMembers = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}super-admin/common-drop-downs/team-member-list`, 
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
      console.error("Error fetching team members:", error);
      throw error;
    }
};

// Team Manager 

export const getAllTeamManagers = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/common-drop-downs/team-manager-list`, 
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
    console.error("Error fetching team managers:", error);
    throw error;
  }
};

// Company List

export const getAllCompanyOwners = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/common-drop-downs/company-list`, 
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
    console.error("Error fetching company owners:", error);
    throw error; 
  }
};

// Customer Type

export const getAllCustomerTypes = async ()=>{
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/common-drop-downs/customer-type-list`, 
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
    console.error("Error fetching customer types:", error);
    throw error; 
  }
}

// Domain List


export const getAllDomainList = async ()=>{
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/common-drop-downs/domain-list`, 
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
    console.error("Error fetching domain list:", error);
    throw error; 
  }
}
// Industry natures
export const getAllIndustryNatures = async ()=>{
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/common-drop-downs/industry-nature-list`, 
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
    console.error("Error fetching industry natures:", error);
    throw error; 
  }
}
// Industry natures
export const getAllTaskModules = async ()=>{
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/common-drop-downs/task-module-list`, 
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
    console.error("Error fetching industry natures:", error);
    throw error; 
  }
}

// get all priority
export const getAllPriority = async ()=>{
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/common-drop-downs/priority-list`, 
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
    console.error("Error fetching industry natures:", error);
    throw error; 
  }
}

// Roll
export const getAllRole = async ()=>{
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/common-drop-downs/role-list`, 
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
    console.error("Error fetching industry natures:", error);
    throw error; 
  }
}

// Industry Project
export const getAllIndustryProjects = async ()=>{
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/common-drop-downs/industry-project-list`, 
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
    console.error("Error fetching industry natures:", error);
    throw error; 
  }
}

