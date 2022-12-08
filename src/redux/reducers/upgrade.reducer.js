
const upgradeList = {
    autoClicker: {
        id: 1,
        bought: false,
        cost: 10,
    },
    clickMultiplier: {
        id: 2,
        bought: false,
        cost: 50,
        value: 1,
    },
}

const upgrades = (state = upgradeList, action) => {
    switch (action.type) {
        case "GET_UPGRADES":
            return state;    
        case "BUY_AUTO_CLICKER":
            return {
                ...state,
                autoClicker: {
                    bought: action.payload                    
                }
            };
        case "BUY_MULTIPLIER":
            let newState = {...state};
            return {
                ...state,
                clickMultiplier: {
                    id: action.payload.id,
                    bought: action.payload.bought,
                    value: newState.clickMultiplier.value * 2,
                    cost: Math.round(newState.clickMultiplier.cost * 1.5),
                }
            };
        default:
            return state;
    }
}

export default upgrades;