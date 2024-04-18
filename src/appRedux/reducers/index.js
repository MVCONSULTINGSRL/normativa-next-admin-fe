import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router'

import Settings from "./Settings";
import Common from "./Common";
import Auth from "./Auth";
import NormaReducer from "./Norme";
import AllertaReducer from "./Allerte";
import Sentenze from "./Sentenze";
import Ritiri from "./Ritiri";
import Frodi from "./Frodi";
import NormeUsa from "./NormeUsa";
import Grafici from "./Grafici";
import Mappe from "./Mappe";
import Statistiche from "./StatisticheAllerte";
import StatisticheFrodi from "./StatisticheFrodi";
import StatisticheRitiri from "./StatisticheRitiri";
import NewsletterReducer from "./Newsletter";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  common: Common,
  auth: Auth,
  normeStore: NormaReducer,
  allerteStore: AllertaReducer,
  sentenzeStore: Sentenze,
  ritiriStore: Ritiri,
  frodiStore: Frodi,
  normeUsaStore: NormeUsa,
  graficiStore: Grafici,
  mappeStore: Mappe,
  statisticheAllerteStore: Statistiche,
  statisticheFrodiStore: StatisticheFrodi,
  statisticheRitiriStore: StatisticheRitiri,
  newsletterStore: NewsletterReducer,
});

export default createRootReducer;
