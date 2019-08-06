import * as types from '../actions/constants';
import {login, logout} from '../utils/authReducer.util';

const initialState = {
  loggedIn: false,
  username: '',
  message: ''
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOGIN:
      return login(state, action);
    case types.LOGOUT: {
      return logout(state, action);
    }
    default:
      return state;
  }
};

export default authReducer;