// components/Register.js
import React, { useState } from "react";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import "./Register.scss";

const Register = () => {
  const { onRegisterSubmit, error, setError } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const portfolio = {
    userInfo: [
      { name: "", userEmail: email, userPassword: password, userAvatar: "" },
    ],
    history: [{}],
    wallet: [{}],
  };

  const checkPassword = (password) => {
    if (password.trim().length < 6) {
      console.log(false);
      return false;
    }
    if (!/[a-z]/.test(password)) {
      console.log(false);
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      console.log(false);
      return false;
    }
    if (!/[0-9]/.test(password)) {
      console.log(false);
      return false;
    }
    if (!/[!@#$%^&*()]/.test(password)) {
      console.log(false);
      return false;
    }
    console.log(true);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all the fields.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (checkPassword(password)) {
      onRegisterSubmit({ email, password, portfolio });
    } else {
      setError("Password is too short or dont go by the rules");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" method="POST" onSubmit={handleSubmit}>
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
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
