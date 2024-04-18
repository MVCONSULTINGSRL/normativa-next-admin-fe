import {
  GET_SENTENZA,
  GET_SENTENZA_SUCCESS,
  GET_LIST_SENTENZE,
  GET_LIST_SENTENZE_SUCCESS,
  SEARCH_SENTENZE,
  SEARCH_SENTENZE_SUCCESS,  

} from "constants/ActionTypes";


export const getSentenza = (sentenzaId) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: GET_SENTENZA,
    payload: sentenzaId
  };
};

export const getSentenzaSuccess = (sentenza) => {
  localStorage.setItem(sentenza['sentenza']['hash'],JSON.stringify(sentenza))
  return {
    type: GET_SENTENZA_SUCCESS,
    payload: sentenza
  }
};

export const getListSentenze = (year) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: GET_LIST_SENTENZE,
    payload: year
  };
};

export const getListSentenzeSuccess = (listSentenze) => {
  return {
    type: GET_LIST_SENTENZE_SUCCESS,
    payload: listSentenze
  }
};

export const searchSentenze = (searchFilters) => {
  //console.log("Search norme payload is ", filters)
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: SEARCH_SENTENZE,
    payload: searchFilters
  };
};

export const searchSentenzeSuccess = (listSentenze) => {
  return {
    type: SEARCH_SENTENZE_SUCCESS,
    payload: listSentenze
  }
};