import * as types from './constants';

// this is not exported as it is only dispatched upon login
const populateFollowing = following => ({
  type: types.POPULATE_FOLLOWING,
  payload: following
});

export const addTopic = (topicName, tags, username) => dispatch => {
  fetch(`/topic/${topicName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tags, username
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    if (!data.hasOwnProperty('msg')) {
      console.log('dispatching')
      dispatch({
        type: types.ADD_TOPIC,
        payload: {_id: data}
      })
    }
  })
  .catch(err => console.log(err));
};

export const followTopic = (topic, username) => dispatch => {
  fetch(`/topic/follow/${topic}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username})
  })
  .then(res => res.json())
  .then(data => {
    if (!data.hasOwnProperty('msg')) {
      dispatch({
        type: types.ADD_TOPIC,
        payload: {_id: data}
      });
    }
  })
  .catch(err => console.log(err));
};

export const login = (name, password, route) => dispatch => {
  const toDispatch = {
    type: types.LOGIN,
    payload: {
      loggedIn: false,
      username: '',
      message: ''
    }
  };

  // if the user information is incomplete, we don't bother making a fetch request
  if (name.length > 0 && password.length > 0) {
    fetch(`/user${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.hasOwnProperty('msg')) {
        // data should only have a msg property if there was an error logging in
        // if so, we only change the msg property and then dispatch the action creator
        // this will leave the user logged out, but show them why they couldn't log in
        toDispatch.payload.message = data.msg;
      } else {
        toDispatch.payload.loggedIn = true;
        toDispatch.payload.username = data.name;
        dispatch(populateFollowing(data.following));
      }
      dispatch(toDispatch);
    })
    .catch(err => console.log(err));
  } else {
    toDispatch.payload.message = 'information missing';
    dispatch(toDispatch);
  }
};

export const verifyAndLogin = () => dispatch => {
  const toDispatch = {
    type: types.LOGIN,
    payload: {
      loggedIn: false,
      username: '',
      message: ''
    }
  };

  fetch('/user/verifyAndLogin', {
    method: 'POST'
  })
  .then(res => res.json())
  .then(data => {
    if (data.hasOwnProperty('msg')) {
      toDispatch.payload.message = data.msg;
    } else {
      toDispatch.payload.loggedIn = true;
      toDispatch.payload.username = data.name;
      dispatch(populateFollowing(data.following));
    }
    dispatch(toDispatch);
  })
  .catch(err => console.log(err));
}

export const logout = () => dispatch => {
  fetch('/user/logout', {
    method: 'POST'
  })
  .then(() => {
    dispatch({
      type: types.LOGOUT
    })
  })
  .catch(err => console.log(err));
};
