/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { viewBrandDetails } from '../../api/mergedData';

export default function ViewBrand() {
  const [brandDetails, setBrandDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewBrandDetails(firebaseKey).then(setBrandDetails);
  }, [firebaseKey]);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <Image src={brandDetails.image} alt={brandDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-black ms-5 details">
        <h1>Brand: {brandDetails.name}</h1>
        <p>Bio: {brandDetails.bio}</p>
      </div>
    </div>
  );
}
