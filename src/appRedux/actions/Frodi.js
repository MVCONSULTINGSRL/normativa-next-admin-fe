import {
  GET_FRODE,
  GET_FRODE_SUCCESS,
  GET_LIST_FRODI,
  GET_LIST_FRODI_SUCCESS,
  SEARCH_FRODI,
  SEARCH_FRODI_SUCCESS,  

} from "constants/ActionTypes";

export const getFrode = (frodeId) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: GET_FRODE,
    payload: frodeId
  };
};

export const getFrodeSuccess = (frode) => {
  localStorage.setItem(frode['frode']['hash'],JSON.stringify(frode))
  return {
    type: GET_FRODE_SUCCESS,
    payload: frode
  }
};

export const getListFrodi = (year) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: GET_LIST_FRODI,
    payload: year
  };
};

export const getListFrodiSuccess = (listFrodi) => {
  return {
    type: GET_LIST_FRODI_SUCCESS,
    payload: listFrodi
  }
};

export const searchFrodi = (searchFilters) => {
  //console.log("Search norme payload is ", filters)
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: SEARCH_FRODI,
    payload: searchFilters
  };
};

export const searchFrodiSuccess = (listFrodi) => {
  return {
    type: SEARCH_FRODI_SUCCESS,
    payload: listFrodi
  }
};