import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import SneakerCard from '../../components/SneakerCard';
import { getSneakers } from '../../api/shoeData';

export default function Search() {
  const [searchSneakers, setSearchSneakers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { searchInput } = router.query;

  const searchAllSneakers = () => {
    getSneakers(user.uid).then((sneakerArr) => {
      const filteredSneakers = sneakerArr.filter((sneaker) => sneaker.shoe_name.toLowerCase().includes(searchInput.toLowerCase())
        || sneaker.brand.toLowerCase().includes(searchInput.toLowerCase()));

      setSearchSneakers(filteredSneakers);
    });
  };

  useEffect(() => {
    searchAllSneakers();
    return () => {
      setSearchSneakers([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <div>
      <h1>Searched </h1>
      <div className="d-flex flex-wrap">
        {searchSneakers.map((sneaker) => (
          <SneakerCard key={sneaker.firebaseKey} sneakerObj={sneaker} onUpdate={searchAllSneakers} />
        ))}
      </div>
    </div>
  );
}
