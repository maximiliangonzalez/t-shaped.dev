import * as types from './constants';

export const login = ({name, password, route}) => dispatch => {
  const toDispatch = {
    type: types.LOGIN,
    payload: {
      loggedIn: false,
      username: '',
      message: '',
      route
    }
  };

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
        toDispatch.payload.message = data.msg;
      } else {
        toDispatch.payload.loggedIn = true;
        toDispatch.payload.username = data.name;
      }
      dispatch(toDispatch);
    })
    .catch(err => console.log(err));
  } else {
    toDispatch.payload.message = 'information missing';
    dispatch(toDispatch);
  }
};

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