import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";
import { debounce } from 'lodash';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const debouncedNavigate = debounce((to) => {
    navigate(to);
  }, 1000); 

  if (!isAuthenticated) {
    toast.error("You need to login to do that!");
    debouncedNavigate('/login');
    return null;
  }

  return <Outlet />;
};

export default PrivateRoutes;
