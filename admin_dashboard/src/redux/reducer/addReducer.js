import {
	ADD_PRODUCT_REQUEST,
	ADD_PRODUCT_SUCCESS,
	ADD_PRODUCT_FAILURE
} from "../constants/appConstant.js";

const initialState = {
	isAuth: false,
	isLoading: false,
	isError: false
};

const AddReducer = (oldState = initialState, { type, payload }) => {
	switch (type) {
		case ADD_PRODUCT_REQUEST:
			return { ...oldState, isLoading: true };
		case ADD_PRODUCT_SUCCESS:
			return {
				...oldState,
				isLoading: false,
				isAuth: true,
				isError: false,
				token: payload
			};
		case ADD_PRODUCT_FAILURE:
			return { ...oldState, isLoading: false, isError: true };
		default:
			return oldState;
	}
};

export { AddReducer };
