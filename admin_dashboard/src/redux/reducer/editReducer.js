import {
	EDIT_PRODUCT_REQUEST,
	EDIT_PRODUCT_SUCCESS,
	EDIT_PRODUCT_FAILURE
} from "../constants/appConstant.js";

const initialState = {
	isAuth: false,
	isLoading: false,
	isError: false
};

const editReducer = (oldState = initialState, { type, payload }) => {
	switch (type) {
		case EDIT_PRODUCT_REQUEST:
			return { ...oldState, isLoading: true };
		case EDIT_PRODUCT_SUCCESS:
			return {
				...oldState,
				isLoading: false,
				isAuth: true,
				isError: false,
				token: payload
			};
		case EDIT_PRODUCT_FAILURE:
			return { ...oldState, isLoading: false, isError: true };
		default:
			return oldState;
	}
};

export { editReducer };
