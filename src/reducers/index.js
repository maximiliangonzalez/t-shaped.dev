import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';

const reducers = combineReducers({
  auth: authReducer,
  userInfo: userInfoReducer
});

export default reducers;