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
      const filteredMembers = sneakerArr.filter((sneaker) => sneaker.shoe_name.toLowerCase().includes(searchInput.toLowerCase())
        || sneaker.brand.toLowerCase().includes(searchInput.toLowerCase()));

      setSearchSneakers(filteredMembers);
    });
  };

  useEffect(() => {
    searchAllSneakers();
    return () => {
      setSearchSneakers([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-undef
  }, [searchBar]);

  return (
    <div>
      <h1>Searched </h1>
      <div className="d-flex flex-wrap">
        {searchSneakers.map((obj) => (
          <SneakerCard key={obj.firebaseKey} nameObj={obj} onUpdate={searchAllSneakers} />
        ))}
      </div>
    </div>
  );
}