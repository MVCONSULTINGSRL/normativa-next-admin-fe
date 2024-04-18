import {
  all, 
  fork, 
  put, 
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

import {showMessage} from "../actions/Common";

import {
  GET_MAPPA,
} from "constants/ActionTypes";

import {
  getMappaSuccess,
} from "../actions/Mappe";

import {WITH_CREDENTIALS} from "../../constants/Api";
import {API_SERVER} from "../../constants/Global";
import {unscramblePayloadToJSON} from "../../constants/Functions";

export default function* rootSaga() {
  yield all([
    fork(watchGetDatiMappa),
  ]);
}

export function* watchGetDatiMappa() {
  //console.log("- Sagas watchGetDatiMappa - invoked")
  yield takeEvery(GET_MAPPA, fetchDatiMappa);
}

// fetch dtai mappa home page per area (action.payload)
function* fetchDatiMappa(action) {

  //console.log("- Sagas fetchDatiMappa - invoked with ", action)

  try {
    const {data} = yield axios.get(API_SERVER+"/api/v1/"+action.payload+"/mappa",
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    })
    yield put(getMappaSuccess({
          dati: unscramblePayloadToJSON(data),
          category: action.payload,  
        }));
  } catch (error) {
    yield put(showMessage("sessione scaduta"));
  }
}
