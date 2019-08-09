import React, {useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Search from './Search';
import * as actions from '../actions/actions';
import {ReduxStore} from '../utils/interfaces';

const Navbar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((store : ReduxStore) => store.auth.loggedIn);
  const message = useSelector((store : ReduxStore) => store.auth.message);
  const name = useRef(null);
  const password = useRef(null);

  const signup = () => {
    dispatch(actions.login(name.current.value, password.current.value, '/signup'));
  };

  const login = () => {
    dispatch(actions.login(name.current.value, password.current.value, '/login'));
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

export default Navbar;