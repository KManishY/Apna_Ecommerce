import {
	GET_CART_DATA_FAIL,
	GET_CART_DATA_REQUEST,
	GET_CART_DATA_SUCCESS
} from "./constants.js";

// Initial state with proper structure
const initialState = {
	isAuth: false,
	cart: [],
	isLoading: false,
	isError: false,
	errorMessage: ""
};

export const getCartReducer = (oldState = initialState, { type, payload }) => {
	switch (type) {
		case GET_CART_DATA_REQUEST:
			return {
				...oldState,
				isLoading: true,
				isError: false,
				errorMessage: ""
			};
			
		case GET_CART_DATA_SUCCESS:
			return {
				...oldState,
				isLoading: false,
				isError: false,
				cart: Array.isArray(payload) ? payload : [],
				errorMessage: ""
			};
			
		case GET_CART_DATA_FAIL:
			return {
				...oldState,
				isLoading: false,
				isError: true,
				cart: [],
				errorMessage: payload || "Failed to fetch cart data"
			};

		default:
			return oldState;
	}
};

// DELETE_CART_DATA_REQUEST = "DELETE_CART_DATA_REQUEST";
// export const DELETE_CART_DATA_SUCCESS = "DELETE_CART_DATA_SUCCESS";
// export const DELETE_CART_DATA_FAIL = "DELETE_CART_DATA_FAIL";
