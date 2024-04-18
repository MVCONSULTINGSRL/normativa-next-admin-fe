import {
  GET_NORMAUSA_SUCCESS,
  GET_LIST_NORMEUSA_SUCCESS,
  SEARCH_NORMEUSA_SUCCESS, 
} from "../../constants/ActionTypes";

const INIT_STATE = {};

// a reducer is a function that receives a state and an action
// and knows how to update the state
const NormaUsaReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_NORMAUSA_SUCCESS: {
      //console.log("get normaUsa success payload is [",action.payload,"]");
      return {
        ...state,
        normaUsa: action.payload
      }
    }
    
    case GET_LIST_NORMEUSA_SUCCESS: {
      //console.log("get list allerte success payload is [",action.payload,"]");
      return {
        ...state,
        listNormeUsa: action.payload.listNormeUsa,
        loader: false
      }
    }

    case SEARCH_NORMEUSA_SUCCESS: {
      return {
        ...state,
        listNormeUsa: action.payload.searchResults,
        searchFilters: action.payload.searchFilters,
        loader: false
      }
    }

    default:
      return INIT_STATE;
  }
}

export default NormaUsaReducer;
