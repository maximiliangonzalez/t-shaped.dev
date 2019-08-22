import React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../actions/actions';

const SearchResult: React.FC<{id: string, name: string}> = ({id, name}): JSX.Element => {
  const dispatch = useDispatch();

  const follow = () => {
    dispatch(actions.followTopic(id));
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
