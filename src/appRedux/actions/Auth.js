import {
  HIDE_MESSAGE,
  INIT_URL,
  SHOW_MESSAGE,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
} from "constants/ActionTypes";


// userSignIn is an "action creator"
export const userSignIn = (user) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: SIGNIN_USER,
    payload: user
  };
};
export const userSignOut = () => {
  return {
    type: SIGNOUT_USER
  };
};
export const userSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: authUser
  }
};
export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  }
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};


export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};
