import {
	GET_DATA_FAIL,
	GET_DATA_REQUEST,
	GET_DATA_SUCCESS
} from "./constants.js";

// Initial state with proper structure
const initialState = {
	isAuth: false,
	data: [],
	isLoading: false,
	isError: false,
	errorMessage: ""
};

export const productReducer = (oldState = initialState, { type, payload }) => {
	switch (type) {
		case GET_DATA_REQUEST:
			return {
				...oldState,
				isLoading: true,
				isError: false,
				errorMessage: ""
			};
			
		case GET_DATA_SUCCESS:
			return {
				...oldState,
				isLoading: false,
				isError: false,
				data: Array.isArray(payload) ? payload : [],
				errorMessage: ""
			};
			
		case GET_DATA_FAIL:
			return {
				...oldState,
				isLoading: false,
				isError: true,
				data: oldState.data || [], // Keep existing data on error
				errorMessage: payload || "Failed to fetch products"
			};

		default:
			return oldState;
	}
};
