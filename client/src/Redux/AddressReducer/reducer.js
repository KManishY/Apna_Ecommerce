import {
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAIL,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL,
  SET_DEFAULT_ADDRESS_REQUEST,
  SET_DEFAULT_ADDRESS_SUCCESS,
  SET_DEFAULT_ADDRESS_FAIL,
  GET_DEFAULT_ADDRESS_REQUEST,
  GET_DEFAULT_ADDRESS_SUCCESS,
  GET_DEFAULT_ADDRESS_FAIL
} from "./constants.js";

const initialState = {
  addresses: [],
  defaultAddress: null,
  isLoading: false,
  isError: false,
  errorMessage: ""
};

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Addresses
    case GET_ADDRESSES_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      };
    
    case GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addresses: action.payload,
        isError: false,
        errorMessage: ""
      };
    
    case GET_ADDRESSES_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload
      };

    // Add Address
    case ADD_ADDRESS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      };
    
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addresses: [...state.addresses, action.payload],
        isError: false,
        errorMessage: ""
      };
    
    case ADD_ADDRESS_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload
      };

    // Update Address
    case UPDATE_ADDRESS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      };
    
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addresses: state.addresses.map(address => 
          address._id === action.payload._id ? action.payload : address
        ),
        isError: false,
        errorMessage: ""
      };
    
    case UPDATE_ADDRESS_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload
      };

    // Delete Address
    case DELETE_ADDRESS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      };
    
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addresses: state.addresses.filter(address => address._id !== action.payload),
        isError: false,
        errorMessage: ""
      };
    
    case DELETE_ADDRESS_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload
      };

    // Set Default Address
    case SET_DEFAULT_ADDRESS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      };
    
    case SET_DEFAULT_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addresses: state.addresses.map(address => ({
          ...address,
          isDefault: address._id === action.payload._id
        })),
        defaultAddress: action.payload,
        isError: false,
        errorMessage: ""
      };
    
    case SET_DEFAULT_ADDRESS_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload
      };

    // Get Default Address
    case GET_DEFAULT_ADDRESS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      };
    
    case GET_DEFAULT_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        defaultAddress: action.payload,
        isError: false,
        errorMessage: ""
      };
    
    case GET_DEFAULT_ADDRESS_FAIL:
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
