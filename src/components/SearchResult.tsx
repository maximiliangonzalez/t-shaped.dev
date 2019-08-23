import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../actions/actions';
import {ReduxStore} from '../utils/interfaces';

const SearchResult: React.FC<{id: string, name: string}> = ({id, name}): JSX.Element => {
  const dispatch = useDispatch();

  const username = useSelector((store: ReduxStore) => store.auth.username);

  const follow = () => {
    dispatch(actions.followTopic(id, username));
  };
  
  return (
    <>
      <li id={id}>
        {name}
        <button onClick={follow}>follow</button>
      </li>
    </>
  )
};

export default SearchResult;
