import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { reducer as AuthReducer } from "./AuthReducer/reducer.js";
import { reducer as AppReducer } from "./AppReducer/reducer.js";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ AuthReducer, AppReducer });

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
