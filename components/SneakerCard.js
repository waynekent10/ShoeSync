import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleSneaker } from '../api/shoeData';
import { useAuth } from '../utils/context/authContext';

function SneakerCard({ sneakerObj, onUpdate }) {
  const { user } = useAuth();

  const deleteDaShoe = () => {
    if (window.confirm(`Delete ${sneakerObj.shoe_name}?`)) {
      deleteSingleSneaker(sneakerObj.firebaseKey).then(() => onUpdate());
    }
  };

  const submittedBy = user.uid === sneakerObj.uid ? `Submitted by: ${user.displayName}` : `Submitted by: ${user.displayName}`;

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={sneakerObj.image} alt={sneakerObj.shoe_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>Name: {sneakerObj.shoe_name}</Card.Title>
        <Card.Body>Brand: {sneakerObj.brand}</Card.Body>
        <Link href={`/sneaker/${sneakerObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Card.Text>{submittedBy}</Card.Text>
        {user.uid === sneakerObj.uid && (
        <>
          <Link href={`/sneaker/edit/${sneakerObj.firebaseKey}`} passHref>
            <Button variant="info" className="m-2">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteDaShoe} className="m-2">
            DELETE
          </Button>
        </>
        )}
      </Card.Body>
    </Card>
  );
}

SneakerCard.propTypes = {
  sneakerObj: PropTypes.shape({
    shoe_name: PropTypes.string,
    release_year: PropTypes.string,
    image: PropTypes.string,
    brand: PropTypes.string,
    favorite: PropTypes.bool,
    nickname: PropTypes.string,
    shoe_id: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SneakerCard;
