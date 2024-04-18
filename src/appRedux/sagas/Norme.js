import {
  all, 
  fork, 
  put, 
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

import {showMessage} from "../../appRedux/actions/Common";

import {
  GET_NORMA,
  GET_LIST_NORME,
  SEARCH_NORME,
} from "constants/ActionTypes";

import {
  getNormaSuccess,
  getListNormeSuccess,
  searchNormeSuccess,
} from "../actions/Norme";

import {WITH_CREDENTIALS} from "../../constants/Api";
import {API_SERVER} from "../../constants/Global";
import {unscramblePayloadToJSON} from "../../constants/Functions";

export default function* rootSaga() {
  yield all([
    fork(getNorma),
    fork(getListNorme),
    fork(searchNorme),
  ]);
}

export function* searchNorme() {
  yield takeEvery(SEARCH_NORME, search);
}

export function* getListNorme() {
  yield takeEvery(GET_LIST_NORME, getNormeByYear);
}

export function* getNorma() {
  yield takeEvery(GET_NORMA, getNormaById);
}

function* search({payload}) {
  try {
    const {data} = yield axios.post(API_SERVER+"/api/v1/norme/search",
    payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(searchNormeSuccess({
      searchResults: unscramblePayloadToJSON(data),
      searchFilters: payload,
    }));
  } catch (error) {
    yield put(showMessage("sessione scaduta"));
  }
}

function* getNormeByYear({payload}) {
  try {

    // qui il payload dovrebbe essere inteso come il payload dell'azione richiesta (GET_NORMA) 
    // ovvero l'Id della norma
    const {data} = yield axios.get(API_SERVER+"/api/v1/norme/",
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });

    yield put(getListNormeSuccess({
      listNorme: unscramblePayloadToJSON(data),  
    }));
  } catch (error) {
    yield put(showMessage("sessione scaduta"));
  }
}

function* getNormaById({payload}) {

  try {

    // qui il payload dovrebbe essere inteso come il payload dell'azione richiesta (GET_NORMA) 
    // ovvero l'Id della norma
    const {data} = yield axios.get(API_SERVER+"/api/v1/norme/norma?hash="+payload.normaId,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });

    yield put(getNormaSuccess({
      norma: unscramblePayloadToJSON(data),  
    }));
  } catch (error) {
    yield put(showMessage("sessione scaduta"));
  }
}
