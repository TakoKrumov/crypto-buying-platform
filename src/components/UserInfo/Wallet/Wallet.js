import React, { useState } from "react";
import "./Wallet.scss";
import BuyingCoins from "./BuyingCrypto";
import AddingFunds from "./AddingFunds";
import ExchangeCrypto from "./CryptoExchange";
import { useGetCryptosQuery } from "../../../services/cryptoApi";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Wallet = () => {
  const [account, setAccount] = useState(
    JSON.parse(localStorage.getItem("auth"))
  );
  const [userFunds, setUserFunds] = useState(
    account?.portfolio?.wallet[0]?.fundsInAccount
  );
  const [userCoins, setUserCoins] = useState(
    JSON.parse(
      localStorage.getItem("auth")
    )?.portfolio?.wallet[0]?.buyCoins.map((element) => element)
  );
  const [icon, setIcon] = useState([]);
  const [userCoinsWithIcons, setUserCoinsWithIcons] = useState([]);
  const count = 100;
  const { data: cryptoList } = useGetCryptosQuery(count);
  
  useEffect(() => {
    if (cryptoList?.data) {
      const currentCoinsWithIcons = userCoins.map((myCoin) => {
        const matchedCoin = cryptoList.data.coins.find(
          (coin) => myCoin.symbol === coin.symbol
        );
        return { ...myCoin, iconUrl: matchedCoin?.iconUrl };
      });
      setUserCoinsWithIcons(currentCoinsWithIcons);
    }
  }, [cryptoList, userCoins]);
  
  console.log(userCoinsWithIcons)
  const isAuth = !!JSON.parse(localStorage.getItem("auth"))?.email
    ? JSON.parse(localStorage.getItem("auth"))
    : false;

  if (!isAuth) {
    return (
      <>
        <div>
          GO to <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </>
    );
  }

  return (
    <div className="userPage">
      <div className="walletInfo">
        <h3>Crypto Wallet</h3>
        <span>Money in wallet:{userFunds}</span>
        <div>
          Coins:
          {Array.isArray(userCoins) &&
            userCoins?.map((coin, index) => (
              <div key={coin.uuid} id={coin.symbol} data-icon={coin.iconUrl}>
                {coin.symbol} : {coin.amount} :{" "}
                <img src={userCoinsWithIcons[index]?.iconUrl} alt="" width="25" height="25" />
              </div>
            ))}
        </div>
      </div>
      <div className="wallet">
        <BuyingCoins />;
        <ExchangeCrypto />
        <AddingFunds />;
      </div>
    </div>
  );
};

export default Wallet;
