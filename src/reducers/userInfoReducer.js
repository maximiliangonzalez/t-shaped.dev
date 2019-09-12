import * as types from '../actions/constants';
import {populateFollowing, addTopic} from '../utils/userInfoReducer.util';

const initialState = {
  following: []
};

const userInfoReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.POPULATE_FOLLOWING:
      return populateFollowing(state, action.payload);
    case types.ADD_TOPIC:
      console.log('payloadDD', action.payload)
      return addTopic(state, action.payload);
    default:
      return state;
  }
};

export default userInfoReducer;