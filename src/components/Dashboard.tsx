import React from 'react';
import {useSelector} from 'react-redux';
import Card from './Card';
import {ReduxStore, topic} from '../utils/interfaces'

const Dashboard: React.FC = (): JSX.Element => {
  const username: string = useSelector((store : ReduxStore) => store.auth.username);
  const following: topic[] = useSelector((store : ReduxStore) => store.userInfo.following);

  const followingCards: JSX.Element[] = following.map(card => <Card />);

  return (
    username !== '' && (
      <>
        <h1>Welcome {username}!</h1>
        {followingCards}
      </>
    )
  );
};

export default Dashboard;