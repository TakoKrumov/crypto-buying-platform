import React, { useState, useMemo } from "react";
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

  const userCoinsMapped = useMemo(() => {
    return userCoins.map((element) => element);
  }, [userCoins]);

  const [userCoinsWithIcons, setUserCoinsWithIcons] = useState([]);
  const count = 100;
  const { data: cryptoList } = useGetCryptosQuery(count);

  useEffect(() => {
    if (cryptoList?.data) {
      const currentCoinsWithIcons = userCoinsMapped?.map((myCoin) => {
        const matchedCoin = cryptoList.data.coins.find(
          (coin) => myCoin.symbol === coin.symbol
        );
        return { ...myCoin, iconUrl: matchedCoin?.iconUrl };
      });
      setUserCoinsWithIcons(currentCoinsWithIcons);
    }
  }, [cryptoList, userCoinsMapped]);

  const onFundsChange = (newFunds) => {
    setUserFunds(newFunds);
  };

  const onCoinsChange = (newCoins) => {
    setUserCoins(newCoins);
  };
  
  return (
    <div className="userPage">
      <div className="walletInfo">
        <h3>Crypto Wallet</h3>
        <span>Money in wallet: ${userFunds}</span>
        <div className="userCoins">
          My Coins:
          {Array.isArray(userCoins) &&
            userCoins?.map((coin, index) => (
              !!(parseFloat(coin.amount) !== 0.00) ? 
              <span
                key={index}
                id={coin.symbol}
                data-icon={coin.iconUrl}
                className="userCoinChildren"
              >
                {coin.symbol} : {coin.amount} :{" "}
                <img
                  src={userCoinsWithIcons[index]?.iconUrl}
                  alt=""
                  width="25"
                  height="25"
                />
              </span>
              : null
            ))}
        </div>
      </div>
      <div className="wallet">
        <BuyingCoins
          account={account}
          setAccount={setAccount}
          userFunds={userFunds}
          setUserFunds={setUserFunds}
          userCoins={userCoins}
          setUserCoins={setUserCoins}
          onFundsChange={onFundsChange}
          onCoinsChange={onCoinsChange}
        />
        <ExchangeCrypto
          account={account}
          setAccount={setAccount}
          userFunds={userFunds}
          setUserFunds={setUserFunds}
          userCoins={userCoins}
          setUserCoins={setUserCoins}
        />
        <AddingFunds
          account={account}
          setAccount={setAccount}
          userFunds={userFunds}
          setUserFunds={setUserFunds}
        />
      </div>
    </div>
  );
};

export default Wallet;
