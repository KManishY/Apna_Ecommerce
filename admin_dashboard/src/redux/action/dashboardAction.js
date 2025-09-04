import axios from "axios";
import {
  DASHBOARD_ANALYTICS_REQUEST,
  DASHBOARD_ANALYTICS_SUCCESS,
  DASHBOARD_ANALYTICS_FAILURE,
  DASHBOARD_SUMMARY_REQUEST,
  DASHBOARD_SUMMARY_SUCCESS,
  DASHBOARD_SUMMARY_FAILURE
} from "../constants/appConstant.js";
import { baseURL } from "../../apiconfig.js";

const token = localStorage.getItem("authToken");

// Get comprehensive dashboard analytics
export const getDashboardAnalytics = () => dispatch => {
  dispatch({ type: DASHBOARD_ANALYTICS_REQUEST });
  return axios({
    method: "get",
    url: "/dashboard/analytics",
    baseURL: baseURL,
    headers: {
      Authorization: token
    }
  })
    .then(response => {
      return dispatch({
        type: DASHBOARD_ANALYTICS_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      console.error("Error fetching dashboard analytics:", error);
      return dispatch({ 
        type: DASHBOARD_ANALYTICS_FAILURE,
        payload: error.response?.data?.message || "Failed to fetch dashboard analytics"
      });
    });
};

// Get dashboard summary (quick stats)
export const getDashboardSummary = () => dispatch => {
  dispatch({ type: DASHBOARD_SUMMARY_REQUEST });
  return axios({
    method: "get",
    url: "/dashboard/summary",
    baseURL: baseURL,
    headers: {
      Authorization: token
    }
  })
    .then(response => {
      return dispatch({
        type: DASHBOARD_SUMMARY_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      console.error("Error fetching dashboard summary:", error);
      return dispatch({ 
        type: DASHBOARD_SUMMARY_FAILURE,
        payload: error.response?.data?.message || "Failed to fetch dashboard summary"
      });
    });
};
