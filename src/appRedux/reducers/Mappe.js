import {
  GET_MAPPA_SUCCESS,
} from "../../constants/ActionTypes";

const INIT_STATE = {};

// a reducer is a function that receives a state and an action
// and knows how to update the state
const MappeReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_MAPPA_SUCCESS: {
      return {
        ...state,
        [action.payload.category]: action.payload.dati
      }
    }

    default:
      return INIT_STATE;
  }
}

export default MappeReducer;
