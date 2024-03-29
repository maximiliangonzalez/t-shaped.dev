import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Card from './Card';
import {ReduxStore} from '../utils/interfaces'

const Dashboard: React.FC<{loggedIn: boolean}> = ({loggedIn}): JSX.Element => {
  const username: string = useSelector((store : ReduxStore) => store.auth.username);
  const following: Object[] = useSelector((store : ReduxStore) => store.userInfo.following);
  const followingCards = following.map((card: {_id: string}) => {
    return <Card key={card._id} id={card._id} />
  });

  return (
    loggedIn && (
      <main className="dashboard">
        <h1>Welcome {username}!</h1>
        <div className="container">
          {followingCards}
        </div>
      </ main>
    )
  );
};

export default Dashboard;