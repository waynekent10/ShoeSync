import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteColor } from '../../api/colorData';

function ColorwayCard({ colorObj, onUpdate }) {
  const deleteDaColor = () => {
    if (window.confirm(`Do you want to this colorway from your collection ${colorObj.nickname}?`)) {
      deleteColor(colorObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={colorObj.image} alt={colorObj.nickname} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{colorObj.nickname}</Card.Title>
        <Link href={`/sneaker/colorway/${colorObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/sneaker/colorway/edit/${colorObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteDaColor} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ColorwayCard.propTypes = {
  colorObj: PropTypes.shape({
    nickname: PropTypes.string,
    image: PropTypes.string,
    primary_color: PropTypes.string,
    secondary_color: PropTypes.string,
    shoe_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ColorwayCard;
