import { combineReducers } from "redux";

// manipulate the count value, should 
// just be incremented by action.payload
const countReducer = (state = 0, action) => {
    switch (action.type) {
        case "Increment_Count":
            return state + action.payload;    
        default:
            return state;
    }
}

// manipulate the point values.
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