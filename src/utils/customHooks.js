import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../actions/actions';

export const useToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await fetch('/verify', {
        method: 'POST'
      })
      .then(res => res.json())
      .then(data => {
        if (data.hasOwnProperty('iat') && data.hasOwnProperty('username') && data.hasOwnProperty('password')) {
          const {username: name, password} = data;
          dispatch(login({name, password, route: '/login' }));
        }
      })
      .catch(err => console.log(err));
    };
    fetchData();
  }, []);
};