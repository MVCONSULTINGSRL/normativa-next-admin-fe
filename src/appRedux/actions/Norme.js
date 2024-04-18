import {
  GET_NORMA,
  GET_NORMA_SUCCESS,
  GET_LIST_NORME,
  GET_LIST_NORME_SUCCESS,
  SEARCH_NORME,
  SEARCH_NORME_SUCCESS,
} from "constants/ActionTypes";



export const getNorma = (normaId) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: GET_NORMA,
    payload: normaId
  };
};

export const getNormaSuccess = (norma) => {
  //console.log("getNormaSuccess called with ",norma)
  localStorage.setItem(norma['norma']['hash'],JSON.stringify(norma))
  return {
    type: GET_NORMA_SUCCESS,
    payload: norma
  }
};

export const getListNorme = (year) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: GET_LIST_NORME,
    payload: year
  };
};

export const getListNormeSuccess = (listNorme) => {
  return {
    type: GET_LIST_NORME_SUCCESS,
    payload: listNorme
  }
};

export const searchNorme = (searchFilters) => {
  //console.log("Search norme payload is ", filters)
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: SEARCH_NORME,
    payload: searchFilters
  };
};

export const searchNormeSuccess = (listNorme) => {
  return {
    type: SEARCH_NORME_SUCCESS,
    payload: listNorme
  }
};