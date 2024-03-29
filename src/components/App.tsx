import React from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import {useToken} from '../utils/customHooks';
import {useSelector} from 'react-redux';
import {ReduxStore} from '../utils/interfaces';

const App: React.FC = (): JSX.Element => {
  // useToken is a custom hook that checks if the user has an active session (via a JWT)
  // if there is a valid token, the user will be logged in automatically
  // if not, the user will have to log in to view their information
  useToken();
  
  const loggedIn = useSelector((store : ReduxStore) => store.auth.loggedIn);
  
  return (
  <>
    <Navbar loggedIn={loggedIn}/>
    <Dashboard loggedIn={loggedIn}/>
  </>
  );
}

export default App;