import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import SneakerCard from '../components/SneakerCard';
import { getSneakers } from '../api/shoeData';

export default function Sneakers() {
  const [sneakers, setSneakers] = useState([]);
  const { user } = useAuth();

  const getAllSneakers = () => {
    getSneakers(user.uid).then(setSneakers);
  };
  useEffect(() => {
    getAllSneakers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      {sneakers.map((sneaker) => (
        <SneakerCard key={sneaker.firebaseKey} sneakerObj={sneaker} onUpdate={getAllSneakers} />
      ))}
    </div>
  );
}
