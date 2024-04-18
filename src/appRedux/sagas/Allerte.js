import {
  all, 
  fork, 
  put, 
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

import {showMessage} from "../../appRedux/actions/Common";

import {
  GET_ALLERTA,
  GET_LIST_ALLERTE,
  SEARCH_ALLERTE,
} from "constants/ActionTypes";

import {
  getAllertaSuccess,
  getListAllerteSuccess,
  searchAllerteSuccess,
} from "../actions/Allerte";

import {WITH_CREDENTIALS} from "../../constants/Api";
import {API_SERVER} from "../../constants/Global";
import {unscramblePayloadToJSON} from "../../constants/Functions";

export default function* rootSaga() {
  yield all([
    fork(getAllerta),
    fork(getListAllerte),
    fork(searchAllerte),    
  ]);
}

export function* searchAllerte() {
  yield takeEvery(SEARCH_ALLERTE, search);
}

export function* getListAllerte() {
  yield takeEvery(GET_LIST_ALLERTE, getAllerteByYear);
}

export function* getAllerta() {
  yield takeEvery(GET_ALLERTA, getAllertaById);
}

function* search({payload}) {
  try {
    const {data} = yield axios.post(API_SERVER+"/api/v1/allerte/search",
    payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(searchAllerteSuccess({
      searchResults: unscramblePayloadToJSON(data),
      searchFilters: payload,
    }));
  } catch (error) {
    yield put(showMessage("sessione scaduta"));
    //console.log("--catching error", error);
  }
}

function* getAllerteByYear({payload}) {
  try {

    // qui il payload dovrebbe essere inteso come il payload dell'azione richiesta (GET_NORMA) 
    // ovvero l'Id della norma
    const {data} = yield axios.get(API_SERVER+"/api/v1/allerte/",
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });

    yield put(getListAllerteSuccess({
      listAllerte: unscramblePayloadToJSON(data),  
    }));
  } catch (error) {
    yield put(showMessage("sessione scaduta"));
    //console.log("--catching error", error);
  }
}

function* getAllertaById({payload}) {

  try {

    // qui il payload dovrebbe essere inteso come il payload dell'azione richiesta (GET_NORMA) 
    // ovvero l'Id della norma
    const {data} = yield axios.get(API_SERVER+"/api/v1/allerte/allerta/?hash="+payload.allertaId,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });

    yield put(getAllertaSuccess({
      allerta: unscramblePayloadToJSON(data),  
    }));

  } catch (error) {
    yield put(showMessage("sessione scaduta"));
    //console.log("--catching error", error);
  }
}
    
