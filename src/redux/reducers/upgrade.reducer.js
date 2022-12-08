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
  pointMultiplier: {
    id: 3,
    bought: false,
    cost: 75,
    value: 1,
  },
};

const upgrades = (state = upgradeList, action) => {
  switch (action.type) {
    case "GET_UPGRADES":
      return state;
    case "BUY_AUTO_CLICKER":
      return {
        ...state,
        autoClicker: {
          bought: action.payload,
        },
      };
    case "BUY_CLICK_MULTIPLIER":
      let clickMultState = { ...state };
      return {
        ...state,
        clickMultiplier: {
          id: action.payload.id,
          bought: action.payload.bought,
          value: clickMultState.clickMultiplier.value * 2,
          cost: Math.round(clickMultState.clickMultiplier.cost * 1.5),
        },
      };
      case "BUY_POINT_MULTIPLIER":
        let pointMultState = {...state};
        return {
            ...state,
            pointMultiplier: {
                id: action.payload.id,
                bought: action.payload.bought,
                value: Math.round(pointMultState.pointMultiplier.value * 1.5),
                cost: Math.round(pointMultState.pointMultiplier.cost * 1.8),
            },
        };
    default:
      return state;
  }
};

export default upgrades;
