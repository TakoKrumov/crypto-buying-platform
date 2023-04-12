// components/Register.js
import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';
import './Register.scss';

const Register = () => {
  const { onRegisterSubmit, error, setError } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all the fields.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      onRegisterSubmit({ email, password, confirmPassword });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" method='POST' onSubmit={handleSubmit}>
        <h1>Register</h1>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="confirm-password-input"
        />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
