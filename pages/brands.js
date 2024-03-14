import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { getBrands } from '../api/brandData';
import BrandCard from '../components/BrandCard';

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const { user } = useAuth();

  const getAllBrands = () => {
    getBrands(user.uid).then(setBrands);
  };
  useEffect(() => {
    getAllBrands();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>Brand</title>
      </Head>
      <div className="text-center my-4">
        <Link href="/brand/new" passHref>
          <Button>Add A Brand</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap">
        {brands.map((brand) => (
          <BrandCard key={brand.firebaseKey} creatorObj={brand} onUpdate={getAllBrands} />
        ))}
      </div>
    </>
  );
}
