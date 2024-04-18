import {
  STATISTICHE_SUCCESS,  
  STATISTICHE_ALLERTE_DETTAGLIO_SUCCESS,
  SIGNOUT_USER_SUCCESS,
} from "../../constants/ActionTypes";

const INIT_STATE = {
  datiStatistiche: null,
  searchFilters: null,
  datiStatisticheDettaglio: null,     
  loader: false
};

// a reducer is a function that receives a state and an action
// and knows how to update the state
const StatisticaReducer = (state = INIT_STATE, action) => {

  //console.log("..........action in StatisticaReducer  is ", action)

  switch (action.type) {


    case STATISTICHE_SUCCESS: {
      return {
        ...state,
        datiStatistiche: action.payload.searchResults,
        searchFilters: action.payload.searchFilters,     
        loader: false
      }
    }

    case STATISTICHE_ALLERTE_DETTAGLIO_SUCCESS: {

      console.log("search detail result is " , action.payload.searchResults)
      return {
        ...state,
        datiStatisticheDettaglio: action.payload.searchResults,
        searchFiltersDettaglio: action.payload.searchFilters,   
        loader: false
      }
    }

    case SIGNOUT_USER_SUCCESS: {
      //console.log("search stat allerte dattaglio signout " )
      return {
        undefined
      }
    }

    default:
      //console.log(" default ... init state ")
      return {...state};
  }
}

export default StatisticaReducer;
