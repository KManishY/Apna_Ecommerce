import {
	GET_DATA_FAIL,
	GET_DATA_REQUEST,
	GET_DATA_SUCCESS
} from "./constants.js";

const initialState = {
	isAuth: false,
	data: [],
	message: "",
	isLoading: false,
	isError: false
};
export const reducer = (oldState = initialState, { type, payload }) => {
	switch (type) {
		case GET_DATA_REQUEST:
			return {
				isLoading: true
			};
		case GET_DATA_SUCCESS:
			return {
				isLoading: false,
				data: payload
			};
		case GET_DATA_FAIL:
			return {
				isError: true
			};
		case POST_CART_DATA_REQUEST:
			return {
				isLoading: true
			};
		case POST_CART_DATA_SUCCESS:
			return {
				isLoading: false,
				message: payload
			};
		case POST_CART_DATA_FAIL:
			return {
				isError: true
			};

		default:
			return oldState;
	}
};
// export const POST_CART_DATA_REQUEST = "POST_CART_DATA_REQUEST";
// export const POST_CART_DATA_SUCCESS = "POST_CART_DATA_SUCCESS";
// export const POST_CART_DATA_FAIL = "POST_CART_DATA_FAIL";