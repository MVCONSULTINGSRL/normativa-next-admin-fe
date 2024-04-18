import {
  all, 
  fork, 
  put, 
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

import {
  GET_NORMAUSA,
  GET_LIST_NORMEUSA,
  SEARCH_NORMEUSA,
} from "constants/ActionTypes";

import {
  getNormaUsaSuccess,
  getListNormeUsaSuccess,
  searchNormeUsaSuccess,
} from "../actions/NormeUsa";

import {WITH_CREDENTIALS} from "../../constants/Api";
import {API_SERVER} from "../../constants/Global";
import {unscramblePayloadToJSON} from "../../constants/Functions";

export default function* rootSaga() {
  yield all([
    fork(getNormaUsa),
    fork(getListNormeUsa),
    fork(searchNormeUsa),      
  ]);
}

export function* searchNormeUsa() {
  yield takeEvery(SEARCH_NORMEUSA, search);
}

export function* getListNormeUsa() {
  yield takeEvery(GET_LIST_NORMEUSA, getNormeUsaByYear);
}

export function* getNormaUsa() {
  yield takeEvery(GET_NORMAUSA, getNormaUsaById);
}

function* search({payload}) {
  try {
    const {data} = yield axios.post(API_SERVER+"/api/v1/normeusa/search",
    payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(searchNormeUsaSuccess({
      searchResults: unscramblePayloadToJSON(data),
      searchFilters: payload,
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}

function* getNormeUsaByYear({payload}) {
  try {

    // qui il payload dovrebbe essere inteso come il payload dell'azione richiesta (GET_NORMA) 
    // ovvero l'Id della norma
    const {data} = yield axios.get(API_SERVER+"/api/v1/normeusa/",
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });

    yield put(getListNormeUsaSuccess({
      listNormeUsa: unscramblePayloadToJSON(data),  
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}

function* getNormaUsaById({payload}) {

  try {
    const {data} = yield axios.get(API_SERVER+"/api/v1/normeusa/normausa/?hash="+payload.normaUsaId,
    { withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });

    yield put(getNormaUsaSuccess({
      normaUsa: unscramblePayloadToJSON(data),  
    }));

  } catch (error) {
    console.log("--catching error", error);
  }
}
    
