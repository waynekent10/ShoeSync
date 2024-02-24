import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
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
    <div className="text-center my-4">
      <Link href="/creator/new" passHref>
        <Button>Add Creator</Button>
      </Link>

      <div className="d-flex flex-wrap">
        <div>
          {creators.map((creator) => (
            <CreatorCard key={creator.firebaseKey} creatorObj={creator} onUpdate={getAllCreators} />
          ))}
        </div>
      </div>
    </div>
  );
}
