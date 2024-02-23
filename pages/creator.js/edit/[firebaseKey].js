import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCreator } from '../../../api/creatorData';
import CreatorForm from '../../../components/forms/CreatorForm';

export default function EditCreator() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCreator(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<CreatorForm obj={editItem} />);
}
