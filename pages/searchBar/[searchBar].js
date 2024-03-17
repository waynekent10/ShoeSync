import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getSneakers } from '../../api/shoeData';
import SneakerCard from '../../components/SneakerCard';

export default function SearchBar() {
  const [searchSneakers, setSearchSneakers] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchBar } = router.query;

  const searchAllSneakers = () => {
    getSneakers(user.uid).then((sneakers) => {
      const filteredSneakers = sneakers.filter((sneaker) => sneaker.shoe_name.toLowerCase().includes(searchBar.toLowerCase()) || sneaker.brand.toLowerCase().includes(searchBar.toLowerCase()));
      setSearchSneakers(filteredSneakers);
    });
  };

  useEffect(() => {
    searchAllSneakers();
    return () => {
      setSearchSneakers([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBar]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {searchSneakers.map((sneaker) => <SneakerCard key={sneaker.firebaseKey} sneakerObj={sneaker} onUpdate={searchAllSneakers} />)}
      </div>
    </>
  );
}
