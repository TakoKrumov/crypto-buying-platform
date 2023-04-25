import React, { useState, useEffect, useContext } from "react";
import "./Wallet.scss";
import img from "./fi-cnsuxl-question-mark.svg";
import { useGetCryptosQuery } from "../../../services/cryptoApi";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function BuyingCoins({
  account,
  setAccount,
  userFunds,
  setUserFunds,
  userCoins,
  setUserCoins,
}) {
  const count = 100;
  const { data: cryptoList } = useGetCryptosQuery(count);
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState(0);
  const [icon, setIcon] = useState(img);
  const [selectedPrice, setSelectedPrice] = useState(0);


  const [maxAmount, setMaxAmount] = useState(0);

  const coinData = cryptoList?.data.coins;

  useEffect(() => {
    // Update maxAmount when selectedPrice or myMoney changes
    setMaxAmount(parseFloat(userFunds / selectedPrice).toFixed(2));
  }, [selectedPrice, userFunds]);

  const handleCurrencyChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedCoinPrice = parseFloat(event.target.value);
    const selectedCoin = event.target.options[selectedIndex].id;
    setSelectedPrice(selectedCoinPrice);
    setSymbol(selectedCoin);
    console.log(event.target.options[selectedIndex]);
    setIcon(event.target.options[selectedIndex].dataset.icon);
  
    // Calculate the minimum coin amount required for a $0.01 purchase
    let minAmountForOneCent = 0.01 / selectedCoinPrice;
  
    // If the coin price is greater than or equal to $0.01, set the minimum amount to 0.01
    if (selectedCoinPrice >= 0.01) {
      minAmountForOneCent = 0.01;
    }
  
    // Update the amount state to the minimum coin amount
    setAmount(minAmountForOneCent);
  };

  // const handleAmountChange = (event) => {
  //   setAmount(event.target.value);
  // };
  const handleAmountChange = (event) => {
    let inputAmount = parseFloat(event.target.value);

    if (inputAmount > maxAmount) {
      inputAmount = maxAmount;
    }

    // Handle backspace, empty or zero input case
    if (isNaN(inputAmount) || inputAmount === 0) {
      setAmount(0);
      return;
    }

    setAmount(inputAmount);
  };

  const handleBuyCoins = () => {
    // Check if the user selected a coin symbol
    if (symbol === "") {
      toast.error("Please select a coin to buy.");
      return;
    }

    if (amount < 0.01) {
      toast.error("Minimum amount required to buy is 0.01.");
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
      const existingCoin = user?.portfolio?.wallet[0]?.buyCoins.find(
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
      setIcon(img);
      setUserFunds(JSON.parse(
        localStorage.getItem("auth")
      )?.portfolio?.wallet[0]?.fundsInAccount)
      setUserCoins(JSON.parse(
        localStorage.getItem("auth")
      )?.portfolio?.wallet[0]?.buyCoins)
      // Reset the select form
      document.querySelector("select[name='currency']").selectedIndex = 0;
    } else {
      toast.error("You don't have enough funds to buy the selected coins.");
    }
  };

  const handleAddFunds = () => {};
  return (
    <>
      <h3>Buying coins</h3>
      <ToastContainer />
      <div className="wallet-buyingCrypto">
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
            step={0.01}
            min={!!amount ? (parseFloat(amount)) : 0}
            max={maxAmount} // Use maxAmount as the maximum value for the input field
            name="amount"
            value={!!amount ? parseFloat(amount) : ""}
            onChange={handleAmountChange}
          />
        </div>
        <span type="radio" name="" id="crpExh-total" /> Total: $
        {(amount && amount * selectedPrice).toFixed(2)}
        <button onClick={handleBuyCoins} className="crpExh-btn">
          Buy
        </button>
      </div>
    </>
  );
}
