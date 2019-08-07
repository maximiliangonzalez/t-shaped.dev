import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {verifyAndLogin} from '../actions/actions';

export const useToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAndLogin());
  }, []);
};