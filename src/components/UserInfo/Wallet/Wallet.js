// import React, { useState, useEffect, useContext } from "react";
// import "./Wallet.scss";
// import { useGetCryptosQuery } from "../../../services/cryptoApi";
// import CryptoCurrencies from "../../CryptoCurrencies/CryptoCurrencies";
// import { AuthContext } from "../../../contexts/authContext";

// const Wallet = () => {
//   const count = 100;
//   const { data: cryptoList } = useGetCryptosQuery(count);
//   const [symbol, setSymbol] = useState("");
//   const [amount, setAmount] = useState(0);
//   const [selectedPrice, setSelectedPrice] = useState(0);

//   const coinData = cryptoList?.data.coins;

//   const handleCurrencyChange = (event) => {
//     const selectedIndex = event.target.selectedIndex;
//     const selectedCoinPrice = parseFloat(event.target.value);
//     const selectedCoin = event.target.options[selectedIndex].id;
//     setSelectedPrice(selectedCoinPrice);
//     console.log(selectedCoin);
//     setSymbol(selectedCoin);
// };

//   const handleAmountChange = (event) => {
//     setAmount(event.target.value);
//   };

//   const handleBuyCoins = () => {
//     const user = JSON.parse(localStorage.getItem('auth'));
//     const coinPurchase = {
//       symbol: symbol,
//       amount: parseFloat(amount),
//       pricePerCoin: selectedPrice,
//       purchaseTotal: parseFloat(amount) * selectedPrice
//     };
  
//     // Check if the user has enough funds to buy the coins
//     if (user.portfolio.wallet[0].fundsInAccount >= coinPurchase.purchaseTotal) {
//       // Deduct the purchase amount from the user's funds
//       user.portfolio.wallet[0].fundsInAccount -= coinPurchase.purchaseTotal;
  
//       // Check if the user already has the selected coin in their wallet
//       const existingCoin = user.portfolio.wallet[0].buyCoins.find(coin => coin.symbol === symbol);
  
//       if (existingCoin) {
//         // If the coin exists, update the coin amount
//         existingCoin.amount += parseFloat(amount);
//       } else {
//         // If the coin doesn't exist, add the coin and its amount to the wallet
//         user.portfolio.wallet[0].buyCoins.push({
//           symbol: symbol,
//           amount: parseFloat(amount)
//         });
//       }
  
//       // Save the updated user object back to Local Storage
//       localStorage.setItem('auth', JSON.stringify(user));
  
//       // Reset the form fields
//       setSymbol('');
//       setAmount(0);
//       setSelectedPrice(0);
//     } else {
//       alert("You don't have enough funds to buy the selected coins.");
//     }
//   };
  

//   const handleAddFunds = () => {};

//   return (
//     <div className="wallet">
//       <div className="wallet-left">
//         <h1>Crypto Wallet</h1>
//         <h1>Buying coins</h1>
//         <label htmlFor="currency">Currency:</label>
//         <select name="currency" onChange={handleCurrencyChange}>
//           <option value="" id="">
//             Select currency
//           </option>
//           {coinData?.map((coin, index) => (
//             <option key={index} value={coin.price} id={coin.symbol}>
//               {coin.symbol}
//             </option>
//           ))}
//         </select>
//         <label htmlFor="">How much coins do you like to buy?</label>


import React, { useState, useEffect, useContext } from "react";
import "./Wallet.scss";
import { useGetCryptosQuery } from "../../../services/cryptoApi";
import CryptoCurrencies from "../../CryptoCurrencies/CryptoCurrencies";
import { AuthContext } from "../../../contexts/authContext";
import { updateMe } from "../../../services/authService";

const Wallet = () => {
  const count = 100;
  const { data: cryptoList } = useGetCryptosQuery(count);
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const coinData = cryptoList?.data.coins;

  const handleCurrencyChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedCoinPrice = parseFloat(event.target.value);
    const selectedCoin = event.target.options[selectedIndex].id;
    setSelectedPrice(selectedCoinPrice);
    console.log(selectedCoin);
    setSymbol(selectedCoin);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleBuyCoins = () => {
    
    // Check if the user selected a coin symbol
    if (symbol === "") {
      alert("Please select a coin to buy.");
      return;
    }
  
    const user = JSON.parse(localStorage.getItem('auth'));
    const coinPurchase = {
      symbol: symbol,
      amount: parseFloat(amount).toFixed(2),
      pricePerCoin: parseFloat(selectedPrice).toFixed(2),
      purchaseTotal: parseFloat(amount * selectedPrice).toFixed(2)
    };
  
    // Check if the user has enough funds to buy the coins
    if (parseFloat(user.portfolio.wallet[0].fundsInAccount) >= parseFloat(coinPurchase.purchaseTotal)) {
      // Deduct the purchase amount from the user's funds
      user.portfolio.wallet[0].fundsInAccount = (parseFloat(user.portfolio.wallet[0].fundsInAccount) - parseFloat(coinPurchase.purchaseTotal)).toFixed(2);
  
      // Check if the user already has the selected coin in their wallet
      const existingCoin = user.portfolio.wallet[0].buyCoins.find(coin => coin.symbol === symbol);
  
      if (existingCoin) {
        // If the coin exists, update the coin amount
        existingCoin.amount = (parseFloat(existingCoin.amount) + parseFloat(amount)).toFixed(2);
      } else {
        // If the coin doesn't exist, add the coin and its amount to the wallet
        user.portfolio.wallet[0].buyCoins.push({
          symbol: symbol,
          amount: parseFloat(amount).toFixed(2)
        });
      }
  
      // Save the updated user object back to Local Storage
      localStorage.setItem('auth', JSON.stringify(user));
  
      // Reset the form fields
      setSymbol('');
      setAmount(0);
      setSelectedPrice(0);
  
      // Reset the select form
      document.querySelector("select[name='currency']").selectedIndex = 0;
    } else {
      alert("You don't have enough funds to buy the selected coins.");
    }
    const loggedUser = JSON.parse(localStorage.getItem('auth'))
    

  };
  

  const handleAddFunds = () => {};

  return (
    <div className="wallet">
      <h1>Crypto Wallet</h1>
      <div className="wallet-left">      
        <h3>Buying coins</h3>
        <label htmlFor="currency">Currency:</label>
        <select name="currency" onChange={handleCurrencyChange}>
          <option value="" id="">
            Select currency
          </option>
          {coinData?.map((coin, index) => (
            <option key={index} value={coin.price} id={coin.symbol}>
              {coin.symbol} 
            </option>
          ))}
        </select>
        <label htmlFor="amount">How much coins do you like to buy?</label>
        <input
          type="number"
          min={0}
          name="amount"
          value={parseFloat(amount)}
          onChange={handleAmountChange}
        />
        <label htmlFor="amount">
          Coin amount: {amount} {symbol} <br />*<br /> ${selectedPrice.toFixed(2)} {symbol}
          <br /> Total: ${(amount * selectedPrice).toFixed(2)}
        </label>
        
        <button onClick={handleBuyCoins} className="crpExh-btn">Buy Coins</button>

      </div>
      <h1>Adding funds</h1>
      <div className="wallet-right"></div>
    </div>
  );
};

export default Wallet;
