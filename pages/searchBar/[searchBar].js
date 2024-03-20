import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getSneakers } from '../../api/shoeData';
import SneakerCard from '../../components/SneakerCard';
import { getCreators } from '../../api/creatorData';
import CreatorCard from '../../components/CreatorCard';
import BrandCard from '../../components/BrandCard';
import { getBrands } from '../../api/brandData'; // Import getBrands function

export default function SearchBar() {
  const [searchSneakers, setSearchSneakers] = useState([]);
  const [searchBrands, setSearchBrands] = useState([]);
  const [searchCreators, setSearchCreators] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchBar } = router.query;

  const searchAllSneakers = () => {
    getSneakers(user.uid).then((sneakers) => {
      const filteredSneakers = sneakers.filter((sneaker) => sneaker.shoe_name.toLowerCase().includes(searchBar.toLowerCase()) || sneaker.brand.toLowerCase().includes(searchBar.toLowerCase()));
      setSearchSneakers(filteredSneakers);
    });
  };

  const searchAllCreators = () => {
    getCreators(user.uid).then((creators) => {
      const filteredCreators = creators.filter((creator) => creator.name.toLowerCase().includes(searchBar.toLowerCase()));
      setSearchCreators(filteredCreators);
    });
  };

  const searchAllBrands = () => {
    getBrands().then((brands) => {
      const filteredBrands = brands.filter((brand) => brand.name.toLowerCase().includes(searchBar.toLowerCase()));
      setSearchBrands(filteredBrands);
    });
  };

  useEffect(() => {
    searchAllSneakers();
    searchAllCreators();
    searchAllBrands();

    return () => {
      setSearchSneakers([]);
      setSearchCreators([]);
      setSearchBrands([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBar]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {searchSneakers.map((sneaker) => <SneakerCard key={sneaker.firebaseKey} sneakerObj={sneaker} onUpdate={searchAllSneakers} />)}
        {searchCreators.map((creator) => <CreatorCard key={creator.firebaseKey} creatorObj={creator} onUpdate={searchAllCreators} />)}
        {searchBrands.map((brand) => <BrandCard key={brand.firebaseKey} brandObj={brand} onUpdate={searchAllBrands} />)}
      </div>
    </>
  );
}
