import { put, takeLatest, delay, select } from "redux-saga/effects";

function* upgrades() {
  yield takeLatest("AUTO_CLICKER", autoClicker);
  yield takeLatest("BUY_UPGRADE", checkPoints);
}

// checks if point value is enough for an upgrade.
function* checkPoints(action) {
  const state = yield select();
  const upgrades = state.upgrades;
  const points = state.countReducer.points;
  const id = action.payload;

  if (
    id === upgrades.autoClicker.id &&
    points >= upgrades.autoClicker.cost &&
    upgrades.autoClicker.bought === false
  ) {
    yield put({ type: "REDUCE_POINTS", payload: upgrades.autoClicker.cost });
    yield put({ type: "BUY_AUTO_CLICKER", payload: true });
    yield put({ type: "AUTO_CLICKER" });
  }
  if (
    id === upgrades.multiplier.id &&
    points >= upgrades.clickMultiplier.cost
  ) {
    yield put({
      type: "REDUCE_POINTS",
      payload: upgrades.clickMultiplier.cost,
    });
    yield put({ type: "BUY_CLICK_MULTIPLIER", payload: { bought: true, id } });
  }
}

// saga that calls itself after its been dispatched to.
// calls add_click every n seconds.
function* autoClicker() {
  const state = yield select();
  const multiplier = state.upgrades.clickMultiplier.value;
  yield delay(1000);
  yield put({ type: "ADD_CLICK" });
  yield put({ type: "AUTO_CLICKER", payload: multiplier });
}

export default upgrades;
