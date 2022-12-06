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

const clickReducer = (state = 0, action) => {
    switch(action.type) {
        case "GET_CLICKS":
            return state;
        case "INCREMENT_CLICKS":
            return state + action.payload;
        case "RESET_CLICKS":
            return 0;
        default:
            return state;
    }
}

export default combineReducers({
    countReducer,
    pointReducer,
    clickReducer,
});