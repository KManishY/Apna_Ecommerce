import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { reducer as AuthReducer } from "./AuthReducer/reducer.js";
import { reducer as AppReducer } from "./AppReducer/reducer.js";
import { productReducer } from "./AppReducer/productReducer.js";
import { getCartReducer } from "./AppReducer/getCartReducer.js";
import { addressReducer } from "./AddressReducer/reducer.js";
import { orderReducer } from "./OrderReducer/reducer.js";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	AuthReducer,
	AppReducer,
	productReducer,
	getCartReducer,
	addressReducer,
	orderReducer
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
