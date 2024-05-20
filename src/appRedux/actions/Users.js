import {
    GET_EXPIRING_USERS,
    GET_EXPIRING_USERS_SUCCESS,
  
  } from "constants/ActionTypes";
  
  export const getExpiringUsers = (months) => {
    console.log("getExpiringUsers() called with ", months)
    return {
      type: GET_EXPIRING_USERS,
      payload: months,
    };
  };
  
  export const getExpiringUsersSuccess = (dati) => {
    console.log("getExpiringUsers() returns ", dati)
    return {
      type: GET_EXPIRING_USERS_SUCCESS,
      payload: dati
    }
  };