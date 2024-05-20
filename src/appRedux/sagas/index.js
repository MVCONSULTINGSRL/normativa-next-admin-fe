import {all} from "redux-saga/effects";
import authSagas from "./Auth";
import usersSagas from "./Users";


export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    usersSagas(),
  ]);
}
