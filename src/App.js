import { Routes, Route,useLocation,useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { Layout } from "antd";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { AuthProvider } from "./contexts/authContext";
import React, { useState, useEffect } from "react";
import "./App.css";
import Wallet from "./components/UserInfo/Wallet/Wallet";
import History from "./components/UserInfo/History/History";
import Planing from "./components/UserInfo/Planing/Planing";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Homepage/Homepage";
import CryptoCurrencies from "./components/CryptoCurrencies/CryptoCurrencies";
import News from "./components/News/News";
import CryptoDetails from "./components/CryptoDetails/CryptoDetails";
import { useTheme } from "./contexts/themeContext";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import PageNotFound from "./components/404/PageNotFound";


function AuthRoutes() {
  const isAuth = !!JSON.parse(localStorage.getItem("auth"))?.email
    ? JSON.parse(localStorage.getItem("auth"))
    : false;

  if (!isAuth) {
    return (
      <>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/register"} element={<Register />}></Route>
      </>
    );
  }

  return (
    <>

      <Route path={"/logout"}>
        Logout
      </Route>

    </>
  );
}

function App() {
  const [symbols, setSymbols] = useState([]);
  const { theme } = useTheme();
  const [isAuth, setIsAuth] = useState("");

  useEffect(() => {
    setIsAuth(
      !!JSON.parse(localStorage.getItem("auth"))?.email
        ? JSON.parse(localStorage.getItem("auth"))
        : false
    );
  }, [isAuth]);

  return (
    <>
      <div className="wholeApp">
        <AuthProvider>
          <div className={theme}>
           <Navigation />
            <Layout>
              <div className="routes">
                <Routes>
                  <Route path="/" element={<Homepage />} />

                  <Route path="/coins" element={<CryptoCurrencies />} />
                  <Route path="/coins/:coinId" element={<CryptoDetails />} />
                  <Route path={"/news"} element={<News />}></Route>
                  <Route path="/userInfo" element={<PrivateRoutes />}>
                    <Route path="wallet" element={<Wallet />} />
                    <Route path="planing" element={<Planing />} />
                    <Route path="history" element={<History />} />
                  </Route>
                  {AuthRoutes()}
                  <Route path={"*"} element={<PageNotFound/>}></Route>
                </Routes>
              </div>
            </Layout>
          </div>
          <Footer />
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
