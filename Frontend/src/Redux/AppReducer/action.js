import axios from "axios";
import {
	GET_DATA_FAIL,
	GET_DATA_REQUEST,
	GET_DATA_SUCCESS,
	POST_CART_DATA_FAIL,
	POST_CART_DATA_REQUEST,
	POST_CART_DATA_SUCCESS
} from "./constants.js";

export const getData = (params) => (dispatch) => {
	console.log("params: action ", params);
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

export const postCartData = (payload) => (dispatch) => {
	dispatch({ type: POST_CART_DATA_REQUEST });
	return axios({
		method: "post",
		url: "/userDashboard/create",
		baseURL: "http://localhost:8080",
		data: payload
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
