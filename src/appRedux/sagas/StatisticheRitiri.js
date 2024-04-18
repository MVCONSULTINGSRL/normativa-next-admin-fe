import {
  all, 
  fork, 
  put, 
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

import {
  STATISTICHE_RITIRI,
  STATISTICHE_RITIRI_DETTAGLIO,
} from "constants/ActionTypes";

import {
  statisticheRitiriSuccess,
  statisticheRitiriDettaglioSuccess,
} from "../actions/StatisticheRitiri";

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
  yield takeEvery(STATISTICHE_RITIRI, search);
}

export function* statisticheDettaglio() {
  yield takeEvery(STATISTICHE_RITIRI_DETTAGLIO, searchDettaglio);
}

function* search({payload}) {
  try {
    const {data} = yield axios.post(API_SERVER+"/api/v1/ritiri/statistica",
    payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(statisticheRitiriSuccess({
      searchResults: unscramblePayloadToJSON(data),
      searchFilters: payload,
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}


function* searchDettaglio({payload}) {
  try {
    const {data} = yield axios.post(API_SERVER+"/api/v1/ritiri/statistica/dettaglio",
    payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(statisticheRitiriDettaglioSuccess({
      searchResults: unscramblePayloadToJSON(data),
      searchFilters: payload,
    }));
  } catch (error) {
    console.log("--catching error", error);
  }
}

