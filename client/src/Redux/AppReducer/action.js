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

//TODO

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
			alert(response.data.message);

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
export const getCartData = () => dispatch => {
	// console.log("hello action");

	dispatch({
		type: GET_CART_DATA_REQUEST
	});
	return axios({
		method: "get",
		url: "/userDashboard/cart",
		baseURL: "http://localhost:8080",
		headers: {
			Authorization: token
		}
	})
		.then(response => {
			// console.log("hello action");
			return dispatch({
				type: GET_CART_DATA_SUCCESS,
				payload: response.data
			});
		})
		.catch(err => {
			return dispatch({
				type: GET_CART_DATA_FAIL
			});
		});
};

//! delete data from cart
export const deleteCartData = ({params}) => (dispatch) => {
	console.log("params: ", params);
	
	dispatch({ type: DELETE_CART_DATA_REQUEST });
	return (
		axios({
			method: "delete",
			url: `/userDashboard/delete/${params}`,
			baseURL: "http://localhost:8080",
			headers: {
				Authorization: token
			}

			// params
		})
			// return axios
			// 	.delete(`http://localhost:8080/userDashboard/delete/${params}`)
			.then((response) => {
				console.log("response: ", response);
				return dispatch({
					type: DELETE_CART_DATA_SUCCESS,
					payload: response.data
				});
			})
			.catch((err) => {
				return dispatch({ type: DELETE_CART_DATA_FAIL });
			})
	);
};

// DELETE_CART_DATA_REQUEST = "DELETE_CART_DATA_REQUEST";
// export const DELETE_CART_DATA_SUCCESS = "DELETE_CART_DATA_SUCCESS";
// export const DELETE_CART_DATA_FAIL = "DELETE_CART_DATA_FAIL";
