import {
  WISHLIST_REQUEST,
  WISHLIST_SUCCESS,
  WISHLIST_FAILURE,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAILURE,
  REMOVE_FROM_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_FAILURE,
  CLEAR_WISHLIST_REQUEST,
  CLEAR_WISHLIST_SUCCESS,
  CLEAR_WISHLIST_FAILURE,
  CHECK_WISHLIST_REQUEST,
  CHECK_WISHLIST_SUCCESS,
  CHECK_WISHLIST_FAILURE,
  GET_WISHLIST_COUNT_REQUEST,
  GET_WISHLIST_COUNT_SUCCESS,
  GET_WISHLIST_COUNT_FAILURE
} from "./constants.js";

const initialState = {
  wishlistItems: [],
  wishlistCount: 0,
  isLoading: false,
  isError: false,
  errorMessage: "",
  isAdding: false,
  isRemoving: false,
  isClearing: false,
  isChecking: false,
  isGettingCount: false
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get wishlist
    case WISHLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      };

    case WISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        wishlistItems: action.payload.data?.items || [],
        wishlistCount: action.payload.data?.totalItems || 0,
        errorMessage: ""
      };

    case WISHLIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
        wishlistItems: []
      };

    // Add to wishlist
    case ADD_TO_WISHLIST_REQUEST:
      return {
        ...state,
        isAdding: true,
        isError: false,
        errorMessage: ""
      };

    case ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        isAdding: false,
        isError: false,
        errorMessage: "",
        wishlistCount: state.wishlistCount + 1
      };

    case ADD_TO_WISHLIST_FAILURE:
      return {
        ...state,
        isAdding: false,
        isError: true,
        errorMessage: action.payload
      };

    // Remove from wishlist
    case REMOVE_FROM_WISHLIST_REQUEST:
      return {
        ...state,
        isRemoving: true,
        isError: false,
        errorMessage: ""
      };

    case REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        isRemoving: false,
        isError: false,
        errorMessage: "",
        wishlistCount: Math.max(0, state.wishlistCount - 1),
        wishlistItems: state.wishlistItems.filter(
          item => item.productId !== action.payload.data?.productId
        )
      };

    case REMOVE_FROM_WISHLIST_FAILURE:
      return {
        ...state,
        isRemoving: false,
        isError: true,
        errorMessage: action.payload
      };

    // Clear wishlist
    case CLEAR_WISHLIST_REQUEST:
      return {
        ...state,
        isClearing: true,
        isError: false,
        errorMessage: ""
      };

    case CLEAR_WISHLIST_SUCCESS:
      return {
        ...state,
        isClearing: false,
        isError: false,
        errorMessage: "",
        wishlistItems: [],
        wishlistCount: 0
      };

    case CLEAR_WISHLIST_FAILURE:
      return {
        ...state,
        isClearing: false,
        isError: true,
        errorMessage: action.payload
      };

    // Check wishlist
    case CHECK_WISHLIST_REQUEST:
      return {
        ...state,
        isChecking: true,
        isError: false,
        errorMessage: ""
      };

    case CHECK_WISHLIST_SUCCESS:
      return {
        ...state,
        isChecking: false,
        isError: false,
        errorMessage: ""
      };

    case CHECK_WISHLIST_FAILURE:
      return {
        ...state,
        isChecking: false,
        isError: true,
        errorMessage: action.payload
      };

    // Get wishlist count
    case GET_WISHLIST_COUNT_REQUEST:
      return {
        ...state,
        isGettingCount: true,
        isError: false,
        errorMessage: ""
      };

    case GET_WISHLIST_COUNT_SUCCESS:
      return {
        ...state,
        isGettingCount: false,
        isError: false,
        wishlistCount: action.payload.data?.count || 0,
        errorMessage: ""
      };

    case GET_WISHLIST_COUNT_FAILURE:
      return {
        ...state,
        isGettingCount: false,
        isError: true,
        errorMessage: action.payload
      };

    default:
      return state;
  }
};
