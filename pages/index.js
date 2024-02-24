import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
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
      <Link href="/sneaker/new" passHref>
        <Button>Add Shoe</Button>
      </Link>
      <div>
        {sneakers.map((sneaker) => (
          <SneakerCard key={sneaker.firebaseKey} sneakerObj={sneaker} onUpdate={getAllTheSneakers} />
        ))}
      </div>

    </div>
  );
}

export default Home;
