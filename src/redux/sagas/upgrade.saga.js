import { put, takeLatest, takeEvery, delay, select } from "redux-saga/effects";

function* upgrades() {
  yield takeLatest("AUTO_CLICKER", autoClicker);
}

// saga that calls itself after its been dispatched to.
// calls add_click every n seconds.
function* autoClicker(action) {
  const multiplier = action.payload;
  yield delay(2000);
  yield put({ type: "ADD_CLICK", payload: multiplier });
  yield put({ type: "AUTO_CLICKER", payload: action.payload });
}

export default upgrades;
