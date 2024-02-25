import React, { useEffect, useState } from 'react';
import SneakerCard from '../components/SneakerCard';
import { getEachSneaker } from '../api/shoeData';

function Home() {
  const [sneakers, setSneakers] = useState([]);

  const getAllTheSneakers = () => {
    getEachSneaker().then(setSneakers);
  };

  useEffect(() => {
    getAllTheSneakers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {sneakers.map((sneaker) => (
          <SneakerCard key={sneaker.firebaseKey} sneakerObj={sneaker} onUpdate={getAllTheSneakers} />
        ))}
      </div>

    </div>
  );
}

export default Home;
