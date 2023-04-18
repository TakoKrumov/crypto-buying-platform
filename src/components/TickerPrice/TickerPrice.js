import React, { useState, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import './TickerPrice.scss';
import img from './spinner.gif'
import Histogram from '../Histogram/Histogram';




const TickerPrice = ({ symbol }) => {
  const [price, setPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
    // const { data: coinHistory } = useGetCryptoHistoryQuery({coinId,timeperiod});

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
        <img src={img} alt="" width='53' height='53' />
      )}
      <Histogram symbol={`${symbol}`} /> 

    </div>
  );
};

export default TickerPrice;
