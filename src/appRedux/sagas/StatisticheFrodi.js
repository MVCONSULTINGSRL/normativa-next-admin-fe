import {
  all, 
  fork, 
  put, 
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

import {
  STATISTICHE_FRODI,
  STATISTICHE_FRODI_DETTAGLIO,
} from "constants/ActionTypes";

import {
  statisticheFrodiSuccess,
  statisticheFrodiDettaglioSuccess,
} from "../actions/StatisticheFrodi";

import {WITH_CREDENTIALS} from "../../constants/Api";
import {API_SERVER} from "../../constants/Global";
import {unscramblePayloadToJSON} from "../../constants/Functions";

export default function* rootSaga() {
  yield all([
    fork(statistiche), 
    fork(statisticheDettaglio),
  ]);
}

export function* statistiche() {
  yield takeEvery(STATISTICHE_FRODI, search);
}

export function* statisticheDettaglio() {
  yield takeEvery(STATISTICHE_FRODI_DETTAGLIO, searchDettaglio);
}

function* search({payload}) {
  try {
    const {data} = yield axios.post(API_SERVER+"/api/v1/frodi/statistica",
    payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(statisticheFrodiSuccess({
      searchResults: unscramblePayloadToJSON(data),
      searchFilters: payload,
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}

function* searchDettaglio({payload}) {
  try {
    const {data} = yield axios.post(API_SERVER+"/api/v1/frodi/statistica/dettaglio",
    payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(statisticheFrodiDettaglioSuccess({
      searchResults: unscramblePayloadToJSON(data),
      searchFilters: payload,
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}

