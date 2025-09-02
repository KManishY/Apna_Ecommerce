import {
	PRODUCT_REQUEST,
	PRODUCT_SUCCESS,
	PRODUCT_FAILURE
} from "../constants/appConstant.js";

const initialState = {
	isAuth: false,
	productData: [],
	isLoading: false,
	isError: false
};

const productReducer = (oldState = initialState, { type, payload }) => {
	switch (type) {
		case PRODUCT_REQUEST:
			return { ...oldState, isLoading: true };
		case PRODUCT_SUCCESS:
			return {
				...oldState,
				isLoading: false,
				isAuth: true,
				isError: false,
				productData: payload
			};
		case PRODUCT_FAILURE:
			return { ...oldState, isLoading: false, isError: true };
		default:
			return oldState;
	}
};

export { productReducer };
