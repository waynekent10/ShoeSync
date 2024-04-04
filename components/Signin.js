import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';
import shoesSound from '../public/audio/shoes.mp3';

function Signin() {
  const playShoesSound = () => {
    const audio = new Audio(shoesSound);
    audio.play();
  };

  const handleButtonClick = () => {
    signIn(); // Call the signIn function
    playShoesSound(); // Call the playShoesSound function
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Welcome to Sole Sync!</h1>
      {/* Call the wrapper function handleButtonClick when the button is clicked */}
      <Button type="button" size="lg" className="btn btn-dark" onClick={handleButtonClick}>
        Show me the shoes
      </Button>
    </div>
  );
}

export default Signin;
