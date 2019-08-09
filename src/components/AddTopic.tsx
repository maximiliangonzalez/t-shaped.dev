import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../actions/actions';
import {ReduxStore} from '../utils/interfaces';

const AddTopic = () => {
  const topicName = useRef(null);
  const tags = useRef(null);
  const username = useSelector((store: ReduxStore) => store.auth.username);
  const dispatch = useDispatch();

  const addTopic = () => dispatch(actions.addTopic(topicName.current.value, tags.current.value.split(','), username));

  return (
    <>
      <input type="text" placeholder="topic name" ref={topicName} />
      <input type="text" placeholder="tags (comma separated)" ref={tags} />
      <button onClick={addTopic}>Add topic</button>
    </>
  )
}

export default AddTopic;
