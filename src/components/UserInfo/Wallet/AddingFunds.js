import React, { useState } from "react";
import "./Wallet.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auto } from "@popperjs/core";


const AddingFunds = ({userFunds, setUserFunds}) => {
  // const [funds, setFunds] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation and submit the form
    if (validate()) {
      // Add your logic to handle the submission (e.g., call an API, update the state, etc.)
      const auth = JSON.parse(localStorage.getItem("auth"));
      
      setUserFunds(auth.portfolio.wallet[0].fundsInAccount = (
        parseFloat(auth.portfolio.wallet[0].fundsInAccount) + parseFloat(amount)
      ).toString())
      // console.log("Form submitted");
    } else {
      // console.log("Form validation failed");
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
              maxLength={16}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="crpExh-container">
  <label htmlFor="expiration">Expiration (MM/YY):</label>
  <DatePicker
    selected={selectedDate}
    onChange={(date) => setSelectedDate(date)}
    dateFormat="MM/yy"
    showMonthYearPicker
    showFullMonthYearPicker
    minDate={new Date(currentYear, currentMonth, 1)}
    id="expiration"
    placeholderText="MM/YY"
  />
</div>
          <div className="crpExh-container">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              maxLength={3}
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
