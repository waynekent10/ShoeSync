import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

function CreatorCard({ creatorObj, onUpdate }) {
  const deleteThisCreator = () => {
    if (window.confirm(`Delete ${creatorObj.name}?`)) {
      deleteThisCreator(creatorObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={creatorObj.image} alt={creatorObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{creatorObj.name}</Card.Title>
        <Link href={`/creator/${creatorObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/creator/edit/${creatorObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisCreator} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

CreatorCard.propTypes = {
  creatorObj: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    company: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CreatorCard;
