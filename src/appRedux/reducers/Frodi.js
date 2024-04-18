import {
  GET_FRODE_SUCCESS,
  GET_LIST_FRODI_SUCCESS,
  SEARCH_FRODI_SUCCESS, 
} from "../../constants/ActionTypes";

const INIT_STATE = {};

// a reducer is a function that receives a state and an action
// and knows how to update the state
const FrodeReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_FRODE_SUCCESS: {
      return {
        ...state,
        frode: action.payload
      }
    }
    
    case GET_LIST_FRODI_SUCCESS: {
      //console.log("get list allerte success payload is [",action.payload,"]");
      return {
        ...state,
        listFrodi: action.payload,
        loader: false
      }
    }

    case SEARCH_FRODI_SUCCESS: {
      return {
        ...state,
        listFrodi: action.payload.searchResults,
        searchFilters: action.payload.searchFilters,
        loader: false
      }
    }

    default:
      return INIT_STATE;
  }
}

export default FrodeReducer;
