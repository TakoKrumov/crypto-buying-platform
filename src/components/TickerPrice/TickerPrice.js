// components/TickerPrice.js
import React, { useState, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import './TickerPrice.scss';

const TickerPrice = ({ symbol }) => {
  const [price, setPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);

  useEffect(() => {
    const ws = new ReconnectingWebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`
    );

    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      const newPrice = parseFloat(data.c).toFixed(2);

      if (price) {
        setPriceChange(newPrice > price ? 'up' : 'down');
      }

      setPrice(newPrice);
    });

    return () => {
      ws.close();
    };
  }, [symbol, price]);

  return (
    <div className='ticker-price'>
      {price ? (
        <p className="price">
          {symbol}: $<span className={priceChange}>{price}</span>
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TickerPrice;
