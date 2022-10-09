import axios from "axios";
import {
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS
} from "../constants/appConstant.js";

export const login = (payload) => (dispatch) => {
	console.log("payload: ", payload);
	dispatch({ type: LOGIN_REQUEST });
	return axios({
		method: "post",
		url: "/admin/login",
		// localhost:8080/admin/login
		baseURL: "http://localhost:8080",
		data: payload
	})
		.then((r) => {
			console.log("r: ", r.data);
			setTimeout(() => {
				localStorage.setItem("token", r.data);
			}, 100);
			return dispatch({ type: LOGIN_SUCCESS, payload: r.data });
		})
		.catch((e) => dispatch({ type: LOGIN_FAILURE }));
};
