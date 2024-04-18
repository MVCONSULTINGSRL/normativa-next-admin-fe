import createSagaMiddleware from "redux-saga";
import {applyMiddleware,  createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import thunkMiddleware from 'redux-thunk';
import rootSaga from "../sagas/index";
import createRootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

/**
 * https://redux.js.org/usage/configuring-your-store
 * https://github.com/reduxjs/redux-devtools/tree/main/extension#installation
 * 
import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'
 */

const createBrowserHistory = require('history').createBrowserHistory;

export const history = createBrowserHistory();

const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunkMiddleware, sagaMiddleware, routeMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares)

const enhancers = [middlewareEnhancer]
const composeEnhancers = composeWithDevTools(...enhancers)

export default function configureStore(preloadedState = {}) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers
    /**
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        ...middlewares
      ),
    ),
     */
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
