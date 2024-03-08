import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { viewColorways } from '../../api/mergedData';
import SneakerCard from '../../components/SneakerCard';

export default function ViewSneaker() {
  const [colorDetails, setColorDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const viewCreatedSneakers = () => {
    viewColorways(firebaseKey).then(setColorDetails);
  };
  useEffect(() => {
    viewColorways(firebaseKey).then(setColorDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="text-center my-4">
        <Link href="/colorway/new" passHref>
          <Button>Add Coloway</Button>
        </Link>
      </div>

      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <Image src={colorDetails.image} alt={colorDetails.shoe_name} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>{colorDetails.nickname}</h5>
          <p>{colorDetails.primary_color}</p>
          <p>{colorDetails.secondary_color}</p>
        </div>
        <div className="d-flex flex-wrap">
          {colorDetails.sneakers?.map((sneaker) => (
            <SneakerCard key={sneaker.firebaseKey} sneakerObj={sneaker} onUpdate={viewCreatedSneakers} />
          ))}
        </div>
      </div>
    </>
  );
}
