import {
  GET_SENTENZA_SUCCESS,
  GET_LIST_SENTENZE_SUCCESS,
  SEARCH_SENTENZE_SUCCESS,  
} from "../../constants/ActionTypes";

const INIT_STATE = {};

// a reducer is a function that receives a state and an action
// and knows how to update the state
const SentenzaReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_SENTENZA_SUCCESS: {
      return {
        ...state,
        sentenza: action.payload
      }
    }
    
    case GET_LIST_SENTENZE_SUCCESS: {
      //console.log("get list sentenze success payload is [",action.payload,"]");
      return {
        ...state,
        listSentenze: action.payload.listSentenze,
        loader: false
      }
    }

    case SEARCH_SENTENZE_SUCCESS: {
      return {
        ...state,
        listSentenze: action.payload.searchResults,
        searchFilters: action.payload.searchFilters,     
        loader: false
      }
    }

    default:
      return INIT_STATE;
  }
}

export default SentenzaReducer;
