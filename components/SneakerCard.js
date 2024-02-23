import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

function SneakerCard({ sneakerObj, onUpdate }) {
  const deleteThisSneaker = () => {
    if (window.confirm(`Delete ${sneakerObj.shoe_name}?`)) {
      deleteThisSneaker(sneakerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={sneakerObj.image} alt={sneakerObj.shoe_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{sneakerObj.shoe_name}</Card.Title>
        <Link href={`/sneaker/${sneakerObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/sneaker/edit/${sneakerObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisSneaker} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

SneakerCard.propTypes = {
  sneakerObj: PropTypes.shape({
    shoe_name: PropTypes.string,
    original_release_year: PropTypes.string,
    image: PropTypes.string,
    manufacturer: PropTypes.string,
    favorite: PropTypes.bool,
    nickname: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SneakerCard;
