import React from 'react';
import {useSelector} from 'react-redux';
import Card from './Card';

const Dashboard = () => {
  const username = useSelector(store => store.auth.username);
  const following = useSelector(store => store.userInfo.following);

  const cards = following.map(card => <Card />);

  return (
    username !== '' && (
      <>
        <h1>Welcome {username}!</h1>
        {cards}
      </>
    )
  );
};

export default Dashboard;