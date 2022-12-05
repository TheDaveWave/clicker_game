import { combineReducers } from "redux";

const countReducer = (state = 0, action) => {
    switch (action.type) {
        case "Increment_Count":
            return state + 1;    
        default:
            return state;
    }
}

const pointReducer = (state = 0, action) => {
    switch (action.type) {
        case "Increment_Points":
            return state + 1;
        default:
            return state;
    }
}

export default combineReducers({
    countReducer,
    pointReducer,
});