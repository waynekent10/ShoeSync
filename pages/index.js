import React, { useEffect, useState } from 'react';
import { getSneakers } from '../api/shoeData';
import SneakerCard from '../components/SneakerCard';

function Home() {
  const [sneakers, setSneakers] = useState([]);

  const getAllTheSneakers = () => {
    getSneakers().then(setSneakers);
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
