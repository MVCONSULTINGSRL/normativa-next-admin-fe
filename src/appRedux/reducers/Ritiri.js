import {
  GET_RITIRO_SUCCESS,
  GET_LIST_RITIRI_SUCCESS,
  SEARCH_RITIRI_SUCCESS,  
} from "../../constants/ActionTypes";

const INIT_STATE = {};

// a reducer is a function that receives a state and an action
// and knows how to update the state
const RitiroReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_RITIRO_SUCCESS: {
      return {
        ...state,
        ritiro: action.payload
      }
    }

        
    case GET_LIST_RITIRI_SUCCESS: {
      //console.log("get list allerte success payload is [",action.payload,"]");
      return {
        ...state,
        listRitiri: action.payload.listRitiri,
        loader: false
      }
    }

    case SEARCH_RITIRI_SUCCESS: {
      return {
        ...state,
        listRitiri: action.payload.searchResults,
        searchFilters: action.payload.searchFilters,
        loader: false
      }
    }

    default:
      return INIT_STATE;
  }
}

export default RitiroReducer;
