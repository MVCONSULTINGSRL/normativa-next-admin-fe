import {
  all, 
  fork, 
  put, 
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

import {
  GET_RITIRO,
  GET_LIST_RITIRI,
  SEARCH_RITIRI,  
} from "constants/ActionTypes";

import {
  getRitiroSuccess,
  getListRitiriSuccess,
  searchRitiriSuccess,  
} from "../actions/Ritiri";

import {WITH_CREDENTIALS} from "../../constants/Api";
import {API_SERVER} from "../../constants/Global";
import {unscramblePayloadToJSON} from "../../constants/Functions";

export default function* rootSaga() {
  yield all([
    fork(getRitiro),
    fork(getListRitiri),
    fork(searchRitiri),      
  ]);
}

export function* searchRitiri() {
  yield takeEvery(SEARCH_RITIRI, search);
}

export function* getListRitiri() {
  yield takeEvery(GET_LIST_RITIRI, getRitiriByYear);
}

export function* getRitiro() {
  yield takeEvery(GET_RITIRO, getRitiroById);
}

function* search({payload}) {
  try {
    const {data} = yield axios.post(API_SERVER+"/api/v1/ritiri/search",
    payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(searchRitiriSuccess({
      searchResults: unscramblePayloadToJSON(data),
      searchFilters: payload,
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}

function* getRitiriByYear({payload}) {
  try {

    // qui il payload dovrebbe essere inteso come il payload dell'azione richiesta (GET_NORMA) 
    // ovvero l'Id della norma
    const {data} = yield axios.get(API_SERVER+"/api/v1/ritiri/",
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });

    yield put(getListRitiriSuccess({
      listRitiri: unscramblePayloadToJSON(data),  
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}

function* getRitiroById({payload}) {

  try {

    // qui il payload dovrebbe essere inteso come il payload dell'azione richiesta (GET_NORMA) 
    // ovvero l'Id della norma
    const {data} = yield axios.get(API_SERVER+"/api/v1/ritiri/ritiro/?hash="+payload.ritiroId,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });

    yield put(getRitiroSuccess({
      ritiro: unscramblePayloadToJSON(data),  
    }));

  } catch (error) {
    console.log("--catching error", error);
  }
}
    
