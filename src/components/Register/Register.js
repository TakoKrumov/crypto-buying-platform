import React, { useState } from "react";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from "../../contexts/authContext";
import "./Register.scss";

const Register = () => {
  const { onRegisterSubmit } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);


  const portfolio = {
    userInfo: [
      { name: username, userEmail: email, userPassword: password, userAvatar: "" },
    ],
    history: [{}],
    wallet: [{ fundsInAccount: Math.floor(Math.random() * 100000), buyCoins: [], sellCoins: [] }],
  };

  const checkPassword = (password) => {
    if (password.trim().length < 6) {
      return false;
    }
    if (!/[a-z]/.test(password)) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/[0-9]/.test(password)) {
      return false;
    }
    if (!/[!@#$%^&*()]/.test(password)) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all the fields.");
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    } else if (checkPassword(password)) {
      onRegisterSubmit({ email, password, confirmPassword, portfolio });
    } else {
      toast.error("Password is too short or doesn't go by the rules");
    }

  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className='form-container-Milen'>
        <div className='wrapper'>
          <div className='form-box register'>
            <h2>Register</h2>
            <form method="POST" onSubmit={handleSubmit}>
              <div className='input-box'>
                <span className='icon'><ion-icon name="person-outline"></ion-icon></span>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <label>Username</label>
              </div>
              <div className='input-box'>
                <span className='icon'><ion-icon name="mail-outline"></ion-icon></span>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label>Email</label>
              </div>
              <div className='input-box'>
                <span className='icon'><ion-icon name="lock-closed-outline"></ion-icon></span>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <label>Password</label>
              </div>
              <div className='input-box'>
                <span className='icon'><ion-icon name="lock-closed-outline"></ion-icon></span>
                <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                <label>Confirm Password</label>
              </div>
              <div className="remember-forgot">
                <label>
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  ></input>
                  I agree to the terms and conditions
                </label>
              </div>
              <button
                type="submit"
                className="btnLogin"
              >
                Register
              </button>
              <div className='login-register'>
                <Link to="/login" className='register-link'>Already have an account? Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
