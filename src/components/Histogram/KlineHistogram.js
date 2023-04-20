import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const KlineHistogram = ({ symbol, interval }) => {
  const [klines, setKlines] = useState([]);
  const binanceSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);

  useEffect(() => {

    binanceSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const kline = message.k;

      setKlines((prevKlines) => [
        ...prevKlines,
        {
          timestamp: new Date(kline.t).toLocaleDateString(),
          open: parseFloat(kline.o),
          close: parseFloat(kline.c),
          high: parseFloat(kline.h),
          low: parseFloat(kline.l),
        },
      ]);
    };

    return () => {
      binanceSocket.close();
    };
  }, [symbol, interval]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={klines}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="close" fill="#0071bd" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default KlineHistogram;