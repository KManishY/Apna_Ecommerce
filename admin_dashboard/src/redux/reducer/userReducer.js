import {
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAILURE
} from "../constants/appConstant.js";

const initialState = {
	isAuth: false,
	userData: [],
	isLoading: false,
	isError: false
};

const userReducer = (oldState = initialState, { type, payload }) => {
	switch (type) {
		case USER_DETAILS_REQUEST:
			return {
				...oldState,
				isLoading: true
			};
		case USER_DETAILS_SUCCESS:
			return {
				...oldState,
				isLoading: false,
				isAuth: true,
				isError: false,
				userData: payload
			};
		case USER_DETAILS_FAILURE:
			return {
				...oldState,
				isLoading: false,
				isError: true
			};
		default:
			return oldState;
	}
};

export { userReducer };
