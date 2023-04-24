import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import * as authService from "../services/authService";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useLocalStorage('auth', {});
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const navigate = useNavigate();

  const clearSuccess = () => {
    setSuccess(null);
  };

  const onLoginSubmit = async (data) => {
    const { email, password, rememberMe } = data;
    try {
      const result = await authService.login({ email, password });
      setAuth(result);
      setError(null);
      setSuccess('Login successful!');
      navigate('/'); 
      return 'Login successful!';
    } catch (error) {
      const result = await Object.values(error)[1];
      setError(result);
    }
  };

  const onRegisterSubmit = async (data) => {
    const form = document.getElementById('registerForm')
    const { confirmPassword, ...registerData } = data;

    if (!confirmPassword) {
      return setError('Repeated password is required!');
    }

    if (confirmPassword !== registerData.password) {
      return setError('Password not match!');
    }

    try {
      const result = await authService.register(registerData);
      setError(null); 
      setSuccess('Registration successful!');
      navigate('/login');
      form.reset();
    } catch (error) {
      const result = await Object.values(error)[1];
      setError(result);
    }
  };

  const onLogout = async () => {
    await authService.logout();
    localStorage.removeItem('auth');
    setAuth({});
    toast.success("You have been logged out");
    navigate('/login');
  };

  const setAuthError = (errorMessage) => {
    setError(errorMessage);
  };

  const contextValues = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    setAuthError,
    clearSuccess,
    userId: auth?._id,
    token: auth?.accessToken,
    userName: auth?.userName,
    email: auth?.email,
    error,
    isError: !!error,
    success,
    isSuccess: !!success,
    isAuthenticated: !!auth.accessToken,
  };


  return (
    <>
      <AuthContext.Provider value={contextValues}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
