import  { useEffect, useState } from 'react';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import './App.css';




const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://otpless.com/auth.js';
    document.head.appendChild(script);

    
    window.otpless = (otplessUser) => {
      
      alert(JSON.stringify(otplessUser));
    
    };
  }, []);

  const handleSignup = () => {
    
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
      setError('Username already exists. Please choose a different one.');
    } else {
      
      localStorage.setItem(username, JSON.stringify({ username, password }));
      setIsSignup(false);
      setError('');
    }
  };

  const handleLogin = () => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem(username);
    
    if (storedUser) {
      const { password: storedPassword } = JSON.parse(storedUser);

      // Check if the entered password matches the stored password
      if (password === storedPassword) {
        setLoggedInUser({ username });
        setError('');
      } else {
        setLoggedInUser(null);
        setError('Incorrect password. Please try again.');
      }
    } else {
      setLoggedInUser(null);
      setError('User not found. Please sign up.');
    }
  };

  return (
    <div className="app-container">
      {loggedInUser ? (
        // Display user details after successful login
        <div className="welcome-container">
          <p className="welcome-message">Welcome, {loggedInUser.username}!</p>
          <p className="additional-info">Other user details can be displayed here.</p>
        </div>
      ) : (
        // Display signup or login form based on the value of isSignup
        <div className="auth-container">
          <h2>{isSignup ? 'Signup' : 'Login'} with OTPLESS</h2>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </label>
          <br />
          {isSignup ? (
            // Display Signup button
            <button type="button" onClick={handleSignup} className="auth-button">
              Signup
            </button>
          ) : (
            // Display Login button
            <button type="button" onClick={handleLogin} className="auth-button">
              Log In
            </button>
          )}
          <p className="error-message">{error}</p>
          {!isSignup && (
            <p className="signup-prompt">
              Don't have an account yet?{' '}
              <span
                onClick={() => setIsSignup(true)}
                className="signup-link"
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
