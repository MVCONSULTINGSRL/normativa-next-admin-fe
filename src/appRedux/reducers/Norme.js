import {
  GET_NORMA_SUCCESS,
  GET_LIST_NORME_SUCCESS,
  SEARCH_NORME_SUCCESS,
} from "../../constants/ActionTypes";

const INIT_STATE = {};

// a reducer is a function that receives a state and an action
// and knows how to update the state
const NormaReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_NORMA_SUCCESS: {
      //console.log("get norma success payload is [",action.payload,"]");
      return {
        ...state,
        norma: action.payload
      }
    }
    
    case GET_LIST_NORME_SUCCESS: {
      //console.log("get list norme success payload is [",action.payload,"]");
      return {
        ...state,
        listNorme: action.payload.listNorme,
        loader: false
      }
    }

    case SEARCH_NORME_SUCCESS: {
      //console.log("NormaReducer - Returning init state from SEARCH_NORME_SUCCESS action")
      return {
        ...state,
        listNorme: action.payload.searchResults,
        searchFilters: action.payload.searchFilters,
        loader: false
      }
    }
    default:
      return INIT_STATE;
  }
}

export default NormaReducer;
