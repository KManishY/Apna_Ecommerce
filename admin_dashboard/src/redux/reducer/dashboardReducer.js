import {
  DASHBOARD_ANALYTICS_REQUEST,
  DASHBOARD_ANALYTICS_SUCCESS,
  DASHBOARD_ANALYTICS_FAILURE,
  DASHBOARD_SUMMARY_REQUEST,
  DASHBOARD_SUMMARY_SUCCESS,
  DASHBOARD_SUMMARY_FAILURE
} from "../constants/appConstant.js";

const initialState = {
  // Analytics data
  analytics: {
    kpis: {
      totalRevenue: { value: 0, change: 0, currentMonth: 0, previousMonth: 0 },
      totalOrders: { value: 0, change: 0, currentMonth: 0, previousMonth: 0 },
      totalUsers: { value: 0, change: 0, currentMonth: 0, previousMonth: 0 },
      totalProducts: { value: 0, change: 0, currentMonth: 0, previousMonth: 0 }
    },
    recentOrders: [],
    topProducts: [],
    orderStatusDistribution: [],
    monthlyTrend: []
  },
  // Summary data
  summary: {
    totalRevenue: { value: 0, change: 0 },
    totalOrders: { value: 0, change: 0 },
    totalUsers: { value: 0, change: 0 },
    totalProducts: { value: 0, change: 0 }
  },
  // Loading states
  analyticsLoading: false,
  summaryLoading: false,
  // Error states
  analyticsError: null,
  summaryError: null
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // Analytics Actions
    case DASHBOARD_ANALYTICS_REQUEST:
      return {
        ...state,
        analyticsLoading: true,
        analyticsError: null
      };

    case DASHBOARD_ANALYTICS_SUCCESS:
      return {
        ...state,
        analyticsLoading: false,
        analytics: action.payload.data || action.payload,
        analyticsError: null
      };

    case DASHBOARD_ANALYTICS_FAILURE:
      return {
        ...state,
        analyticsLoading: false,
        analyticsError: action.payload
      };

    // Summary Actions
    case DASHBOARD_SUMMARY_REQUEST:
      return {
        ...state,
        summaryLoading: true,
        summaryError: null
      };

    case DASHBOARD_SUMMARY_SUCCESS:
      return {
        ...state,
        summaryLoading: false,
        summary: action.payload.data || action.payload,
        summaryError: null
      };

    case DASHBOARD_SUMMARY_FAILURE:
      return {
        ...state,
        summaryLoading: false,
        summaryError: action.payload
      };

    default:
      return state;
  }
};
