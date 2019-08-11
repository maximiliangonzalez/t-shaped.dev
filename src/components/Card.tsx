import React, {useEffect, useState} from 'react';
import {topic, question, answer} from '../utils/interfaces';

const Card: React.FC<{id}> = ({id}): JSX.Element => {
  const [name, setName] = useState('');
  useEffect(() => {
    fetch('/topicName', {
      headers: {
        'Content-Type': 'application/json',
        id
      }
    })
    .then(res => res.json())
    .then(data => {
      if (typeof data === 'string') {
        setName(data)
      }
    })
    .catch(err => console.log(err));
  }, []);

  // all cards will have a 'card' class
  // gray ones will also have 'card-gray' and green ones 'card-green'
  const [color, setColor] = useState('card-gray');

  // refactor this into separate components
  // might have to make a fetch request per card
  // const questionList: JSX.Element[] = questions.map((question: question) => {
  //   // const answers = question.answers.map((answer: answer) => <li className="answer">answer.text</li>);
  //   return <div className="question">
  //           <h2>question.text</h2>
  //           {/* {answers} */}
  //           <button>Add answer</button>
  //         </div>
  // });

  return (
    <div className={`card ${color}`}>
      <h1>{name}</h1>
      {/* {questionList} */}
      {/* <button>Add question</button> */}
    </div>
  )
};

export default Card;
