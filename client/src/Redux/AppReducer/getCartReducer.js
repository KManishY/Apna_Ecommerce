import {
	GET_CART_DATA_FAIL,
	GET_CART_DATA_REQUEST,
	GET_CART_DATA_SUCCESS
} from "./constants.js";

// storeing all data into data :[]
const initialState = {
	isAuth: false,
	cart: [],
	isLoading: false,
	isError: false
};
export const getCartReducer = (oldState = initialState, { type, payload }) => {
	switch (type) {
		case GET_CART_DATA_REQUEST:
			return {
				isLoading: true
			};
		case GET_CART_DATA_SUCCESS:
			return {
				...oldState,
				isLoading: false,
				cart: payload
			};
		case GET_CART_DATA_FAIL:
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
