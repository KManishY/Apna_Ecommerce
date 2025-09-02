import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  GET_ORDER_STATS_REQUEST,
  GET_ORDER_STATS_SUCCESS,
  GET_ORDER_STATS_FAIL
} from "./constants.js";

const initialState = {
  orders: [],
  currentOrder: null,
  orderStats: null,
  pagination: null,
  isLoading: false,
  isError: false,
  errorMessage: ""
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Order
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      };
    
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: [action.payload, ...state.orders],
        currentOrder: action.payload,
        isError: false,
        errorMessage: ""
      };
    
    case CREATE_ORDER_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload
      };

    // Get Orders
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      };
    
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload.orders,
        pagination: action.payload.pagination,
        isError: false,
        errorMessage: ""
      };
    
    case GET_ORDERS_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload
      };

    // Get Single Order
    case GET_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      };
    
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentOrder: action.payload,
        isError: false,
        errorMessage: ""
      };
    
    case GET_ORDER_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload
      };

    // Update Order Status
    case UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      };
    
    case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: state.orders.map(order => 
          order._id === action.payload._id ? action.payload : order
        ),
        currentOrder: state.currentOrder?._id === action.payload._id ? action.payload : state.currentOrder,
        isError: false,
        errorMessage: ""
      };
    
    case UPDATE_ORDER_STATUS_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload
      };

    // Cancel Order
    case CANCEL_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      };
    
    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: state.orders.map(order => 
          order._id === action.payload._id ? action.payload : order
        ),
        currentOrder: state.currentOrder?._id === action.payload._id ? action.payload : state.currentOrder,
        isError: false,
        errorMessage: ""
      };
    
    case CANCEL_ORDER_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload
      };

    // Get Order Stats
    case GET_ORDER_STATS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      };
    
    case GET_ORDER_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderStats: action.payload,
        isError: false,
        errorMessage: ""
      };
    
    case GET_ORDER_STATS_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload
      };

    default:
      return state;
  }
};
