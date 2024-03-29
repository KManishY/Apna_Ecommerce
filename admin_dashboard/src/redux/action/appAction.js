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
	EDIT_PRODUCT_FAILURE,
	ADD_PRODUCT_REQUEST,
	ADD_PRODUCT_SUCCESS,
	ADD_PRODUCT_FAILURE,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAILURE
} from "../constants/appConstant.js";
const token = localStorage.getItem("authToken");
export const allUsers = () => dispatch => {
	dispatch({ type: USER_DETAILS_REQUEST });
	return axios({
		method: "get",
		url: "/admindashboard/users",
		// localhost:8080/admindashboard/users
		baseURL: "https://homedecorserver.onrender.com",
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
		baseURL: "https://homedecorserver.onrender.com",
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
		baseURL: "https://homedecorserver.onrender.com",
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
export const addProduct = payload => dispatch => {
	console.log("payload: addProduct ", payload);
	dispatch({ type: ADD_PRODUCT_REQUEST });
	return axios({
		method: "post",
		url: `/admindashboard/create`,
		baseURL: "https://homedecorserver.onrender.com",
		headers: {
			Authorization: token
		},
		data: payload
	})
		.then(response => {
			alert(response.data.message);

			dispatch({
				type: ADD_PRODUCT_SUCCESS,
				payload: response.data.message
			});
		})
		.catch(err => {
			dispatch({ type: ADD_PRODUCT_FAILURE });
		});
};
export const deleteProduct = payload => dispatch => {
	console.log("payload: deleteProduct ", payload);
	dispatch({ type: DELETE_PRODUCT_REQUEST });
	return axios({
		method: "delete",
		url: `/admindashboard/delete/${payload}`,
		baseURL: "https://homedecorserver.onrender.com",
		headers: {
			Authorization: token
		}
		// data: payload
	})
		.then(response => {
			alert(response.data.message);

			dispatch({
				type: DELETE_PRODUCT_SUCCESS,
				payload: response.data.message
			});
		})
		.catch(err => {
			dispatch({ type: DELETE_PRODUCT_FAILURE });
		});
};