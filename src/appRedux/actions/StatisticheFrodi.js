import {
  STATISTICHE_FRODI,
  STATISTICHE_FRODI_SUCCESS,  
  STATISTICHE_FRODI_DETTAGLIO,
  STATISTICHE_FRODI_DETTAGLIO_SUCCESS,

} from "constants/ActionTypes";

export const statisticheFrodi = (searchFilters) => {
  //console.log("Search norme payload is ", filters)
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: STATISTICHE_FRODI,
    payload: searchFilters
  };
};

export const statisticheFrodiSuccess = (datiStatistiche) => {
  return {
    type: STATISTICHE_FRODI_SUCCESS,
    payload: datiStatistiche
  }
};

export const statisticheFrodiDettaglio = (searchFilters) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: STATISTICHE_FRODI_DETTAGLIO,
    payload: searchFilters
  };
};

export const statisticheFrodiDettaglioSuccess = (datiStatistiche) => {
  return {
    type: STATISTICHE_FRODI_DETTAGLIO_SUCCESS,
    payload: datiStatistiche
  }
};