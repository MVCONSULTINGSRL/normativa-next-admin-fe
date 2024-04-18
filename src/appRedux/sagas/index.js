import {all} from "redux-saga/effects";
import authSagas from "./Auth";
import normaSagas from "./Norme";
import allertaSagas from "./Allerte";
import sentenzaSagas from "./Sentenze";
import ritiroSagas from "./Ritiri";
import frodeSagas from "./Frodi";
import normausaSagas from "./NormeUsa";
import graficiSagas from "./Grafici";
import mappeSagas from "./Mappe";
import statisticheSagas from "./StatisticheAllerte";
import statisticheFrodiSagas from "./StatisticheFrodi";
import statisticheRitiriSagas from "./StatisticheRitiri";
import newsletterSagas from "./Newsletter";


export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    normaSagas(),
    allertaSagas(),
    sentenzaSagas(),
    ritiroSagas(),
    frodeSagas(),
    normausaSagas(),
    graficiSagas(),
    mappeSagas(),
    statisticheSagas(),
    statisticheFrodiSagas(),
    statisticheRitiriSagas(),
    newsletterSagas(),
  ]);
}
