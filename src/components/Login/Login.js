import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../contexts/authContext';
import './Login.scss';

const Login = () => {
  const { onLoginSubmit, error, success, clearSuccess } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
      clearSuccess();
    }
  }, [error, success, clearSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in both email and password fields.');
    } else {
      await onLoginSubmit({ email, password });
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className='form-container-Milen'>
        <div className='wrapper'>
          <div className='form-box login'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
              <div className='remember-forgot'>
              </div>
              <button type='submit' className='btnLogin'>Login</button>
              <div className='login-register'>
                <Link to="/register" className='register-link'>Dont have an account? Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
