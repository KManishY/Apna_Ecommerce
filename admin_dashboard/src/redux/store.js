import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import thunk from "redux-thunk";
import { loginReducer } from "./reducer/loginReducer.js";
import { userReducer } from "./reducer/userReducer.js";
import { productReducer } from "./reducer/productReducer.js";
const rootReducer = combineReducers({
	loginReducer,
	userReducer,
	productReducer
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
