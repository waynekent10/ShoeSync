import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { favoriteKicks, getSneakers } from '../api/shoeData';
import SneakerCard from '../components/SneakerCard';

export default function MyCollection() {
  const [favorites, setFavorites] = useState([]);
  const [sneakers, setSneakers] = useState([]);
  const { user } = useAuth();

  const getFavoriteSneakers = () => {
    favoriteKicks(user.uid).then(setFavorites);
  };

  const getAllTheSneakers = () => {
    getSneakers(user.uid).then(setSneakers);
  };

  useEffect(() => {
    getAllTheSneakers(user.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    getFavoriteSneakers(user.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      <Head>
        <title>My Collection</title>
      </Head>
      <header><h1>My Collection</h1></header>
      <div className="text-center my-4">
        <Link href="/sneaker/new" passHref>
          <Button>Add Shoe</Button>
        </Link>
        <section>
          <h2>My Favorites</h2>
          {favorites.length === 0 ? (
            <p>No favs! Whats the problem!?</p>
          ) : (
            <div className="d-flex flex-wrap">
              {favorites.map((sneaker) => (
                <SneakerCard key={sneaker.firebaseKey} sneakerObj={sneaker} onUpdate={getFavoriteSneakers} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2>New Arrivals</h2>
          <div className="d-flex flex-wrap">
            {sneakers.map((sneaker) => (
              <SneakerCard key={sneaker.firebaseKey} sneakerObj={sneaker} onUpdate={getAllTheSneakers} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
