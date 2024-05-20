import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router'

import Settings from "./Settings";
import Common from "./Common";
import Auth from "./Auth";
import Users from "./Users";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  common: Common,
  auth: Auth,
  usersStore: Users,
});

export default createRootReducer;
