import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./constants.js";

// NOTE: DO NOT MODIFY the intial state structure in this file.
const initialState = {
	isAuth: false,
	token: "",
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

		default:
			return oldState;
	}
};

export { reducer };
