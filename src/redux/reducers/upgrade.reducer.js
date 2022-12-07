import { combineReducers } from "redux";

const upgrades = (state = {}, action) => {
    switch (action.type) {
        case "GET_UPGRADES":
            return state;    
        default:
            return state;
    }
}

export default upgrades;