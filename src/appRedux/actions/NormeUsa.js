import {
  GET_NORMAUSA,
  GET_NORMAUSA_SUCCESS,
  GET_LIST_NORMEUSA,
  GET_LIST_NORMEUSA_SUCCESS,
  SEARCH_NORMEUSA,
  SEARCH_NORMEUSA_SUCCESS,  
} from "constants/ActionTypes";

export const getNormaUsa = (normaUsaId) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: GET_NORMAUSA,
    payload: normaUsaId
  };
};

export const getNormaUsaSuccess = (normaUsa) => {
  localStorage.setItem(normaUsa['normaUsa']['hash'],JSON.stringify(normaUsa))
  return {
    type: GET_NORMAUSA_SUCCESS,
    payload: normaUsa
  }
};

export const getListNormeUsa = (year) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: GET_LIST_NORMEUSA,
    payload: year
  };
};

export const getListNormeUsaSuccess = (listNormeUsa) => {
  return {
    type: GET_LIST_NORMEUSA_SUCCESS,
    payload: listNormeUsa
  }
};

export const searchNormeUsa = (searchFilters) => {
  //console.log("Search norme payload is ", filters)
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: SEARCH_NORMEUSA,
    payload: searchFilters
  };
};

export const searchNormeUsaSuccess = (listNormeUsa) => {
  return {
    type: SEARCH_NORMEUSA_SUCCESS,
    payload: listNormeUsa
  }
};