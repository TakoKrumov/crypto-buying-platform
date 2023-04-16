import { Routes, Route, Navigate, Link } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { Layout, Typography, Space } from "antd";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { AuthProvider } from "./contexts/authContext";
import React, { useState, useEffect } from "react";
import TickerPrice from "./components/TickerPrice/TickerPrice";
import { fetchMultipleSymbols } from "./utils/fetchBinanceData";
import "./App.css";
import Histogram from "./components/Histogram/Histogram";
import UserInfo from "./components/UserInfo/UserInfo";
import Wallet from "./components/UserInfo/Wallet/Wallet";
import History from "./components/UserInfo/History/History";
import Planing from "./components/UserInfo/Planing/Planing";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Homepage/Homepage"
import CryptoCurrencies from "./components/CryptoCurrencies/CryptoCurrencies";
import News from "./components/News/News";
import CryptoDetails from "./components/CryptoDetails/CryptoDetails";

function AuthRoutes() {
  const isAuth = !!localStorage.getItem("Auth")
    ? localStorage.getItem("Auth")
    : false;

  if (isAuth) {
    return (
      <>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/register"} element={<Register />}></Route>
      </>
    );
  }

  return <><Route path={"/logout"} element={<div>Logout Brat</div>}></Route></>


}

function App() {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const getSymbols = async () => {
      const coinSymbols = await fetchMultipleSymbols(5); // Get the first 5 coins
      setSymbols(coinSymbols);
    };

    getSymbols();
  }, []);

  console.log(symbols);

  return (
    <>
      <AuthProvider>
        <Navigation />
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route
                exact path="/coin"
                element={
                  <div className="ticker-price-wrapper">
                    {symbols.map((symbolData) => (
                      <TickerPrice
                        key={symbolData.symbol}
                        symbol={symbolData.symbol}
                      />
                    ))}
                    <Histogram />
                  </div>
                }
              >
              </Route>
              <Route exact path="/coins" element={<CryptoCurrencies />} />
              <Route path="/coins/:coinId" element={<CryptoDetails />} />
              <Route path={"/news"} element={<News />}></Route>

              {AuthRoutes()}
              <Route exact path="/userInfo">
                <Route path={"wallet"} element={<Wallet />}></Route>
                <Route path={"planing"} element={<Planing />}></Route>
                <Route path={"history"} element={<History />}></Route>
              </Route>

              <Route path={"*"} element={<div>NOT FOUND BRAT</div>}></Route>
            </Routes>
          </div>
        </Layout>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
