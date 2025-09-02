import axios from "axios";
import {
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	REGISTER_FAILURE,
	REGISTER_REQUEST,
	REGISTER_SUCCESS
} from "./constants.js";
import { baseURL } from "../../../apiConfig.js";

export const login = payload => dispatch => {
	dispatch({ type: LOGIN_REQUEST });
	return axios({
		method: "post",
		url: "/user/login",
		baseURL: baseURL,
		data: payload
	})
		.then(r => {
			console.log("r: login successful", r.data.user.name);
			let name = r.data.user.name.split(" ")[0];

			setTimeout(() => {
				localStorage.setItem("token", r.data.token); //TODO .token added here
				localStorage.setItem("user", name); //TODO .token added here
			}, 100);
			// Alert("LOGIN_SUCCESS");
			return dispatch({
				type: LOGIN_SUCCESS,
				payload: r.data.user
			});
		})
		.catch(e => dispatch({ type: LOGIN_FAILURE }));
};

export const register = (payload) => (dispatch) => {
	console.log("payload: ", payload);
	dispatch({ type: REGISTER_REQUEST });
	return axios({
		method: "post",
		url: "/user/register",
		baseURL: baseURL,
		data: payload
	})
		.then((r) =>
			dispatch({ type: REGISTER_SUCCESS, payload: r.data.message })
		)

		.catch((e) => dispatch({ type: REGISTER_FAILURE }));
};
