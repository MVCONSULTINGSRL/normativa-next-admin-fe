import {
  GET_DATIGRAFICO,
  GET_DATIGRAFICO_SUCCESS,

} from "constants/ActionTypes";

export const getDatiGrafico = (category) => {
  //console.log("-Action getDatiGraficoAllerte- received")
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: GET_DATIGRAFICO,
    payload: category,
  };
};

export const getDatiGraficoSuccess = (dati) => {
  return {
    type: GET_DATIGRAFICO_SUCCESS,
    payload: dati
  }
};

