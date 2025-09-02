import axios from "axios";
import {
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAIL,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL,
  SET_DEFAULT_ADDRESS_REQUEST,
  SET_DEFAULT_ADDRESS_SUCCESS,
  SET_DEFAULT_ADDRESS_FAIL,
  GET_DEFAULT_ADDRESS_REQUEST,
  GET_DEFAULT_ADDRESS_SUCCESS,
  GET_DEFAULT_ADDRESS_FAIL
} from "./constants.js";
import { baseURL } from "../../apiConfig.js";

// Create an Axios instance with common configuration
const axiosInstance = axios.create({
  baseURL: baseURL
});

// Helper function to get fresh token
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Get all addresses for user
export const getAddresses = () => async (dispatch) => {
  dispatch({ type: GET_ADDRESSES_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.get("/userDashboard/address", {
      headers: {
        Authorization: token
      }
    });
    
    if (response.data.success) {
      dispatch({ type: GET_ADDRESSES_SUCCESS, payload: response.data.data });
    } else {
      dispatch({ type: GET_ADDRESSES_FAIL, payload: response.data.message });
    }
  } catch (error) {
    console.error("Error fetching addresses:", error);
    
    if (error.response?.status === 401) {
      dispatch({ type: GET_ADDRESSES_FAIL, payload: "Please Login Again" });
    } else {
      dispatch({ type: GET_ADDRESSES_FAIL, payload: error.message || "Failed to fetch addresses" });
    }
  }
};

// Add new address
export const addAddress = (addressData) => async (dispatch) => {
  dispatch({ type: ADD_ADDRESS_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.post("/userDashboard/address", addressData, {
      headers: {
        Authorization: token
      }
    });
    
    if (response.data.success) {
      dispatch({ type: ADD_ADDRESS_SUCCESS, payload: response.data.data });
      return response.data;
    } else {
      dispatch({ type: ADD_ADDRESS_FAIL, payload: response.data.message });
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error adding address:", error);
    dispatch({ type: ADD_ADDRESS_FAIL, payload: error.message });
    throw error;
  }
};

// Update address
export const updateAddress = (addressId, addressData) => async (dispatch) => {
  dispatch({ type: UPDATE_ADDRESS_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.put(`/userDashboard/address/${addressId}`, addressData, {
      headers: {
        Authorization: token
      }
    });
    
    if (response.data.success) {
      dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: response.data.data });
      return response.data;
    } else {
      dispatch({ type: UPDATE_ADDRESS_FAIL, payload: response.data.message });
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error updating address:", error);
    dispatch({ type: UPDATE_ADDRESS_FAIL, payload: error.message });
    throw error;
  }
};

// Delete address
export const deleteAddress = (addressId) => async (dispatch) => {
  dispatch({ type: DELETE_ADDRESS_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.delete(`/userDashboard/address/${addressId}`, {
      headers: {
        Authorization: token
      }
    });
    
    if (response.data.success) {
      dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: addressId });
      return response.data;
    } else {
      dispatch({ type: DELETE_ADDRESS_FAIL, payload: response.data.message });
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error deleting address:", error);
    dispatch({ type: DELETE_ADDRESS_FAIL, payload: error.message });
    throw error;
  }
};

// Set default address
export const setDefaultAddress = (addressId) => async (dispatch) => {
  dispatch({ type: SET_DEFAULT_ADDRESS_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.put(`/userDashboard/address/${addressId}/default`, {}, {
      headers: {
        Authorization: token
      }
    });
    
    if (response.data.success) {
      dispatch({ type: SET_DEFAULT_ADDRESS_SUCCESS, payload: response.data.data });
      return response.data;
    } else {
      dispatch({ type: SET_DEFAULT_ADDRESS_FAIL, payload: response.data.message });
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error setting default address:", error);
    dispatch({ type: SET_DEFAULT_ADDRESS_FAIL, payload: error.message });
    throw error;
  }
};

// Get default address
export const getDefaultAddress = () => async (dispatch) => {
  dispatch({ type: GET_DEFAULT_ADDRESS_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.get("/userDashboard/address/default", {
      headers: {
        Authorization: token
      }
    });
    
    if (response.data.success) {
      dispatch({ type: GET_DEFAULT_ADDRESS_SUCCESS, payload: response.data.data });
    } else {
      dispatch({ type: GET_DEFAULT_ADDRESS_FAIL, payload: response.data.message });
    }
  } catch (error) {
    console.error("Error fetching default address:", error);
    
    if (error.response?.status === 404) {
      // No default address found - this is not an error
      dispatch({ type: GET_DEFAULT_ADDRESS_SUCCESS, payload: null });
    } else if (error.response?.status === 401) {
      dispatch({ type: GET_DEFAULT_ADDRESS_FAIL, payload: "Please Login Again" });
    } else {
      dispatch({ type: GET_DEFAULT_ADDRESS_FAIL, payload: error.message || "Failed to fetch default address" });
    }
  }
};
