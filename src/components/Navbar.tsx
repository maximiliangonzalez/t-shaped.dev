import React, {useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../actions/actions';

export default () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(store => store.auth.loggedIn);
  const message = useSelector(store => store.auth.message);
  const name = useRef(null);
  const password = useRef(null);

  const signup = () => {
    dispatch(actions.login({name: name.current.value, password: password.current.value, route: '/signup'}));
  };

  const login = () => {
    dispatch(actions.login({name: name.current.value, password: password.current.value, route: '/login'}));
  };

  const logout = () => {
    dispatch(actions.logout());
  };

  return (
    loggedIn ? (
      <button onClick={logout}>Log Out</button>
    ) : (
      <>
        <input type="text" ref={name}></input>
        <input type="password" ref={password}></input>
        <button onClick={signup}>Sign Up</button>
        <button onClick={login}>Log In</button>
        {
          message !== '' && message
        }
      </>
    )
  );
};