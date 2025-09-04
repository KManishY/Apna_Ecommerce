import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import thunk from "redux-thunk";
import { loginReducer } from "./reducer/loginReducer.js";
import { userReducer } from "./reducer/userReducer.js";
import { editReducer } from "./reducer/editReducer.js";
import { deleteReducer } from "./reducer/deleteReducer.js";
import { AddReducer } from "./reducer/addReducer.js";
import { productReducer } from "./reducer/productReducer.js";
import { dashboardReducer } from "./reducer/dashboardReducer.js";
const rootReducer = combineReducers({
	loginReducer,
	userReducer,
	productReducer,
	editReducer,
	deleteReducer,
	AddReducer,
	dashboardReducer
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
