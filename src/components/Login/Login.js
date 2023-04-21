import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';
import './Login.scss';

const Login = () => {
  const { onLoginSubmit, erro2, isError } = useContext(AuthContext);
  const [error, setError] = useState('false')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password fields.');
    } else {
      onLoginSubmit({ email, password });
    }
  };

  return (

    // <div className="login-container">
    //   <form className="login-form" onSubmit={handleSubmit}>
    //     <h1>Login</h1>
    //     {isError && <p className="error-message">{error}</p>}
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       className="email-input"
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       className="password-input"
    //     />
    //     <button type="submit" className="login-button">Login</button>
    //   </form>
    // </div>
     <div className='wrapper'>
      <span className='icon-close'>
        <ion-icon name="close-outline"></ion-icon>
      </span>
      <div className='form-box login'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {isError && <p className="error-message">{error}</p>}

          <div className='input-box'>
            <span className='icon'><ion-icon name="mail-outline"></ion-icon></span>
            <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <label>Email</label>
          </div>
          <div className='input-box'>
            <span className='icon'><ion-icon name="lock-closed-outline"></ion-icon></span>
            <input type='password' required value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <label>Password</label>
          </div>
          <div className='remember-forgot'>
            <label><input type='checkbox'></input>Remember me</label>
            <Link to="/register" className='register-link'>Forgot password?</Link>
          </div>
          <button type='submit' className='btnLogin'>Login</button>
          <div className='login-register'>
            <Link to="/register" className='register-link'>Dont have an account? Register</Link>
          </div>
        </form>
      </div>
    </div>
    );
};

export default Login;