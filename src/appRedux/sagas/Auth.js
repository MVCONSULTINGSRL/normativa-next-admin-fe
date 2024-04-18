import {all, fork, put, takeEvery} from "redux-saga/effects";
import axios from "axios";

import {
  SIGNIN_USER,
  SIGNOUT_USER,
} from "constants/ActionTypes";

import {showAuthMessage, userSignInSuccess, userSignOutSuccess} from "../../appRedux/actions/Auth";
import {hideSpinner} from "../../appRedux/actions/Common";

import {WITH_CREDENTIALS } from "../../constants/Api";
import {API_SERVER} from "../../constants/Global";
import { unscramblePayloadToJSON } from "../../constants/Functions";

function* signOut() {
  localStorage.clear();
  /**
  localStorage.removeItem('user');
  localStorage.removeItem('menu');
  localStorage.removeItem('categorie');
  localStorage.removeItem('countries');
  localStorage.removeItem('pericoli');
   */

  yield put(userSignOutSuccess(signOutUser));
}

function* signInUserWithEmailPassword({payload}) {
  localStorage.clear();
  try {
    const {data} = yield axios.post(API_SERVER+"/api/admin/authenticate",
      payload,
      {withCredentials: WITH_CREDENTIALS,
        responseType: 'arraybuffer'
    });

    if (data.message)  {
      yield put(showAuthMessage(data.message));
    } else {


      localStorage.setItem('user', JSON.stringify(unscramblePayloadToJSON(data)))
      var item_value = JSON.parse(localStorage.getItem("user"));





      yield put(userSignInSuccess({

        username: item_value.username,  
        email: item_value.email,
      }));



    }
  } catch (error) {
    console.log("--catching error", error);
    yield put (hideSpinner("Errore durante l'autenticazione"));
    switch (error.response.status) {
      default : 
        yield put(showAuthMessage("credenziali non valide"));
    }
 
  }
}
    
export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
  yield all([fork(signInUser),
    fork(signOutUser)]);
}
