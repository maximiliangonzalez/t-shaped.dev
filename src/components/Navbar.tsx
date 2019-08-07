import React, {useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {useToken} from '../utils/customHooks';
import Search from './Search';
import * as actions from '../actions/actions';

export default () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(store => store.auth.loggedIn);
  const message = useSelector(store => store.auth.message);
  const name = useRef(null);
  const password = useRef(null);

  // custom hook that will log a user in if they have a cookie with a valid JWT incidating they have an active session
  useToken();

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
    <>
      <Search />
      {loggedIn ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <>
          <input type="text" placeholder="username" ref={name}></input>
          <input type="password" placeholder="password" ref={password}></input>
          <button onClick={signup}>Sign Up</button>
          <button onClick={login}>Log In</button>
          {
            message !== '' && message
          }
        </>
      )}
    </>
  );
};