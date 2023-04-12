import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import * as authService from "../services/authService";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();


export const AuthProvider = ({
    children,
}) => {

    const[auth,setAuth] = useLocalStorage('auth',{});
    const[error,setError] = useState();
    const navigate = useNavigate();

    const onLoginSubmit = async (data) => {

        try {
          const result = await authService.login(data);
    
          setAuth(result);
    
          navigate('/');
      } catch (error) {
        const result = await Object.values(error)[1];
    
        setError(result);
      }
       };
    
       const onRegisterSubmit = async (data) => {
    
        const{repeatedPassword,...registerData} = data;
    
        if(!repeatedPassword){
          return setError('Repeated password is required!');
        }
    
        if(repeatedPassword !== registerData.password){
          return setError('Password not match!');
        }
    
        try {
          const result = await authService.register(registerData);
    
          setAuth(result);
    
          navigate('/');
      } catch (error) {
        const result = await Object.values(error)[1];
    
        setError(result);
      }
       };
    
       const onLogout = async () => {
    
       await authService.logout();

        localStorage.clear();

        setAuth({});
    };

    const setSubmitAuthError = () => {
      setTimeout(() => {
        setError(null)
      }, "2000");
    }

    
    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        setSubmitAuthError,
        userId: auth._id,
        token: auth.accessToken,
        userName: auth.userName,
        email: auth.email,
        error,
        isError: !!error,
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