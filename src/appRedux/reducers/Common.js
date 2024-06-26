import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, HIDE_MESSAGE, SHOW_MESSAGE, SHOW_SPINNER, HIDE_SPINNER} from '../../constants/ActionTypes'
import {TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH} from "../../constants/ActionTypes";

const INIT_STATE = {
  error: "",
  loading: false,
  message: '',
  navCollapsed: true,
  width: window.innerWidth,
  pathname: '/',
  spinner: {show:false, message:""}
};

const CommonReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      return {
        ...state,
        pathname: action.payload.location.pathname,
        navCollapsed: false
      }
    }
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
      };
    case TOGGLE_COLLAPSED_NAV: {
      return {
        ...state,
        navCollapsed: action.navCollapsed
      }
    }
    case FETCH_START: {
      return {...state, error: '', message: '', loading: true};
    }
    case FETCH_SUCCESS: {
      return {...state, error: '', message: '', loading: false};
    }
    case SHOW_MESSAGE: {
      return {...state, error: '', message: action.payload, loading: false};
    }
    case FETCH_ERROR: {
      return {...state, loading: false, error: action.payload, message: ''};
    }
    case HIDE_MESSAGE: {
      return {...state, loading: false, error: '', message: ''};
    }
    case SHOW_SPINNER: {
      console.log("#### SHOW_SPINNER with message [",action.payload,"]")
      return {...state, spinner:{show:true, message:action.payload}};
    }
    case HIDE_SPINNER: {
      console.log("#### HIDE_SPINNER with message [",action.payload,"]")
      return {...state, spinner: {show:false,message:action.payload}};
    }
    default:
      return state;
  }
}

export default CommonReducer;
