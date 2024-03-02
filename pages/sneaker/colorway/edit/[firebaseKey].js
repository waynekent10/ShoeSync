import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleColor } from '../../../../api/colorData';
import ColorForm from '../../../../components/forms/ColorForm';

export default function EditColorway() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleColor(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (<ColorForm obj={editItem} />);
}
