import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import ColorwayCard from '../components/ColorCard';
import { getColorsByShoe } from '../api/colorData';

export default function Colorway() {
  const [colors, setColors] = useState([]);
  const { user } = useAuth();

  const getAllColorways = () => {
    getColorsByShoe(user.uid).then(setColors);
  };
  useEffect(() => {
    getColorsByShoe(user.uid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>Colorway</title>
      </Head>
      <header>
        <h1>The colorways </h1>
      </header>
      <div className="d-flex flex-wrap">
        {colors.map((color) => (
          <ColorwayCard key={color.firebaseKey} colorObj={color} onUpdate={getAllColorways} />
        ))}
      </div>
    </>
  );
}
