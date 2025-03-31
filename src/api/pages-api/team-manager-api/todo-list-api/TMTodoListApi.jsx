import axios from "axios";
import { getAuthToken } from "../../../../helper/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;

// todo List API

export const getTodoList = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/todo-lists/get-all-todo-lists`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "app-version": appVersion,
          "x-api-key": apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get todo list.");
  }
};

export const addTodoList = async (title) => {
  try {
    const response = await axios.post(
      `${apiUrl}super-admin/todo-lists/create-todo-list`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "app-version": appVersion,
          "x-api-key": apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add todo list.");
  }
};

export const updateTodoList = async (id, title) => {
  try {
    const response = await axios.put(
      `${apiUrl}super-admin/todo-lists/${id}/update-todo-list`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "app-version": appVersion,
          "x-api-key": apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update todo list.");
  }
};

export const deleteTodoList = async (id) => {
  try {
    const response = await axios.delete(
      `${apiUrl}super-admin/todo-lists/${id}/delete-todo-list`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "app-version": appVersion,
          "x-api-key": apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete todo list.");
  }
};

export const getTodoStatus = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}super-admin/todo-lists/get-all-todo-status`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "app-version": appVersion,
          "x-api-key": apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get todo status.");
  }
};
