import {
    all, 
    fork, 
    put, 
    takeEvery
} from "redux-saga/effects";
  
import axios from "axios";

import {
  GET_EXPIRING_USERS,
} from "constants/ActionTypes";

import {
  getExpiringUsersSuccess,
} from "../actions";

import {WITH_CREDENTIALS } from "../../constants/Api";
import {API_SERVER} from "../../constants/Global";
import { unscramblePayloadToJSON } from "../../constants/Functions";

import {showMessage} from "../../appRedux/actions/Common";

export default function* rootSaga() {
    yield all([
      fork(getExpiringUsers),    
    ]);
}

export function* getExpiringUsers() {
  yield takeEvery(GET_EXPIRING_USERS, expiring_users);
}

function* expiring_users({payload}) {
  console.log("expiring_users payload ", payload)
  try {
    const {data} = yield axios.get(API_SERVER+"/api/admin/user/expiring?months="+payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(getExpiringUsersSuccess({
      dati: unscramblePayloadToJSON(data),
    }));
  } catch (error) {
    yield put(showMessage("sessione scaduta"));
    //console.log("--catching error", error);
  }
}
