import {
  all, 
  fork, 
  put, 
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

import {
  GET_FRODE,
  GET_LIST_FRODI,
  SEARCH_FRODI,
} from "constants/ActionTypes";

import {
  getFrodeSuccess,
  getListFrodiSuccess,
  searchFrodiSuccess,
} from "../actions/Frodi";

import {WITH_CREDENTIALS} from "../../constants/Api";
import {API_SERVER} from "../../constants/Global";
import {unscramblePayloadToJSON} from "../../constants/Functions";

export default function* rootSaga() {
  yield all([
    fork(getFrode),
    fork(getListFrodi),
    fork(searchFrodi),      
  ]);
}

export function* searchFrodi() {
  yield takeEvery(SEARCH_FRODI, search);
}

export function* getListFrodi() {
  yield takeEvery(GET_LIST_FRODI, getFrodiByYear);
}

export function* getFrode() {
  yield takeEvery(GET_FRODE, getFrodeById);
}

function* search({payload}) {
  console.log("Frodi search payload is ", payload)
  try {
    const {data} = yield axios.post(API_SERVER+"/api/v1/frodi/search",
    payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(searchFrodiSuccess({
      searchResults: unscramblePayloadToJSON(data),
      searchFilters: payload,
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}

function* getFrodiByYear({payload}) {
  try {

    // qui il payload dovrebbe essere inteso come il payload dell'azione richiesta (GET_NORMA) 
    // ovvero l'Id della norma
    const {data} = yield axios.get(API_SERVER+"/api/v1/frodi/",
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });

    yield put(getListFrodiSuccess({
      listFrodi: unscramblePayloadToJSON(data),  
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}

function* getFrodeById({payload}) {

  try {

    // qui il payload dovrebbe essere inteso come il payload dell'azione richiesta (GET_NORMA) 
    // ovvero l'Id della norma
    const {data} = yield axios.get(API_SERVER+"/api/v1/frodi/frode/?hash="+payload.frodeId,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(getFrodeSuccess({
      frode: unscramblePayloadToJSON(data),  
    }));

  } catch (error) {
    console.log("--catching error", error);
  }
}
    
