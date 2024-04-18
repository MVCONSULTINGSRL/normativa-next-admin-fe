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
    const {data} = yield axios.post(API_SERVER+"/api/v1/users/authenticate",
      payload,
      {withCredentials: WITH_CREDENTIALS,
        responseType: 'arraybuffer'
    });

    if (data.message)  {
      yield put(showAuthMessage(data.message));
    } else {


      localStorage.setItem('user', JSON.stringify(unscramblePayloadToJSON(data)))
      var item_value = JSON.parse(localStorage.getItem("user"));

      try{
        const {data} = yield axios.get(API_SERVER+"/api/v1/menu/"+item_value.hash,
        {
          withCredentials: WITH_CREDENTIALS,
          responseType: 'arraybuffer'
        }); 
        
        localStorage.setItem('menu', JSON.stringify(unscramblePayloadToJSON(data)))
      }catch(err){
        console.error(err);
      }

      try{
        const {data} = yield axios.get(API_SERVER+"/api/v1/categoria/list",
        {
          withCredentials: WITH_CREDENTIALS,
          responseType: 'arraybuffer'
        }); 
        
        //console.log("categorie ", data)
        localStorage.setItem('categorie', JSON.stringify(unscramblePayloadToJSON(data)))
      }catch(err){
        console.error(err);
      }

      try{
        const {data} = yield axios.get(API_SERVER+"/api/v1/country/list",
        {
          withCredentials: WITH_CREDENTIALS,
          responseType: 'arraybuffer'
        }); 
        
        localStorage.setItem('countries', JSON.stringify(unscramblePayloadToJSON(data)))
      }catch(err){
        console.error(err);
      }

      try{
        const {data} = yield axios.get(API_SERVER+"/api/v1/pericolo/list",
        {
          withCredentials: WITH_CREDENTIALS,
          responseType: 'arraybuffer'
        }); 
        
        localStorage.setItem('pericoli', JSON.stringify(unscramblePayloadToJSON(data)))
      }catch(err){
        console.error(err);
      }

      yield put(userSignInSuccess({

        username: item_value.username,  
        email: item_value.email,
        azienda: item_value.azienda,
        nome: item_value.nome,
        cognome: item_value.cognome,
        licenza: item_value.licenza,
        scadenza: item_value.data_scadenza,
        pacchetti_aggiuntivi: item_value.pacchetti_aggiuntivi,
        expired: item_value.expired
      }));



    }
  } catch (error) {
    console.log("--catching error", error);
    yield put (hideSpinner("Errore durante l'autenticazione"));
    switch (error.response.status) {
      case 402 : //payment required 
        yield put(showAuthMessage("licenza scaduta"));
        break;
      case 428 : //precondition falied 
        yield put(showAuthMessage("hai superato il numero massimo di dispositivi consentiti"));
        break;
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
