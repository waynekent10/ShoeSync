import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getSneakers } from '../../api/shoeData';
import SneakerCard from '../../components/SneakerCard';

// Define the SearchBar component
export default function SearchBar() {
  // State to store the filtered Sneakers
  const [searchSneakers, setSearchSneakers] = useState([]);
  const { user } = useAuth();
  // Get user information from the authentication context
  const router = useRouter();
  // Extract the 'searchBar' query parameter from the router
  const { searchBar } = router.query;

  // Function to fetch and filter Sneakers based on the search bar input
  const searchAllSneakers = () => {
    // Only perform search when searchBar is not empty
    if (searchBar && searchBar.trim() !== '') {
      // Fetch Sneakers using the user's ID
      getSneakers(user.uid).then((sneakers) => {
        // Filter Sneakers based on name or role containing the search bar input
        const filteredSneakers = sneakers.filter((sneaker) => sneaker.shoe_name.toLowerCase().includes(searchBar) || sneaker.brand.toLowerCase().includes(searchBar));
        setSearchSneakers(filteredSneakers);
      });
    } else {
      setSearchSneakers([]); // Clear the list if the search bar is empty
    }
  };
  // Effect hook to trigger the search when the 'searchBar' query parameter changes
  useEffect(() => {
    searchAllSneakers();
    // Clean up the state when the component is unmounted
    return () => {
      setSearchSneakers([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBar]);
  // Render the Component
  return (
    <>
      <div className="d-flex flex-wrap">
        {searchSneakers.map((sneaker) => <SneakerCard key={sneaker.firebaseKey} sneakerObj={sneaker} onUpdate={searchAllSneakers} />)}
      </div>
    </>
  );
}
