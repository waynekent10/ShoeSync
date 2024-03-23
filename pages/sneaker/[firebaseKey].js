import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { viewSneakerDetails } from '../../api/mergedData';
import SneakerCard from '../../components/SneakerCard';

export default function ViewSneaker() {
  const [sneakerDetails, setSneakerDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const viewCreatedSneakers = () => {
    viewSneakerDetails(firebaseKey).then(setSneakerDetails);
  };
  useEffect(() => {
    viewSneakerDetails(firebaseKey).then(setSneakerDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <Image src={sneakerDetails.image} alt={sneakerDetails.shoe_name} style={{ width: '300px' }} />
        </div>
        <div className="text-red ms-5 details">
          <h5>Shoe Name:{sneakerDetails.shoe_name}</h5>
          <p>Release Date: {sneakerDetails.release_date}</p>
          <p>Brand: {sneakerDetails.brand}</p>
        </div>
        <div className="d-flex flex-wrap">
          {sneakerDetails.sneakers?.map((sneaker) => (
            <SneakerCard key={sneaker.firebaseKey} sneakerObj={sneaker} onUpdate={viewCreatedSneakers} />
          ))}
        </div>
      </div>
    </>
  );
}
