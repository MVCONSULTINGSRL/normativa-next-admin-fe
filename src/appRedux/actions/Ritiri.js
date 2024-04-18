import {
  GET_RITIRO,
  GET_RITIRO_SUCCESS,
  GET_LIST_RITIRI,
  GET_LIST_RITIRI_SUCCESS,
  SEARCH_RITIRI,
  SEARCH_RITIRI_SUCCESS,  
} from "constants/ActionTypes";

export const getRitiro = (ritiroId) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: GET_RITIRO,
    payload: ritiroId
  };
};

export const getRitiroSuccess = (ritiro) => {
  localStorage.setItem(ritiro['ritiro']['hash'],JSON.stringify(ritiro))

  return {
    type: GET_RITIRO_SUCCESS,
    payload: ritiro
  }
};


export const getListRitiri = (year) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: GET_LIST_RITIRI,
    payload: year
  };
};

export const getListRitiriSuccess = (listRitiri) => {
  return {
    type: GET_LIST_RITIRI_SUCCESS,
    payload: listRitiri
  }
};

export const searchRitiri = (searchFilters) => {
  //console.log("Search norme payload is ", filters)
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: SEARCH_RITIRI,
    payload: searchFilters
  };
};

export const searchRitiriSuccess = (listRitiri) => {
  return {
    type: SEARCH_RITIRI_SUCCESS,
    payload: listRitiri
  }
};