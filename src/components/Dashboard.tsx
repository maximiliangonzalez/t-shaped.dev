import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Card from './Card';
import {ReduxStore} from '../utils/interfaces'

const Dashboard: React.FC<{loggedIn: boolean}> = ({loggedIn}): JSX.Element => {
  const username: string = useSelector((store : ReduxStore) => store.auth.username);
  const following: Object[] = useSelector((store : ReduxStore) => store.userInfo.following);
  const [followingCards, setFollowingCards] = useState([]);

  useEffect(() => {
    setFollowingCards(following.map((card: {_id: string}) => {
      return <Card key={card._id} id={card._id} />
    }));
  }, [following])

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