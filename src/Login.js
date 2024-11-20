import React from 'react';
import './login.css';
import { Button } from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useStateValue } from './StateProvider';
import { actionType } from './reducer';

function Login() {
  const[state,dispatch]=useStateValue();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
        dispatch({
          type:actionType.SET_USER,
          user:result.user
        })
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login_container">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9fqE-T-7Ew5pjmEZvaxtM93Ie4kfuHi_2w&s" 
          alt="Slack Logo" 
        />
        <h1>Sign in</h1>
        <p>cleverprogrammer.slack.com</p>
        <Button onClick={signIn} variant="contained" color="primary">
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
