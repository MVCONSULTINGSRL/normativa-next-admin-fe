import {
  all, 
  fork, 
  put, 
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

import {showMessage} from "../../appRedux/actions/Common";


import {
  GET_DATIGRAFICO,
} from "constants/ActionTypes";

import {
  getDatiGraficoSuccess,
} from "../actions/Grafici";

import {WITH_CREDENTIALS} from "../../constants/Api";
import {API_SERVER} from "../../constants/Global";
import {unscramblePayloadToJSON} from "../../constants/Functions";

export default function* rootSaga() {
  yield all([
    fork(watchGetDatiGrafico),
  ]);
}

export function* watchGetDatiGrafico() {
  //console.log("- Sagas watchGetDatiGrafico - invoked")
  yield takeEvery(GET_DATIGRAFICO, fetchDatiGrafico);
}


function* fetchDatiGrafico(action) {

  //console.log("- Sagas fetchDatiGrafico - invoked with ", action)

  try {

    const {data} = yield axios.get(API_SERVER+"/api/v1/"+action.payload+"/grafico",
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    })
    yield put(getDatiGraficoSuccess({
          dati: unscramblePayloadToJSON(data),  
          category: action.payload,
        }));
  } catch (error) {
    yield put(showMessage("sessione scaduta"));
  }
}
