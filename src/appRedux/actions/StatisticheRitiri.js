import {
  STATISTICHE_RITIRI,
  STATISTICHE_RITIRI_SUCCESS,  
  STATISTICHE_RITIRI_DETTAGLIO,
  STATISTICHE_RITIRI_DETTAGLIO_SUCCESS,
} from "constants/ActionTypes";

export const statisticheRitiri = (searchFilters) => {
  //console.log("Search norme payload is ", filters)
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: STATISTICHE_RITIRI,
    payload: searchFilters
  };
};

export const statisticheRitiriSuccess = (datiStatistiche) => {
  return {
    type: STATISTICHE_RITIRI_SUCCESS,
    payload: datiStatistiche
  }
};

export const statisticheRitiriDettaglio = (searchFilters) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: STATISTICHE_RITIRI_DETTAGLIO,
    payload: searchFilters
  };
};

export const statisticheRitiriDettaglioSuccess = (datiStatistiche) => {
  return {
    type: STATISTICHE_RITIRI_DETTAGLIO_SUCCESS,
    payload: datiStatistiche
  }
};