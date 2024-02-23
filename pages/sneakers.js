import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import SneakerCard from '../components/SneakerCard';

export default function Creator() {
  const [creators, setCreators] = useState([]);
  const { user } = useAuth();

  const getAllSneakers = () => {
    getAllSneakers(user.uid).then(setCreators);
  };
  useEffect(() => {
    getAllSneakers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      {creators.map((creator) => (
        <SneakerCard key={creator.firebaseKey} creatorObj={creator} onUpdate={getAllSneakers} />
      ))}
    </div>
  );
}
