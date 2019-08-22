import * as types from './constants';

// this is not exported as it is only dispatched upon login
const populateFollowing = following => ({
  type: types.POPULATE_FOLLOWING,
  payload: following
});

export const addTopic = (topicName, tags, username) => dispatch => {
  fetch('/addTopic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      topicName, tags, username
    })
  })
  .then(res => res.json())
  .then(data => {
    if (!data.hasOwnProperty('msg')) {
      dispatch({
        type: types.ADD_TOPIC,
        payload: {_id: data}
      })
    }
  })
  .catch(err => console.log(err));
};

export const followTopic = topic => dispatch => {
  fetch('/followTopic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({topic})
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
    fetch(route, {
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

  fetch('/verifyAndLogin', {
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
  fetch('/logout', {
    method: 'POST'
  })
  .then(() => {
    dispatch({
      type: types.LOGOUT
    })
  })
  .catch(err => console.log(err));
};
