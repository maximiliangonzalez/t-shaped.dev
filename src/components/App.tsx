import React from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import {useToken} from '../utils/customHooks';

const App = () => {
  // useToken is a custom hook that checks if the user has an active session (via a JWT)
  // if there is a valid token, the user will be logged in automatically
  // if not, the user will have to log in to view their information
  useToken();
  
  return (
  <>
    <Navbar />
    <Dashboard />
  </>
  );
}

export default App;