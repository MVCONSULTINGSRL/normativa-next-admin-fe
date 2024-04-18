import {
  GET_ALLERTA_SUCCESS,
  GET_LIST_ALLERTE_SUCCESS,
  SEARCH_ALLERTE_SUCCESS,  
} from "../../constants/ActionTypes";

const INIT_STATE = {};

// a reducer is a function that receives a state and an action
// and knows how to update the state
const AllertaReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_ALLERTA_SUCCESS: {
      return {
        ...state,
        allerta: action.payload
      }
    }
    
    case GET_LIST_ALLERTE_SUCCESS: {
      //console.log("get list allerte success payload is [",action.payload,"]");
      return {
        ...state,
        listAllerte: action.payload.listAllerte,
        loader: false
      }
    }

    case SEARCH_ALLERTE_SUCCESS: {
      //console.log ("ALLERTE REDUCER : searchFilters are ", action.payload.searchFilters)
      return {
        ...state,
        listAllerte: action.payload.searchResults,
        searchFilters: action.payload.searchFilters,
        loader: false
      }
    }

    default:
      return INIT_STATE;
  }
}

export default AllertaReducer;
