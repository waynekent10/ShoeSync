import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBrand } from '../../../api/brandData';
import BrandForm from '../../../components/forms/BrandForm';

export default function EditBrand() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleBrand(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<BrandForm obj={editItem} />);
}
