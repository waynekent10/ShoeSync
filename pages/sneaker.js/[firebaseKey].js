import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { viewSneakerDetails } from '../../api/mergedData';

export default function ViewSneaker() {
  const [sneakerDetails, setSneakerDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    // eslint-disable-next-line no-undef
    viewSneakerDetails(firebaseKey).then(setSneakerDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <Image src={sneakerDetails.image} alt={sneakerDetails.shoe_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>{sneakerDetails.shoe_name}</h5>
        <p>{sneakerDetails.brand}</p>
      </div>
    </div>
  );
}
