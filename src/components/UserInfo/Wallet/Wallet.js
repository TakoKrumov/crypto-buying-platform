import React, {useState} from "react";
import "./Wallet.scss";
import BuyingCoins from "./BuyingCrypto";
import AddingFunds from "./AddingFunds";
import ExchangeCrypto from "./CryptoExchange"
import { useGetCryptosQuery } from "../../../services/cryptoApi";
import { Link } from "react-router-dom";

const Wallet = () => {
  
  const [account, setAccount] = useState(JSON.parse(localStorage.getItem("auth")))
  const [userCoins, setUserCoins] = useState(
    JSON.parse(localStorage.getItem("auth"))?.portfolio?.wallet[0]?.buyCoins
  );
  const [icon, setIcon] = useState();
  const count = 100;
  const { data: cryptoList } = useGetCryptosQuery(count);
  const isAuth = !!JSON.parse(localStorage.getItem("auth"))?.email
    ? JSON.parse(localStorage.getItem("auth"))
    : false;

  if (!isAuth) {
    return (
      <>
        <div>GO to <Link to="/login">Login</Link> GO to <Link to="/register">Register</Link></div>
      </>
    );
  }

  return (
    <>
    <h3>Crypto Wallet</h3>
    <span>Money in wallet:{account.portfolio.wallet[0].fundsInAccount}</span>
    <span>Coins:{Array.isArray(userCoins) && userCoins?.map((coin) => (
                <p key={coin.uuid} id={coin.symbol} data-icon={coin.iconUrl}>
                  {coin.symbol} : {coin.amount} : <img src={coin.iconUrl} alt="" />
                </p>
              ))}</span>
      <div className="wallet">        
        <BuyingCoins />;
        <ExchangeCrypto />
        <AddingFunds />;
      </div>
      </>
  );
};

export default Wallet;
