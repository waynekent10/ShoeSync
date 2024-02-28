import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getSneakers } from '../api/shoeData';
import ColorwayCard from '../components/forms/ColorCard';

export default function Colorway() {
  const [colors, setColors] = useState([]);
  const { user } = useAuth();

  const getAllColorways = () => {
    getSneakers(user.uid).then(setColors);
  };
  useEffect(() => {
    getAllColorways();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {colors.map((color) => (
          <ColorwayCard key={color.firebaseKey} colorObj={color} onUpdate={getAllColorways} />
        ))}
      </div>
    </>
  );
}
