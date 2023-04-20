import React from "react";
import "./Wallet.scss";
import BuyingCoins from "./BuyingCrypto";
import AddingFunds from "./AddingFunds";
import ExchangeCrypto from "./CryptoExchange"

const Wallet = () => {
  return (
    <>
    <h3>Crypto Wallet</h3>
      <div className="wallet">
        
        <BuyingCoins />;
        <ExchangeCrypto />
        <AddingFunds />;
      </div>
      </>
  );
};

export default Wallet;
