import axios from "axios";
import {
  WISHLIST_REQUEST,
  WISHLIST_SUCCESS,
  WISHLIST_FAILURE,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAILURE,
  REMOVE_FROM_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_FAILURE,
  CLEAR_WISHLIST_REQUEST,
  CLEAR_WISHLIST_SUCCESS,
  CLEAR_WISHLIST_FAILURE,
  CHECK_WISHLIST_REQUEST,
  CHECK_WISHLIST_SUCCESS,
  CHECK_WISHLIST_FAILURE,
  GET_WISHLIST_COUNT_REQUEST,
  GET_WISHLIST_COUNT_SUCCESS,
  GET_WISHLIST_COUNT_FAILURE
} from "./constants.js";
import { baseURL } from "../../apiConfig.js";



// Get user's wishlist
export const getWishlist = () => (dispatch) => {
  dispatch({ type: WISHLIST_REQUEST });
  
  const token = localStorage.getItem("token");
  
  return axios({
    method: "GET",
    url: "/userDashboard/wishlist",
    baseURL: baseURL,
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      console.log("response.data", response.data);
      return dispatch({
        type: WISHLIST_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log("Error fetching wishlist:", error);
      return dispatch({
        type: WISHLIST_FAILURE,
        payload: error.response?.data?.message || "Failed to fetch wishlist"
      });
    });
};

// Add product to wishlist
export const addToWishlist = (productId) => (dispatch) => {
  dispatch({ type: ADD_TO_WISHLIST_REQUEST });
  
  const token = localStorage.getItem("token");
  
  return axios({
    method: "POST",
    url: "/userDashboard/wishlist",
    baseURL: baseURL,
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    data: { productId }
  })
    .then((response) => {
      console.log("response.data", response.data);
      return dispatch({
        type: ADD_TO_WISHLIST_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log("Error adding to wishlist:", error);
      return dispatch({
        type: ADD_TO_WISHLIST_FAILURE,
        payload: error.response?.data?.message || "Failed to add to wishlist"
      });
    });
};

// Remove product from wishlist
export const removeFromWishlist = (productId) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_WISHLIST_REQUEST });
  
  const token = localStorage.getItem("token");
  
  return axios({
    method: "DELETE",
    url: `/userDashboard/wishlist/${productId}`,
    baseURL: baseURL,
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      return dispatch({
        type: REMOVE_FROM_WISHLIST_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log("Error removing from wishlist:", error);
      return dispatch({
        type: REMOVE_FROM_WISHLIST_FAILURE,
        payload: error.response?.data?.message || "Failed to remove from wishlist"
      });
    });
};

// Clear entire wishlist
export const clearWishlist = () => (dispatch) => {
  dispatch({ type: CLEAR_WISHLIST_REQUEST });
  
  const token = localStorage.getItem("token");
  
  return axios({
    method: "DELETE",
    url: "/userDashboard/wishlist",
    baseURL: baseURL,
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      return dispatch({
        type: CLEAR_WISHLIST_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log("Error clearing wishlist:", error);
      return dispatch({
        type: CLEAR_WISHLIST_FAILURE,
        payload: error.response?.data?.message || "Failed to clear wishlist"
      });
    });
};

// Check if product is in wishlist
export const checkWishlist = (productId) => (dispatch) => {
  dispatch({ type: CHECK_WISHLIST_REQUEST });
  
  const token = localStorage.getItem("token");
  
  return axios({
    method: "GET",
    url: `/userDashboard/wishlist/check/${productId}`,
    baseURL: baseURL,
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      return dispatch({
        type: CHECK_WISHLIST_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log("Error checking wishlist:", error);
      return dispatch({
        type: CHECK_WISHLIST_FAILURE,
        payload: error.response?.data?.message || "Failed to check wishlist"
      });
    });
};

// Get wishlist count
export const getWishlistCount = () => (dispatch) => {
  dispatch({ type: GET_WISHLIST_COUNT_REQUEST });
  
  const token = localStorage.getItem("token");
  
  return axios({
    method: "GET",
    url: "/userDashboard/wishlist/count",
    baseURL: baseURL,
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      return dispatch({
        type: GET_WISHLIST_COUNT_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log("Error getting wishlist count:", error);
      return dispatch({
        type: GET_WISHLIST_COUNT_FAILURE,
        payload: error.response?.data?.message || "Failed to get wishlist count"
      });
    });
};
