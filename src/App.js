import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Navigation from "./components/Navigation/Navigation"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { AuthProvider } from "./contexts/authContext";


function App() {
  return (
    <>
      <AuthProvider>

        <Navigation>
        </Navigation>

        <Routes>

          <Route path="/coins" element={<div />}></Route>
          <Route path={'catalog'} element={<div />}></Route>
          <Route path={'details/:id'} element={<div />}></Route>
          <Route path="/profile" element={<div />} />

          <Route path="/login" element={<Login />} />
          <Route path={'/register'} element={<Register />}></Route>

        </Routes>
      </AuthProvider>


    </>
  );
}

export default App;
