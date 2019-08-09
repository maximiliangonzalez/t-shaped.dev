import React from 'react';
import {topic, question, answer} from '../utils/interfaces';

const Card: React.FC<topic> = ({name, tags, questions}): JSX.Element => {
  // all cards will have a 'card' class
  // gray ones will also have 'card-gray' and green ones 'card-green'
  const classnames: string[] = ['card'];

  // refactor this into separate components
  const questionList: JSX.Element[] = questions.map((question: question) => {
    const answers = question.answers.map((answer: answer) => <li className="answer">answer.text</li>);
    return <div className="question">
            <h2>question.text</h2>
            {answers}
            <button>Add answer</button>
          </div>
  });

  return (
    <div className={classnames.join(' ')}>
      <h1>name</h1>
      {questionList}
      <button>Add question</button>
    </div>
  )
};

export default Card;
