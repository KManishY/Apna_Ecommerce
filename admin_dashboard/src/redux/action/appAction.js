import axios from "axios";
import {
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAILURE,
	PRODUCT_REQUEST,
	PRODUCT_SUCCESS,
	PRODUCT_FAILURE,
	EDIT_PRODUCT_REQUEST,
	EDIT_PRODUCT_SUCCESS,
	EDIT_PRODUCT_FAILURE
} from "../constants/appConstant.js";
const token = localStorage.getItem("authToken");
export const allUsers = () => dispatch => {
	dispatch({ type: USER_DETAILS_REQUEST });
	return axios({
		method: "get",
		url: "/admindashboard/users",
		// localhost:8080/admindashboard/users
		baseURL: "http://localhost:8080",
		headers: {
			Authorization: token
		}
	})
		.then(r => {
			return dispatch({
				type: USER_DETAILS_SUCCESS,
				payload: r.data
			});
		})
		.catch(e => {
			console.log(e, "error in appAction");
			return dispatch({ type: USER_DETAILS_FAILURE });
		});
};
export const getProduct = () => dispatch => {
	dispatch({ type: PRODUCT_REQUEST });
	return axios({
		method: "get",
		url: "/admindashboard",
		// localhost:8080/admindashboard/users
		baseURL: "http://localhost:8080",
		headers: {
			Authorization: token
		}
	})
		.then(r => {
			console.log("r: ", r);
			return dispatch({ type: PRODUCT_SUCCESS, payload: r.data });
		})
		.catch(e => {
			console.log(e, "error in appAction");
			return dispatch({ type: PRODUCT_FAILURE });
		});
};

export const editProduct = payload => dispatch => {
	console.log("payload:edit ", payload.id);
	dispatch({ type: EDIT_PRODUCT_REQUEST });
	return axios({
		method: "patch",
		url: `/admindashboard/edit/${payload.id}`,
		baseURL: "http://localhost:8080",
		headers: {
			Authorization: token
		},
		data: payload
	})
		.then(response => {
			alert(response.data.message);

			dispatch({
				type: EDIT_PRODUCT_SUCCESS,
				payload: response.data.message
			});
		})
		.catch(err => {
			dispatch({ type: EDIT_PRODUCT_FAILURE });
		});
};