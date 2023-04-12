// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/coins" className="navbar-brand">
          Coins
        </Link>
        <div className="navbar-buttons">
          <Link to="/login" className="login-button">
            Login
          </Link>
          <Link to="/register" className="register-button">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
