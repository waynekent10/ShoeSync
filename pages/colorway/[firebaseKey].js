import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ColorwayCard from '../../components/forms/ColorCard';
import { viewSneakerColorway } from '../../api/mergedData';

export default function ViewColorway() {
  const [colorDetails, setColorDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const viewCreatedSneakers = () => {
    viewSneakerColorway(firebaseKey).then(setColorDetails);
  };

  useEffect(() => {
    viewSneakerColorway(firebaseKey).then(setColorDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <Image src={colorDetails.image} alt={colorDetails.nickname} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>{colorDetails.nickname}</h5>
          <p>{colorDetails.primary_color}</p>
          <p>{colorDetails.secondary_color}</p>
        </div>
        <div className="d-flex flex-wrap">
          {colorDetails.colors?.map((color) => (
            <ColorwayCard key={color.firebaseKey} colorObj={color} onUpdate={viewCreatedSneakers} />
          ))}
        </div>
      </div>
    </>
  );
}
