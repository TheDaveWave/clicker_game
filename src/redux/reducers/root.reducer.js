import { combineReducers } from "redux";
import countReducer from "./count.reducer";
import upgrades from "./upgrade.reducer";

export default combineReducers({
   countReducer,
   upgrades
});