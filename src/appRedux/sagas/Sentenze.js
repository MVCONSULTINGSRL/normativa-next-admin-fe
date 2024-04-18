import {
  all, 
  fork, 
  put, 
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

import {
  GET_SENTENZA,
  GET_LIST_SENTENZE,
  SEARCH_SENTENZE,
} from "constants/ActionTypes";

import {
  getSentenzaSuccess,
  getListSentenzeSuccess,
  searchSentenzeSuccess,
} from "../actions/Sentenze";

import {WITH_CREDENTIALS} from "../../constants/Api";
import {API_SERVER} from "../../constants/Global";
import {unscramblePayloadToJSON} from "../../constants/Functions";

export default function* rootSaga() {
  yield all([
    fork(getSentenza),
    fork(getListSentenze),
    fork(searchSentenze), 
  ]);
}

export function* searchSentenze() {
  yield takeEvery(SEARCH_SENTENZE, search);
}

export function* getListSentenze() {
  yield takeEvery(GET_LIST_SENTENZE, getSentenzeByYear);
}

export function* getSentenza() {
  yield takeEvery(GET_SENTENZA, getSentenzaById);
}

function* search({payload}) {
  try {
    const {data} = yield axios.post(API_SERVER+"/api/v1/sentenze/search",
    payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(searchSentenzeSuccess({
      searchResults: unscramblePayloadToJSON(data),
      searchFilters: payload,
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}

function* getSentenzeByYear({payload}) {
  try {

    // qui il payload dovrebbe essere inteso come il payload dell'azione richiesta (GET_NORMA) 
    // ovvero l'Id della norma
    const {data} = yield axios.get(API_SERVER+"/api/v1/sentenze/",
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });

    yield put(getListSentenzeSuccess({
      listSentenze: unscramblePayloadToJSON(data),  
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}

function* getSentenzaById({payload}) {

  try {

    // qui il payload dovrebbe essere inteso come il payload dell'azione richiesta (GET_NORMA) 
    // ovvero l'Id della norma
    const {data} = yield axios.get(API_SERVER+"/api/v1/sentenze/sentenza/?hash="+payload.sentenzaId,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });

    yield put(getSentenzaSuccess({
      sentenza: unscramblePayloadToJSON(data),  
    }));

  } catch (error) {
    console.log("--catching error", error);
  }
}
