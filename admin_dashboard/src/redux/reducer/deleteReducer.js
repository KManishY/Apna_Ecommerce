import {
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAILURE
} from "../constants/appConstant.js";

const initialState = {
	isAuth: false,
	isLoading: false,
	isError: false
};

const deleteReducer = (oldState = initialState, { type, payload }) => {
	switch (type) {
		case DELETE_PRODUCT_REQUEST:
			return { ...oldState, isLoading: true };
		case DELETE_PRODUCT_SUCCESS:
			return {
				...oldState,
				isLoading: false,
				isAuth: true,
				isError: false,
				token: payload
			};
		case DELETE_PRODUCT_FAILURE:
			return { ...oldState, isLoading: false, isError: true };
		default:
			return oldState;
	}
};

export { deleteReducer };
