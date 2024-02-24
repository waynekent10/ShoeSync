import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleSneaker } from '../../../api/shoeData';
import SneakerForm from '../../../components/forms/SneakerForm';

export default function EditSneaker() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleSneaker(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (<SneakerForm obj={editItem} />);
}
