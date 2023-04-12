// components/Register.js
import React, { useState } from 'react';
import './Register.scss';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all the fields.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      onRegister(email, password);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
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
