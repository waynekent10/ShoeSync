import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { viewSneakerColors, viewSneakerDetails } from '../../api/mergedData';
import SneakerCard from '../../components/SneakerCard';

export default function ViewSneaker() {
  const [sneakerDetails, setSneakerDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const viewOtherColors = () => {
    viewSneakerColors(firebaseKey).then(setSneakerDetails);
  };

  useEffect(() => {
    viewSneakerDetails(firebaseKey).then(setSneakerDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="text-center my-4">
        <Link href="/color/new" passHref>
          <Button>Add Coloway</Button>
        </Link>
      </div>

      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <Image src={sneakerDetails.image} alt={sneakerDetails.shoe_name} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>{sneakerDetails.shoe_name}</h5>
          <p>{sneakerDetails.original_release_date}</p>
          <p>{sneakerDetails.brand}</p>
        </div>
        <div className="d-flex flex-wrap">
          {sneakerDetails.colors?.map((color) => (
            <SneakerCard key={color.firebaseKey} colorObj={color} onUpdate={() => viewOtherColors()} />
          ))}
        </div>
      </div>
    </>
  );
}
