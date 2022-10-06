import axios from "axios";
import {
	GET_DATA_FAIL,
	GET_DATA_REQUEST,
	GET_DATA_SUCCESS
} from "./constants.js";

export const getData = () => (dispatch) => {
	dispatch({ type: GET_DATA_REQUEST });
	return axios({
		method: "get",
		url: "/getAllProduct",
		baseURL: "http://localhost:8080"
	})
		.then((response) => {
			// console.log(response.data);
			return dispatch({ type: GET_DATA_SUCCESS, payload: response.data });
		})
		.catch((err) => {
			return dispatch({ type: GET_DATA_FAIL });
		});
};
