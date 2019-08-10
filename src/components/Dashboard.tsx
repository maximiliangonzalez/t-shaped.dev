import React from 'react';
import {useSelector} from 'react-redux';
import Card from './Card';
import {ReduxStore, topic} from '../utils/interfaces'

const Dashboard: React.FC<{loggedIn: boolean}> = ({loggedIn}): JSX.Element => {
  const username: string = useSelector((store : ReduxStore) => store.auth.username);
  const following: topic[] = useSelector((store : ReduxStore) => store.userInfo.following);
  console.log(following, 'following')

  const followingCards: JSX.Element[] = following.map((name: topic) => {
    // return <Card name={name} tags={tags} questions={questions}/>
    return <div>x{JSON.stringify(name)}x</div>
  });

  return (
    loggedIn && (
      <>
        <h1>Welcome {username}!</h1>
        {followingCards}
      </>
    )
  );
};

export default Dashboard;