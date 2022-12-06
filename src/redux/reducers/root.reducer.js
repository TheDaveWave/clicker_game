import { combineReducers } from "redux";

// manipulate the count value, should 
// just be incremented by action.payload
const countReducer = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT_COUNT":
            return state + action.payload;    
        default:
            return state;
    }
}

// manipulate the point values.
const pointReducer = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT_POINTS":
            return state + 1;
        case "REDUCE_POINTS":
            return state - action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    countReducer,
    pointReducer,
});