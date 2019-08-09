import React, {useRef} from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../actions/actions';

const AddTopic = () => {
  const topicName = useRef(null);
  const tags = useRef(null);
  const dispatch = useDispatch();

  const addTopic = () => dispatch(actions.addTopic(topicName.current.value, tags.current.value.split(',')));

  return (
    <>
      <input type="text" placeholder="topic name" ref={topicName} />
      <input type="text" placeholder="tags (comma separated)" ref={tags} />
      <button onClick={addTopic}>Add topic</button>
    </>
  )
}

export default AddTopic;
