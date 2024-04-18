import {
  SEARCH_NEWSLETTER,
  SEARCH_NEWSLETTER_SUCCESS,
} from "constants/ActionTypes";

export const searchNewsletter = (searchFilters) => {
  console.log("Search newsletter payload is ", searchFilters)
  return {
    // this is the action : a type (mandatory) and a payload (not mandatory)
    type: SEARCH_NEWSLETTER,
    payload: searchFilters
  };
};

export const searchNewsletterSuccess = (searchResults) => {
  console.log("Search newsletter results payload is ", searchResults)
  return {
    type: SEARCH_NEWSLETTER_SUCCESS,
    payload: searchResults
  }
};