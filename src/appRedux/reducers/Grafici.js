import {
  GET_DATIGRAFICO_SUCCESS,
} from "../../constants/ActionTypes";

const INIT_STATE = {};

// a reducer is a function that receives a state and an action
// and knows how to update the state
const GraficiReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_DATIGRAFICO_SUCCESS: {
      //console.log("get datigrafico allerte success payload is [",action.payload,"]");
      return {
        ...state,
        [action.payload.category]: action.payload.dati
      }
    }
    
    default:
      return INIT_STATE;
  }
}

export default GraficiReducer;
