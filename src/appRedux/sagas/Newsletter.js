import {
  all, 
  fork, 
  put, 
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

import {showMessage} from "../actions/Common";

import {
  SEARCH_NEWSLETTER,
} from "constants/ActionTypes";

import {
  searchNewsletterSuccess,
} from "../actions/Newsletter";

import {WITH_CREDENTIALS} from "../../constants/Api";
import {API_SERVER} from "../../constants/Global";
import {unscramblePayloadToJSON} from "../../constants/Functions";

export default function* newsletterSagas() {
  yield all([
    fork(searchNewsletter),
  ]);
}

export function* searchNewsletter() {
  yield takeEvery(SEARCH_NEWSLETTER, search);
}

function* search({payload}) {
  try {
    console.log("calling endpoint /api/v1/newsletter/search ", payload)
    const {data} = yield axios.post(API_SERVER+"/api/v1/newsletter/search",
    payload,
    {withCredentials: WITH_CREDENTIALS,
      responseType: 'arraybuffer'
    });
    yield put(searchNewsletterSuccess({
      searchResults: unscramblePayloadToJSON(data),
      searchFilters: payload,
    }));
  } catch (error) {
    yield put(showMessage("sessione scaduta"));
  }
}

