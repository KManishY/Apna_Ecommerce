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
  DELETE_CART_DATA_FAIL
} from "./constants.js";

// Create an Axios instance with common configuration
const axiosInstance = axios.create({
  baseURL: "https://homedecorserver.onrender.com"
});

const token = localStorage.getItem("token");

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
    const response = await axiosInstance.post("/userDashboard/create", payload.data, {
      headers: {
        Authorization: token
      }
    });
    alert(response.data.message);
    dispatch({ type: POST_CART_DATA_SUCCESS, payload: response.data.message });
  } catch (error) {
    dispatch({ type: POST_CART_DATA_FAIL });
  }
};

export const getCartData = () => async (dispatch) => {
  dispatch({ type: GET_CART_DATA_REQUEST });
  try {
    const response = await axiosInstance.get("/userDashboard/cart", {
      headers: {
        Authorization: token
      }
    });
    dispatch({ type: GET_CART_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_CART_DATA_FAIL });
  }
};

export const deleteCartData = ({ params }) => async (dispatch) => {
  dispatch({ type: DELETE_CART_DATA_REQUEST });
  try {
    const response = await axiosInstance.delete(`/userDashboard/delete/${params}`, {
      headers: {
        Authorization: token
      }
    });
    dispatch({ type: DELETE_CART_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: DELETE_CART_DATA_FAIL });
  }
};
