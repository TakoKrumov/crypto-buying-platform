import React, { useState, useEffect } from 'react';
import { fetchKlines } from '../../../utils/fetchBinanceData';
import { Chart } from 'react-chartjs-2';
function Histogram() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const klines = await fetchKlines('BTCUSDT', '1d', 30); // Fetch 30 days of daily candlestick data for BTCUSDT
      const formattedData = klines.map(([time, open, high, low, close]) => ({
        x: new Date(time),
        y: [open, high, low, close]
      }));
      setData([{
        data: formattedData,
        label: 'BTCUSDT'
      }]);
    };

    fetchData();
  }, []);

  const series = React.useMemo(
    () => ({
      type: 'candlestick'
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  );

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Chart data={data} series={series} axes={axes} tooltip />
    </div>
  );
}

export default Histogram;
