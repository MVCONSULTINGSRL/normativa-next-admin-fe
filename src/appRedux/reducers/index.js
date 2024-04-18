import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router'

import Settings from "./Settings";
import Common from "./Common";
import Auth from "./Auth";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  common: Common,
  auth: Auth,
});

export default createRootReducer;
