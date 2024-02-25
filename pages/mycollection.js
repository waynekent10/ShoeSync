import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getSneakers } from '../api/shoeData';
import SneakerCard from '../components/SneakerCard';

export default function MyCollection() {
  const [sneakers, setSneakers] = useState([]);
  const { user } = useAuth();

  const getAllTheSneakers = () => {
    getSneakers(user.uid).then(setSneakers);
  };
  useEffect(() => {
    getAllTheSneakers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>My Collection</title>
      </Head>
      <header><h1>Team</h1></header>
      <div className="text-center my-4">
        <Link href="/sneaker/new" passHref>
          <Button>Add Shoe</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {sneakers.map((sneaker) => (
            <SneakerCard key={sneaker.firebaseKey} sneakerObj={sneaker} onUpdate={getAllTheSneakers} />
          ))}
        </div>
      </div>
    </>
  );
}
