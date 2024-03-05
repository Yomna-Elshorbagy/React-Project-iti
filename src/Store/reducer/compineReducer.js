import { combineReducers } from "redux";
import LanguageReducer from "./languageReducer";
import themeReducer from "./themeReducer";
import loaderReducer from "./laoderReducer";

export default combineReducers({
  language: LanguageReducer,
  theme: themeReducer,
  loader: loaderReducer,
});