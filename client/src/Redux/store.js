import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { reducer as AuthReducer } from "./AuthReducer/reducer.js";
import { reducer as AppReducer } from "./AppReducer/reducer.js";
import { productReducer } from "./AppReducer/productReducer.js";
import { getCartReducer } from "./AppReducer/getCartReducer.js";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	AuthReducer,
	AppReducer,
	productReducer,
	getCartReducer
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
