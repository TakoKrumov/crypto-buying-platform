// components/TickerPrice.js
import React, { useState, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const TickerPrice = ({ symbol }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    // Create a WebSocket connection to the Binance API
    const ws = new ReconnectingWebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`
    );

    // Listen for updates from the WebSocket
    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      setPrice(data.c); // Update the price
    });

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      ws.close();
    };
  }, [symbol]);

  return (
    <div>
      {price ? (
        <p>
          {symbol}: ${price}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TickerPrice;
