import axios from "axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./constants.js";

export const login = (payload) => (dispatch) => {
	// console.log("payload: ", payload);
	dispatch({ type: LOGIN_REQUEST });
	return axios({
		method: "post",
		url: "/api/login",
		baseURL: "https://reqres.in",
		data: payload
	})
		.then((r) => dispatch({ type: LOGIN_SUCCESS, payload: r.data }))

		.catch((e) => dispatch({ type: LOGIN_FAILURE }));
};
