import {
  GET_EXPIRING_USERS_SUCCESS,
    HIDE_MESSAGE,
    SHOW_MESSAGE,
} from "../../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
  };
  
  // a reducer is a function that receives a state and an action
  // and knows how to update the state
  const UserReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_EXPIRING_USERS_SUCCESS: {
        console.log("user reducer - expiring success - payload ", action.payload)
        return {
          ...state,
          loader: false,
          expiring: action.payload.dati,
        }
      }
  
      case SHOW_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false
        }
      }
      case HIDE_MESSAGE: {
        return {
          ...state,
          alertMessage: '',
          showMessage: false,
          loader: false
        }
      }
      default:
        return state;
    }
  }
  
  export default UserReducer;