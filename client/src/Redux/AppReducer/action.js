import axios from "axios";
import {
  GET_CART_DATA_REQUEST,
  GET_CART_DATA_SUCCESS,
  GET_CART_DATA_FAIL,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAIL,
  POST_CART_DATA_REQUEST,
  POST_CART_DATA_SUCCESS,
  POST_CART_DATA_FAIL,
  DELETE_CART_DATA_REQUEST,
  DELETE_CART_DATA_SUCCESS,
  DELETE_CART_DATA_FAIL,
  UPDATE_CART_DATA_REQUEST,
  UPDATE_CART_DATA_SUCCESS,
  UPDATE_CART_DATA_FAIL
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

export const getData = (params) => async (dispatch) => {
  dispatch({ type: GET_DATA_REQUEST });
  try {
    const response = await axiosInstance.get("/getAllProduct", { params });
    dispatch({ type: GET_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_DATA_FAIL });
  }
};

export const postCartData = (payload) => async (dispatch) => {
  dispatch({ type: POST_CART_DATA_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.post("/userDashboard/create", payload.data, {
      headers: {
        Authorization: token
      }
    });
    
    // Refresh cart data after adding item
    dispatch(getCartData());
    
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    dispatch({ type: POST_CART_DATA_FAIL, payload: error.message });
    throw error;
  }
};

export const getCartData = () => async (dispatch) => {
  dispatch({ type: GET_CART_DATA_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.get("/userDashboard/cart", {
      headers: {
        Authorization: token
      }
    });
    
    // Check if response contains cart data
    if (response.data) {
      // Handle new aggregated response format
      if (response.data.success && response.data.data && response.data.data.items) {
        dispatch({ type: GET_CART_DATA_SUCCESS, payload: response.data.data.items });
      } 
      // Handle old direct array format
      else if (Array.isArray(response.data)) {
        dispatch({ type: GET_CART_DATA_SUCCESS, payload: response.data });
      }
      // Handle case where server returns a message instead of cart data
      else if (response.data.message) {
        dispatch({ type: GET_CART_DATA_SUCCESS, payload: [] });
      } 
      // Fallback to empty array
      else {
        dispatch({ type: GET_CART_DATA_SUCCESS, payload: [] });
      }
    } else {
      dispatch({ type: GET_CART_DATA_SUCCESS, payload: [] });
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    
    // Handle different types of errors
    if (error.response?.status === 401) {
      // Unauthorized - token expired or invalid
      dispatch({ type: GET_CART_DATA_FAIL, payload: "Please Login Again" });
    } else if (error.response?.status === 404) {
      // Cart not found - return empty cart
      dispatch({ type: GET_CART_DATA_SUCCESS, payload: [] });
    } else {
      // Other errors
      dispatch({ type: GET_CART_DATA_FAIL, payload: error.message || "Failed to fetch cart" });
    }
  }
};

export const deleteCartData = ({ params }) => async (dispatch) => {
  dispatch({ type: DELETE_CART_DATA_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.delete(`/userDashboard/delete/${params}`, {
      headers: {
        Authorization: token
      }
    });
    
    // Refresh cart data after deletion
    dispatch(getCartData());
    
    return response.data;
  } catch (error) {
    console.error("Error deleting from cart:", error);
    dispatch({ type: DELETE_CART_DATA_FAIL, payload: error.message });
    throw error;
  }
};



