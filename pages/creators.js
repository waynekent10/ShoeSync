import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import CreatorCard from '../components/CreatorCard';
import { getCreators } from '../api/creatorData';

export default function Creator() {
  const [creators, setCreators] = useState([]);
  const { user } = useAuth();

  const getAllCreators = () => {
    getCreators(user.uid).then(setCreators);
  };
  useEffect(() => {
    getAllCreators();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (

    <div>
      {creators.map((creator) => (
        <CreatorCard key={creator.firebaseKey} creatorObj={creator} onUpdate={getAllCreators} />
      ))}
    </div>
  );
}
