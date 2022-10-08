import axios from "axios";
import {
	GET_CART_DATA_FAIL,
	GET_CART_DATA_REQUEST,
	GET_CART_DATA_SUCCESS,
	GT_DATA_FAIL,
	GET_DATA_REQUEST,
	GET_DATA_SUCCESS,
	POST_CART_DATA_FAIL,
	POST_CART_DATA_REQUEST,
	POST_CART_DATA_SUCCESS,
	GET_DATA_FAIL,
	POST_CART_AllDATA_FAIL,
	POST_CART_AllDATA_SUCCESS,
	POST_CART_AllDATA_REQUEST
} from "./constants.js";
//! product data function 
export const getData = (params) => (dispatch) => {
	dispatch({ type: GET_DATA_REQUEST });
	return axios({
		method: "get",
		url: "/getAllProduct",
		baseURL: "http://localhost:8080",
		params
	})
		.then((response) => {
			return dispatch({ type: GET_DATA_SUCCESS, payload: response.data });
		})
		.catch((err) => {
			return dispatch({ type: GET_DATA_FAIL });
		});
};



const token = localStorage.getItem("token");
// console.log("token: ", token);
//! add to cart function 
export const postCartData = (payload) => (dispatch) => {
	dispatch({ type: POST_CART_DATA_REQUEST });
	return axios({
		method: "post",
		url: "/userDashboard/create",
		baseURL: "http://localhost:8080",
		headers: {
			Authorization: token
		},
		data: payload.data
	})
		.then((response) => {
			// alert(response.data.message);

			dispatch({
				type: POST_CART_DATA_SUCCESS,
				payload: response.data.message
			});
		})
		.catch((err) => {
			dispatch({ type: POST_CART_DATA_FAIL });
		});
};
//! get data from cart
export const getCartData = () => (dispatch) => {
	console.log("hello action");

	dispatch({ type: GET_CART_DATA_REQUEST });
	return axios({
		method: "get",
		url: "/userDashboard/cart",
		baseURL: "http://localhost:8080",
		headers: {
			Authorization: token
		}
	})
		.then((response) => {
			// console.log("hello action");
			return dispatch({
				type: GET_CART_DATA_SUCCESS,
				payload: response.data
			});
		})
		.catch((err) => {
			return dispatch({ type: GET_CART_DATA_FAIL });
		});
};

