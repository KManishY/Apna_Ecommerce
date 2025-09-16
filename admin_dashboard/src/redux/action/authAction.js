import axios from "axios";
import {
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS
} from "../constants/appConstant.js";
import { baseURL } from "../../apiconfig.js";

export const login = (payload) => (dispatch) => {
	dispatch({ type: LOGIN_REQUEST });
	return axios({
		method: "post",
		url: "/admin/login",
		baseURL: baseURL,
		data: payload
	})
		.then(r => {
			localStorage.setItem("authToken", r.data);
			return dispatch({ type: LOGIN_SUCCESS, payload: r.data });
		})
		.catch(e => dispatch({ type: LOGIN_FAILURE }));
};
