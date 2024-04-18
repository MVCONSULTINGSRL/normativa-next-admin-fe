import {
  GET_MAPPA,
  GET_MAPPA_SUCCESS,
} from "constants/ActionTypes";

export const getMappa = (category) => {
  //console.log("- Action getMappa - received with payload ", category)
  return {
    type: GET_MAPPA,
    payload: category
  };
};

export const getMappaSuccess = (dati) => {
  //console.log("- getMappaSuccess - invoked with " ,dati)
  return {
    type: GET_MAPPA_SUCCESS,
    payload: dati
  }
};
