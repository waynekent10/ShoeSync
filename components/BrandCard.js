import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleBrand } from '../api/brandData';

function BrandCard({ brandObj, onUpdate }) {
  const deleteTheBrand = () => {
    if (window.confirm(`Delete ${brandObj.name}?`)) {
      deleteSingleBrand(brandObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={brandObj.image} alt={brandObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{brandObj.name}</Card.Title>
        <p className="card-text bold">{brandObj.favorite && <span>Favorite 🏬<br /></span> }</p>
        <Link href={`/brand/${brandObj.firebaseKey}`} passHref>
          <Button variant="success" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/brand/edit/${brandObj.firebaseKey}`} passHref>
          <Button variant="warning" className="m-2">EDIT</Button>
        </Link>
        <Button variant="secondary" onClick={deleteTheBrand} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

BrandCard.propTypes = {
  brandObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BrandCard;
