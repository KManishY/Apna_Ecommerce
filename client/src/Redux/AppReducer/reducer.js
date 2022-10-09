import {
	DELETE_CART_DATA_FAIL,
	DELETE_CART_DATA_REQUEST,
	DELETE_CART_DATA_SUCCESS,
	POST_CART_DATA_FAIL,
	POST_CART_DATA_REQUEST,
	POST_CART_DATA_SUCCESS
} from "./constants.js";

// storeing all data into data :[]
const initialState = {
	isAuth: false,
	data: [],

	deleteMessage: "",
	message: "",
	isLoading: false,
	isError: false
};
export const reducer = (oldState = initialState, { type, payload }) => {
	switch (type) {
		case POST_CART_DATA_REQUEST:
			return {
				isLoading: true
			};

		case POST_CART_DATA_SUCCESS:
			return {
				...oldState,
				isLoading: false,
				message: payload
			};

		case POST_CART_DATA_FAIL:
			return {
				isError: true
			};

		case DELETE_CART_DATA_REQUEST:
			return {
				isLoading: true
			};
		case DELETE_CART_DATA_SUCCESS:
			return {
				...oldState,
				isLoading: false,
				deleteMessage: payload
			};
		case DELETE_CART_DATA_FAIL:
			return {
				isError: true
			};
		default:
			return oldState;
	}
};


// DELETE_CART_DATA_REQUEST = "DELETE_CART_DATA_REQUEST";
// export const DELETE_CART_DATA_SUCCESS = "DELETE_CART_DATA_SUCCESS";
// export const DELETE_CART_DATA_FAIL = "DELETE_CART_DATA_FAIL";
