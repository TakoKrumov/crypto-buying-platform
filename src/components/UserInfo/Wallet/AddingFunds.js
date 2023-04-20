import React, { useState } from "react";
import "./Wallet.scss";

const AddingFunds = () => {
  // const [funds, setFunds] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation and submit the form
    if (validate()) {
      // Add your logic to handle the submission (e.g., call an API, update the state, etc.)
      const auth = JSON.parse(localStorage.getItem("auth"));
      auth.portfolio.wallet[0].fundsInAccount = (
        parseFloat(auth.portfolio.wallet[0].fundsInAccount) + parseFloat(amount)
      ).toString();
      localStorage.setItem("auth", JSON.stringify(auth));
      console.log("Form submitted");
    } else {
      console.log("Form validation failed");
    }
  };

  const validate = () => {
    // Add your validation logic here (e.g., check if fields are not empty, if the card number is valid, etc.)
    if (cvv.length > 3 || isNaN(cvv)) {
      return false;
    }

    // Add any additional validation logic here, if needed.

    return true;
  };

  const handleExpirationChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, ""); // Remove any non-numeric characters
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4); // Add the '/' separator
    }
    setExpiration(value);
  };

  return (
    <>
      <h1>Adding Funds</h1>
      <form onSubmit={handleSubmit}>
        <div className="wallet-addingFunds">
          <div className="crpExh-container">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              placeholder="card number"
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="crpExh-container">
            <label htmlFor="expiration">Expiration (MM/YY):</label>
            <input
              type="text"
              id="expiration"
              placeholder="MM/YY"
              maxLength="5" // Limit input length to 5 characters (MM/YY)
              value={expiration}
              onChange={handleExpirationChange}
            />
          </div>
          <div className="crpExh-container">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              placeholder="xxx"
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
          <div className="crpExh-container">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              placeholder="0"
              id="amount"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button type="submit" className="crpExh-btn">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddingFunds;
