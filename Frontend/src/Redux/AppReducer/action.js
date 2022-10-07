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
	GET_DATA_FAIL
} from "./constants.js";

export const getData = (params) => (dispatch) => {
	dispatch({ type: GET_DATA_REQUEST });
	return axios({
		method: "get",
		url: "/getAllProduct",
		baseURL: "http://localhost:8080",
		params
	})
		.then((response) => {
			// console.log(response.data);
			return dispatch({ type: GET_DATA_SUCCESS, payload: response.data });
		})
		.catch((err) => {
			return dispatch({ type: GET_DATA_FAIL });
		});
};

//? required to post data
//! userEmail, Prod_id, count;

const token = localStorage.getItem("token");
console.log("token: ", token);

export const postCartData = (payload) => (dispatch) => {
	console.log("payload: ", payload.data);
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
			// console.log(response.data);
			return dispatch({
				type: POST_CART_DATA_SUCCESS,
				payload: response.data.message
			});
		})
		.catch((err) => {
			return dispatch({ type: POST_CART_DATA_FAIL });
		});
};

// export const GET_CART_DATA_REQUEST = "GET_CART_DATA_REQUEST";
// export const GET_CART_DATA_SUCCESS = "GET_CART_DATA_SUCCESS";
// export const GET_CART_DATA_FAIL = "GET_CART_DATA_FAIL";

export const getCartData = () => async (dispatch) => {
	console.log("hello action");

	dispatch({ type: GET_CART_DATA_REQUEST });
	return await axios({
		method: "get",
		url: "/userDashboard/cart",
		baseURL: "http://localhost:8080",
		headers: {
			Authorization: token
		}
	})
		.then((response) => {
			// console.log("hello action");
			console.log(response.data);
			return dispatch({
				type: GET_CART_DATA_SUCCESS,
				payload: response.data
			});
		})
		.catch((err) => {
			return dispatch({ type: GET_CART_DATA_FAIL });
		});
};