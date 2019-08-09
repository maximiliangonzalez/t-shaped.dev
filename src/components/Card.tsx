import React from 'react';

const Card: React.FC = (): JSX.Element => {
  // all cards will have a 'card' class
  // gray ones will also have 'card-gray' and green ones 'card-green'
  const classnames: string[] = ['card'];

  return (
    <div className={classnames.join(' ')}>
      
    </div>
  )
};

export default Card;
