import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import thunk from "redux-thunk";
import { loginReducer } from "./reducer/loginReducer.js";
const rootReducer = combineReducers({ loginReducer });

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
