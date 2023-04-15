import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wallet.scss'

function Wallet() {
  // debugger
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
      const currencyList = response.data.map((item) => item.symbol);
      console.log(response)
      setCurrencies(currencyList);
    };

    fetchCurrencies();
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAddFunds = () => {
    console.log('Adding funds:', amount, selectedCurrency);
    
    // Integrate Binance API for depositing funds here
  };

  const handleBuyCoins = () => {
    console.log('Buying coins:', amount, selectedCurrency);
    // Integrate Binance API for purchasing coins here
  };

  return (
    <div className="wallet">
    <div className="wallet-left">
      <h1>Crypto Wallet</h1>
      <h1>Buying coins</h1>
        <label htmlFor="currency">Currency:</label>
        <select name="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
          <option value="">Select currency</option>
          {currencies.map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      
        <label htmlFor="amount">Amount:</label>
        <input type="number" name="amount" value={amount} onChange={handleAmountChange} />
        <button onClick={handleBuyCoins}>Buy Coins</button>

            <br/>
      <h1>Adding funds</h1>
      
        <label htmlFor="currency">Currency:</label>
        <select name="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
          <option value="">Select currency</option>
          {currencies.map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      
        <label htmlFor="amount">Amount:</label>
        <input type="number" name="amount" value={amount} onChange={handleAmountChange} />
      
        <button onClick={handleAddFunds}>Add Funds</button>

    </div>
    <div className="wallet-right"></div>
    </div>
  );
}

export default Wallet;
