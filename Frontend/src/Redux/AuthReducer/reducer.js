import {
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	REGISTER_FAILURE,
	REGISTER_REQUEST,
	REGISTER_SUCCESS
} from "./constants.js";

const initialState = {
	isAuth: false,
	token: "",
	status: "",
	isLoading: false,
	isError: false
};

const reducer = (oldState = initialState, { type, payload }) => {
	// console.log("payload: ", payload);
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

		case REGISTER_REQUEST:
			return {
				isLoading: true
			};
		case REGISTER_SUCCESS:
			return {
				...oldState,
				isLoading: false,
				isAuth: true,
				isError: false,
				status: payload
			};
		case REGISTER_FAILURE:
			return {
				...oldState,
				isLoading: false,
				isError: true
			};

		default:
			return oldState;
	}
};

export { reducer };
