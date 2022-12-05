import { combineReducers } from "redux";

const countReducer = (state = 0, action) => {
    switch (action.type) {
        case "Increment_Count":
            return state + action.payload;    
        default:
            return state;
    }
}

const pointReducer = (state = 0, action) => {
    switch (action.type) {
        case "Increment_Points":
            return state + 1;
        case "Reduce_Points":
            return state - action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    countReducer,
    pointReducer,
});