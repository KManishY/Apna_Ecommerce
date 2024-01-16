import axios from "axios";
import {
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS
} from "../constants/appConstant.js";

export const login = (payload) => (dispatch) => {
	dispatch({ type: LOGIN_REQUEST });
	return axios({
		method: "post",
		url: "/admin/login",
		baseURL: "http://localhost:8080",
		data: payload
	})
		.then(r => {
			console.log("r: ", r.data);
			setTimeout(() => {
				localStorage.setItem("authToken", r.data);
			}, 100);
			return dispatch({ type: LOGIN_SUCCESS, payload: r.data });
		})
		.catch(e => dispatch({ type: LOGIN_FAILURE }));
};
