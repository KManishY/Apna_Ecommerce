import {
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS
} from "../constants/appConstant.js";

const initialState = {
	isAuth: false,
	token: "",
	status: "",
	isLoading: false,
	isError: false
};

const loginReducer = (oldState = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN_REQUEST:
			return {
				...oldState,
				isLoading: true
			};
		case LOGIN_SUCCESS:
			return {
				...oldState,
				isLoading: false,
				isAuth: true,
				isError: false,
				token: payload
			};
		case LOGIN_FAILURE:
			return {
				...oldState,
				isLoading: false,
				isError: true
			};
		default:
			return oldState;
	}
};

export { loginReducer };
