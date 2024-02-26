import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
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
    <>
      <Head>
        <title>Creator</title>
      </Head>
      <header>
        <h1>The Creators of the shoes </h1>
      </header>
      <div className="text-center my-4">
        <Link href="/creator/new" passHref>
          <Button>Add Creator</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap">
        {creators.map((creator) => (
          <CreatorCard key={creator.firebaseKey} creatorObj={creator} onUpdate={getAllCreators} />
        ))}
      </div>
    </>
  );
}
