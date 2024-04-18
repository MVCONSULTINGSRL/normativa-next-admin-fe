import {
  STATISTICHE,
  STATISTICHE_SUCCESS,  

} from "constants/ActionTypes";
import { STATISTICHE_ALLERTE_DETTAGLIO, STATISTICHE_ALLERTE_DETTAGLIO_SUCCESS } from "../../constants/ActionTypes";

export const statistiche = (searchFilters) => {
  //console.log("Search norme payload is ", filters)
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: STATISTICHE,
    payload: searchFilters
  };
};

export const statisticheSuccess = (datiStatistiche) => {
  return {
    type: STATISTICHE_SUCCESS,
    payload: datiStatistiche
  }
};

export const statisticheAllerteDettaglio = (searchFilters) => {
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: STATISTICHE_ALLERTE_DETTAGLIO,
    payload: searchFilters
  };
};

export const statisticheAllerteDettaglioSuccess = (datiStatistiche) => {
  return {
    type: STATISTICHE_ALLERTE_DETTAGLIO_SUCCESS,
    payload: datiStatistiche
  }
};