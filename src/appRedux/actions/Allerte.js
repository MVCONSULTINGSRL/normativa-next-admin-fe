import {
  GET_ALLERTA,
  GET_ALLERTA_SUCCESS,
  GET_LIST_ALLERTE,
  GET_LIST_ALLERTE_SUCCESS,
  SEARCH_ALLERTE,
  SEARCH_ALLERTE_SUCCESS,  
} from "constants/ActionTypes";

export const getAllerta = (allertaId) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: GET_ALLERTA,
    payload: allertaId
  };
};

export const getAllertaSuccess = (allerta) => {
  localStorage.setItem(allerta['allerta']['hash'],JSON.stringify(allerta))
  return {
    type: GET_ALLERTA_SUCCESS,
    payload: allerta
  }
};

export const getListAllerte = (year) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: GET_LIST_ALLERTE,
    payload: year
  };
};

export const getListAllerteSuccess = (listAllerte) => {
  return {
    type: GET_LIST_ALLERTE_SUCCESS,
    payload: listAllerte
  }
};

export const searchAllerte = (searchFilters) => {
  //console.log("Search norme payload is ", filters)
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: SEARCH_ALLERTE,
    payload: searchFilters
  };
};

export const searchAllerteSuccess = (listAllerte) => {
  return {
    type: SEARCH_ALLERTE_SUCCESS,
    payload: listAllerte
  }
};