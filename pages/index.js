import React, { useEffect, useState } from 'react';
import SneakerCard from '../components/SneakerCard';
import { getEachSneaker } from '../api/shoeData';
import ColorwayCard from '../components/ColorCard';
import { getColors } from '../api/colorData';

function Home() {
  const [sneakers, setSneakers] = useState([]);
  const [colors, setColors] = useState([]);

  const getAllTheSneakers = () => {
    getEachSneaker().then(setSneakers);
  };

  const getAllColorways = () => {
    getColors().then(setColors);
  };

  useEffect(() => {
    getAllTheSneakers();
    getAllColorways();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {sneakers.map((sneaker) => (
          <SneakerCard key={sneaker.firebaseKey} sneakerObj={sneaker} onUpdate={getAllTheSneakers} />
        ))}
      </div>
      <div className="d-flex flex-wrap">
        {colors.map((color) => (
          <ColorwayCard key={color.firebaseKey} colorObj={color} onUpdate={getAllColorways} />
        ))}
      </div>
    </div>
  );
}

export default Home;
