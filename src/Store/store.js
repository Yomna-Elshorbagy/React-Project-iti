import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import {thunk} from "redux-thunk";
import combineReducers from "./reducer/compineReducer";
// const store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)));
const store = createStore( combineReducers, composeWithDevTools());

export default store;