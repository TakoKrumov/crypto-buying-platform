import React, { useState, useEffect, useContext } from "react";
import "./Wallet.scss";
import img from "./spinner.gif";
import { useGetCryptosQuery } from "../../../services/cryptoApi";

export default function ExchangeCoins() {
  const count = 100;
  const { data: cryptoList } = useGetCryptosQuery(count);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [targetCoin, setTargetCoin] = useState(null);
  const [amountFirst, setAmountFirst] = useState(0);
  const [amountSecond, setAmountSecond] = useState(0);
  const [iconFirst, setIconFirst] = useState(img);
  const [iconSecond, setIconSecond] = useState(img);
  const [amountForExchange, setAmountForExchange] = useState(0);
  const [userCoins, setUserCoins] = useState(
    JSON.parse(localStorage.getItem("auth"))?.portfolio?.wallet[0]?.buyCoins
  );
  
  console.log(userCoins)
  const coinData = cryptoList?.data.coins;

  const handleSelectedCoinChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedSymbol = event.target.options[selectedIndex].id;
    const temporal = userCoins?.find((coin) => coin?.symbol === selectedSymbol);
    console.log(`temporal`, temporal);
    const selectedCoinData = coinData.find(
      (coin) => coin?.symbol === temporal?.symbol
    );
    setSelectedCoin(selectedCoinData);
    setIconFirst(selectedCoinData.iconUrl);
    setAmountFirst(parseFloat(temporal.amount));
  };

  const handleTargetCoinChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedSymbol = event.target.options[selectedIndex].id;
    const selectedCoinPrice = parseFloat(event.target.value);
    setTargetCoin({ symbol: selectedSymbol, price: selectedCoinPrice });
    setIconSecond(event.target.options[selectedIndex].dataset.icon);
  };

  const handleAmountChange = (event) => {
    let inputAmount = parseFloat(event.target.value);
    // const maxAmount = parseFloat(amountFirst || 0);

    if (inputAmount >= amountFirst) {
      inputAmount = amountFirst.toFixed(2);
    }

    setAmountForExchange(inputAmount);
    console.log(selectedCoin)
    
    setAmountSecond((inputAmount * selectedCoin?.price) / targetCoin?.price);
  };

  const handleExchangeCoins = () => {
    if (!selectedCoin || !targetCoin) {
      alert("Please select both coins for the exchange.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("auth"));
    const coinsInWallet = user.portfolio.wallet[0].buyCoins;

    const targetCoinInWallet = coinsInWallet.find(
      (coin) => coin.symbol === targetCoin.symbol
    );

    const exchangedAmount =
      (amountSecond * selectedCoin.price) / targetCoin.price;

    if (targetCoinInWallet) {
      targetCoinInWallet.amount = (
        parseFloat(targetCoinInWallet.amount) + exchangedAmount
      ).toFixed(2);
    } else {
      coinsInWallet.push({
        symbol: targetCoin.symbol,
        amount: exchangedAmount.toFixed(2),
      });
    }

    selectedCoin.amount = (parseFloat(0) - parseFloat(0)).toFixed(2);

    if (parseFloat(selectedCoin.amount) === 0) {
      coinsInWallet.splice(
        coinsInWallet.findIndex((coin) => coin.symbol === selectedCoin.symbol),
        1
      );
    }

    localStorage.setItem("auth", JSON.stringify(user));

    setSelectedCoin(null);
    setTargetCoin(null);
    setAmountSecond(0);
    setIconSecond(img);

    document.querySelector("select[name='selectedCoin']").selectedIndex = 0;
    document.querySelector("select[name='targetCoin']").selectedIndex = 0;
  };

  return (
    <>
      <h3>Exchange Coins</h3>
      <div className="wallet-exchangingCrypto">
        <div className="crpExh-container">
          <label htmlFor="selectedCoin">From:</label>
          <span>
            <select name="selectedCoin" onChange={handleSelectedCoinChange}>
              <option value="" id="">
                Select...
              </option>
              {Array.isArray(userCoins) && userCoins?.map((coin, index) => (
                <option key={index} id={coin.symbol} data-icon={coin.iconUrl}>
                  {coin.symbol}
                </option>
              ))}
            </select>
            <img
              src={!iconFirst === true ? img : iconFirst}
              alt=""
              className="crpExh-icon"
            />
          </span>
        </div>
        <div className="crpExh-container">
          <label htmlFor="amount">Exchanging Amount:</label>
          <input
            type="number"
            step={0.01}
            min={0}
            max={parseFloat(amountFirst).toFixed(2)}
            maxLength={amountFirst.length}
            name="amount" 
            value={amountForExchange} // use state value
            onChange={handleAmountChange}
          />
        </div>
        <div className="crpExh-container">
          <label htmlFor="targetCoin">To:</label>
          <span>
            <select name="targetCoin" onChange={handleTargetCoinChange}>
              <option value="" id="">
                Select...
              </option>
              {coinData?.map((coin, index) => (
                <option
                  key={index}
                  value={coin.price}
                  id={coin.symbol}
                  data-icon={coin.iconUrl}
                >
                  {coin.symbol}
                </option>
              ))}
            </select>
            <img
              src={!iconSecond === true ? img : iconSecond}
              alt=""
              className="crpExh-icon"
            />
          </span>
        </div>
        <input
            type="number"
            min={0}
            max={parseFloat(amountSecond || 0).toFixed(2)}
            name="amount"
            value={amountSecond.toFixed(2)}
            readOnly
          />
        <button onClick={handleExchangeCoins} className="crpExh-btn">
          Exchange
        </button>
      </div>
    </>
  );
}
