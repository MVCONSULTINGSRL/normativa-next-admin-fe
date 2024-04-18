import {
  STATISTICHE_RITIRI_SUCCESS,  
  STATISTICHE_RITIRI_DETTAGLIO_SUCCESS,
  SIGNOUT_USER_SUCCESS,
} from "../../constants/ActionTypes";

const INIT_STATE = {
  datiStatistiche: null,
  searchFilters: null, 
  datiStatisticheDettaglio: null,
  searchFiltersDettaglio: null,
  loader: false
};

// a reducer is a function that receives a state and an action
// and knows how to update the state
const StatisticaRitiriReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    case STATISTICHE_RITIRI_SUCCESS: {
      return {
        ...state,
        datiStatistiche: action.payload.searchResults,
        searchFilters: action.payload.searchFilters,     
        loader: false
      }
    }
    
    case STATISTICHE_RITIRI_DETTAGLIO_SUCCESS: {

      console.log("search detail result is " , action.payload.searchResults)
      return {
        ...state,
        datiStatisticheDettaglio: action.payload.searchResults,
        searchFiltersDettaglio: action.payload.searchFilters,   
        loader: false
      }
    }    


    case SIGNOUT_USER_SUCCESS: {
      //console.log("search stat ritiri dettaglio signout " )
      return {
        undefined
      }
    }

    default:
      return {...state};
  }
}

export default StatisticaRitiriReducer;
