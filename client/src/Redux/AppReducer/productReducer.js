import {
	GET_DATA_FAIL,
	GET_DATA_REQUEST,
	GET_DATA_SUCCESS
} from "./constants.js";

// storeing all data into data :[]
const initialState = {
	isAuth: false,
	data: [],
	isLoading: false,
	isError: false
};
export const productReducer = (oldState = initialState, { type, payload }) => {
	switch (type) {
		case GET_DATA_REQUEST:
			return {
				isLoading: true
			};
		case GET_DATA_SUCCESS:
			return {
				...oldState,
				isLoading: false,
				data: payload
			};
		case GET_DATA_FAIL:
			return {
				isError: true
			};

		default:
			return oldState;
	}
};
