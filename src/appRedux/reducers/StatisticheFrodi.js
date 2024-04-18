import {

  STATISTICHE_FRODI_SUCCESS,  
  STATISTICHE_FRODI_DETTAGLIO_SUCCESS,
  SIGNOUT_USER_SUCCESS,
} from "../../constants/ActionTypes";

const INIT_STATE = {
  datiStatistiche: null,
  searchFilters: null,
  searchFiltersDettaglio: null, 
  datiStatisticheDettaglio : null,    
  loader: false
};

// a reducer is a function that receives a state and an action
// and knows how to update the state
const StatisticaFrodiReducer = (state = INIT_STATE, action) => {

  //console.log("..........action in StatisticaFrodiReducer is ", action)

  switch (action.type) {


    case STATISTICHE_FRODI_SUCCESS: {
      return {
        ...state,
        datiStatistiche: action.payload.searchResults,
        searchFilters: action.payload.searchFilters,     
        loader: false
      }
    }

    case STATISTICHE_FRODI_DETTAGLIO_SUCCESS: {
      return {
        ...state,
        datiStatisticheDettaglio: action.payload.searchResults,
        searchFiltersDettaglio: action.payload.searchFilters,     
        loader: false
      }
    }

    case SIGNOUT_USER_SUCCESS: {
      //console.log("search stat frodi dettaglio signout " )
      return {
        undefined
      }
    }

    default:
      return {...state};
  }
}

export default StatisticaFrodiReducer;
