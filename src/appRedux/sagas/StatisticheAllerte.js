import {
  all, 
  fork, 
  put, 
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

import {
  STATISTICHE,
  STATISTICHE_ALLERTE_DETTAGLIO,
} from "constants/ActionTypes";

import {
  statisticheSuccess,
  statisticheAllerteDettaglioSuccess
} from "../actions/StatisticheAllerte";

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
  yield takeEvery(STATISTICHE, search);
}

export function* statisticheDettaglio() {
  yield takeEvery(STATISTICHE_ALLERTE_DETTAGLIO, searchDettaglio);
}

function* search({payload}) {
  try {
    const {data} = yield axios.post(API_SERVER+"/api/v1/allerte/statistica",
    payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(statisticheSuccess({
      searchResults: unscramblePayloadToJSON(data),
      searchFilters: payload,
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}

function* searchDettaglio({payload}) {
  try {
    const {data} = yield axios.post(API_SERVER+"/api/v1/allerte/statistica/dettaglio",
    payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(statisticheAllerteDettaglioSuccess({
      searchResults: unscramblePayloadToJSON(data),
      searchFilters: payload,
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}
