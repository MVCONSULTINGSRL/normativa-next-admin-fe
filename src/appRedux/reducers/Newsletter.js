import {
  SEARCH_NEWSLETTER_SUCCESS,
} from "../../constants/ActionTypes";

const INIT_STATE = {};

// a reducer is a function that receives a state and an action
// and knows how to update the state
const NewsletterReducer = (state = INIT_STATE, action) => {
  switch (action.type) {


    case SEARCH_NEWSLETTER_SUCCESS: {
      //console.log("NormaReducer - Returning init state from SEARCH_NORME_SUCCESS action")
      return {
        ...state,
        searchResults: action.payload.searchResults,
        searchFilters: action.payload.searchFilters,
        loader: false
      }
    }
    default:
      return {...state};
  }
}

export default NewsletterReducer;
