/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewCreatorDetails } from '../../api/mergedData';
import CreatorCard from '../../components/CreatorCard';

export default function ViewCreator() {
  const [creatorDetails, setCreatorDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const viewCreatorShoes = () => {
    viewCreatorDetails(firebaseKey).then(setCreatorDetails);
  };
  useEffect(() => {
    viewCreatorDetails(firebaseKey).then(setCreatorDetails);
  }, [firebaseKey]);
  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={creatorDetails.image} alt={creatorDetails.name} style={{ width: '300px' }} />
        </div>

        <div className="text ms-5 details">
          <h1>Name: {creatorDetails.name}
            Brand Association:{creatorDetails.company}
          </h1>
          <p>Bio: {creatorDetails.bio}</p>
        </div>
      </div>
      <hr />
      <div className="d-flex flex-wrap">
        {creatorDetails.sneakers?.map((creator) => (
          <CreatorCard key={creator.firebaseKey} creatorObj={creator} onUpdate={viewCreatorShoes} />
        ))}
      </div>
    </>
  );
}
