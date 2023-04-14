import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { AuthProvider } from "./contexts/authContext";
import React, { useState, useEffect } from 'react';
import TickerPrice from './components/TickerPrice/TickerPrice';
import { fetchMultipleSymbols } from './utils/fetchBinanceData';
import Footer from "./components/Footer/Footer";
import "./App.css"
import Histogram from "./components/TickerPrice/Histogram/Histogram";
import UserInfo from "./components/UserInfo/UserInfo";
import Wallet from "./components/UserInfo/Wallet/Wallet";
import History from "./components/UserInfo/History/History";
import Planing from "./components/UserInfo/Planing/Planing";
function App() {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const getSymbols = async () => {
      const coinSymbols = await fetchMultipleSymbols(5); // Get the first 5 coins
      setSymbols(coinSymbols);
    };

    getSymbols();
  }, []);

  return (
    
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route index element={<Navigate to={'/coins'} />}></Route>
          <Route
            path="/coins"
            element={<div className="ticker-price-wrapper">
            {symbols.map((symbolData) => (
              <TickerPrice key={symbolData.symbol} symbol={symbolData.symbol} />
            ))}
            <Histogram/>
          </div>}>
            <Route path={"catalog"} element={<div>catalog brat</div>}></Route>
            <Route path={"details"} element={<div>Details</div>}></Route>
          </Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/register"} element={<Register />}></Route>
          
          <Route path="/userInfo" element={<UserInfo/>}>
            <Route path={"profileInfo"} element={<div>profile Info</div>}></Route>
            <Route path={"wallet"} element={<Wallet/>}></Route>
            <Route path={"planing"} element={<Planing/>}></Route>
            <Route path={"history"} element={<History/>}></Route>
          </Route>
        
          <Route path={"*"} element={<div>NOT FOUND BRAT</div>}></Route>
        </Routes>
        <Footer />
      </AuthProvider>
   
  );
}




export default App;
