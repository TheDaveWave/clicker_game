import { combineReducers } from "redux";

// manipulate the count value, should 
// just be incremented by action.payload
const count = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT_COUNT":
            return state + action.payload;    
        default:
            return state;
    }
}

// manipulate the point values.
const points = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT_POINTS":
            return state + 1;
        case "REDUCE_POINTS":
            return state - action.payload;
        default:
            return state;
    }
}

const clicks = (state = 0, action) => {
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
    count,
    points,
    clicks,
});