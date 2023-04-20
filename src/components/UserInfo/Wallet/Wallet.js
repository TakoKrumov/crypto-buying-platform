import React, { useState, useEffect, useContext } from "react";
import "./Wallet.scss";
import img from "./spinner.gif";
import { useGetCryptosQuery } from "../../../services/cryptoApi";
import CryptoCurrencies from "../../CryptoCurrencies/CryptoCurrencies";

const Wallet = () => {
  const count = 100;
  const { data: cryptoList } = useGetCryptosQuery(count);
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState(0);
  const [icon, setIcon] = useState(img);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [myMoney, setMyMoney] = useState(JSON.parse(localStorage.getItem('auth')).portfolio.wallet[0].fundsInAccount)

  const coinData = cryptoList?.data.coins;

  const handleCurrencyChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedCoinPrice = parseFloat(event.target.value);
    const selectedCoin = event.target.options[selectedIndex].id;
    setSelectedPrice(selectedCoinPrice);
    console.log(selectedCoin);
    setSymbol(selectedCoin);
    console.log(event.target.options[selectedIndex]);
    setIcon(event.target.options[selectedIndex].dataset.icon);
  };

  // const handleAmountChange = (event) => {
  //   setAmount(event.target.value);
  // };
  const handleAmountChange = (event) => {
    let inputAmount = parseFloat(event.target.value);
    const maxAmount = parseFloat(myMoney / selectedPrice.toFixed(2));

    if (inputAmount >= maxAmount) {
      inputAmount = maxAmount.toFixed(2) ;
    }

    setAmount(inputAmount);
  };

  const handleBuyCoins = () => {
    // Check if the user selected a coin symbol
    if (symbol === "") {
      alert("Please select a coin to buy.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("auth"));
    const coinPurchase = {
      symbol: symbol,
      amount: parseFloat(amount).toFixed(2),
      pricePerCoin: parseFloat(selectedPrice).toFixed(2),
      purchaseTotal: parseFloat(amount * selectedPrice).toFixed(2),
    };

    // Check if the user has enough funds to buy the coins
    if (
      parseFloat(user.portfolio.wallet[0].fundsInAccount) >=
      parseFloat(coinPurchase.purchaseTotal)
    ) {
      // Deduct the purchase amount from the user's funds
      user.portfolio.wallet[0].fundsInAccount = (
        parseFloat(user.portfolio.wallet[0].fundsInAccount) -
        parseFloat(coinPurchase.purchaseTotal)
      ).toFixed(2);

      // Check if the user already has the selected coin in their wallet
      const existingCoin = user.portfolio.wallet[0].buyCoins.find(
        (coin) => coin.symbol === symbol
      );

      if (existingCoin) {
        // If the coin exists, update the coin amount
        existingCoin.amount = (
          parseFloat(existingCoin.amount) + parseFloat(amount)
        ).toFixed(2);
      } else {
        // If the coin doesn't exist, add the coin and its amount to the wallet
        user.portfolio.wallet[0].buyCoins.push({
          symbol: symbol,
          amount: parseFloat(amount).toFixed(2),
        });
      }

      // Save the updated user object back to Local Storage
      localStorage.setItem("auth", JSON.stringify(user));

      // Reset the form fields
      setSymbol("");
      setAmount(0);
      setSelectedPrice(0);
      setIcon(img)

      // Reset the select form
      document.querySelector("select[name='currency']").selectedIndex = 0;
    } else {
      alert("You don't have enough funds to buy the selected coins.");
    }
    
  };

  const handleAddFunds = () => {};

  return (
    <div className="wallet">
      <h1>Crypto Wallet</h1>
      <div className="wallet-buyingCrypto">
        <h3>Buying coins</h3>
        <div className="crpExh-container">
          <label htmlFor="currency">Currency:</label>
          <span>
          <select name="currency" onChange={handleCurrencyChange}>
            
            <option value="0" id="">
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
            src={!icon === true ? img : icon}
            alt=""
            className="crpExh-icon"
          />
          </span>
        </div>
        <div className="crpExh-container">
              <label htmlFor="pricePerCoin">Price per coin:</label>
              <span>${selectedPrice.toFixed(2)} </span>
        </div>

        <div className="crpExh-container">
        <label htmlFor="amount">Buying Quantity:</label>
        <input
          type="number"
          min={0}
          max = {(myMoney/selectedPrice).toFixed(2)}
          name="amount"
          value={!!amount ? parseFloat(amount) : 0}
          onChange={handleAmountChange}
          
        />
       </div>
          <span type="radio" name="" id="crpExh-total" /> Total: ${(amount * selectedPrice).toFixed(2)}
        <button onClick={handleBuyCoins} className="crpExh-btn">
          Buy
        </button>
      </div>
      <h1>Adding funds</h1>
      <div className="wallet-addingFunds"></div>
      </div>
    
  );
};

export default Wallet;
