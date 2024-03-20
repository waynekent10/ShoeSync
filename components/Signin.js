import React from 'react';
import { Button } from 'react-bootstrap';
import useSound from 'use-sound';
import { signIn } from '../utils/auth';
import shoeSfx from '../public/audio/shoes.mp3';

function Signin() {
  const [play] = useSound(shoeSfx);

  const handleSignInClick = () => {
    signIn();
    play();
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
      <h1>Welcome</h1>
      <p>Click the button below to login!</p>
      <Button type="button" size="lg" className="copy-btn" onClick={handleSignInClick}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
