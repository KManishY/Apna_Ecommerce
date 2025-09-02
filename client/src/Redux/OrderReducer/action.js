import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  GET_ORDER_STATS_REQUEST,
  GET_ORDER_STATS_SUCCESS,
  GET_ORDER_STATS_FAIL
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

// Create new order
export const createOrder = (orderData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.post("/userDashboard/order", orderData, {
      headers: {
        Authorization: token
      }
    });
    
    if (response.data.success) {
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data.data });
      return response.data;
    } else {
      dispatch({ type: CREATE_ORDER_FAIL, payload: response.data.message });
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error creating order:", error);
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.message || "Failed to create order" });
    throw error;
  }
};

// Get all orders for user
export const getOrders = (params = {}) => async (dispatch) => {
  dispatch({ type: GET_ORDERS_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.get("/userDashboard/order", {
      headers: {
        Authorization: token
      },
      params
    });
    
    if (response.data.success) {
      dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data.data });
    } else {
      dispatch({ type: GET_ORDERS_FAIL, payload: response.data.message });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    
    if (error.response?.status === 401) {
      dispatch({ type: GET_ORDERS_FAIL, payload: "Please Login Again" });
    } else {
      dispatch({ type: GET_ORDERS_FAIL, payload: error.message || "Failed to fetch orders" });
    }
  }
};

// Get specific order by ID
export const getOrder = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.get(`/userDashboard/order/${orderId}`, {
      headers: {
        Authorization: token
      }
    });
    
    if (response.data.success) {
      dispatch({ type: GET_ORDER_SUCCESS, payload: response.data.data });
    } else {
      dispatch({ type: GET_ORDER_FAIL, payload: response.data.message });
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    
    if (error.response?.status === 401) {
      dispatch({ type: GET_ORDER_FAIL, payload: "Please Login Again" });
    } else if (error.response?.status === 404) {
      dispatch({ type: GET_ORDER_FAIL, payload: "Order not found" });
    } else {
      dispatch({ type: GET_ORDER_FAIL, payload: error.message || "Failed to fetch order" });
    }
  }
};

// Update order status (admin use)
export const updateOrderStatus = (orderId, statusData) => async (dispatch) => {
  dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.put(`/userDashboard/order/${orderId}/status`, statusData, {
      headers: {
        Authorization: token
      }
    });
    
    if (response.data.success) {
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: response.data.data });
      return response.data;
    } else {
      dispatch({ type: UPDATE_ORDER_STATUS_FAIL, payload: response.data.message });
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    dispatch({ type: UPDATE_ORDER_STATUS_FAIL, payload: error.message });
    throw error;
  }
};

// Cancel order
export const cancelOrder = (orderId, reason) => async (dispatch) => {
  dispatch({ type: CANCEL_ORDER_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.put(`/userDashboard/order/${orderId}/cancel`, { reason }, {
      headers: {
        Authorization: token
      }
    });
    
    if (response.data.success) {
      dispatch({ type: CANCEL_ORDER_SUCCESS, payload: response.data.data });
      return response.data;
    } else {
      dispatch({ type: CANCEL_ORDER_FAIL, payload: response.data.message });
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error cancelling order:", error);
    dispatch({ type: CANCEL_ORDER_FAIL, payload: error.message });
    throw error;
  }
};

// Get order statistics
export const getOrderStats = () => async (dispatch) => {
  dispatch({ type: GET_ORDER_STATS_REQUEST });
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.get("/userDashboard/order/stats/summary", {
      headers: {
        Authorization: token
      }
    });
    
    if (response.data.success) {
      dispatch({ type: GET_ORDER_STATS_SUCCESS, payload: response.data.data });
    } else {
      dispatch({ type: GET_ORDER_STATS_FAIL, payload: response.data.message });
    }
  } catch (error) {
    console.error("Error fetching order stats:", error);
    
    if (error.response?.status === 401) {
      dispatch({ type: GET_ORDER_STATS_FAIL, payload: "Please Login Again" });
    } else {
      dispatch({ type: GET_ORDER_STATS_FAIL, payload: error.message || "Failed to fetch order statistics" });
    }
  }
};
