import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchKlines } from '../../services/klineApi';

const KlineHistogram = ({ symbol, interval }) => {
  const [klines, setKlines] = useState([]);
  const binanceSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);

  useEffect(() => {
    fetchKlines(symbol, interval, 500).then(setKlines);
  }, [symbol, interval]);
  

  useEffect(() => {
    binanceSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const kline = message.k;
      setKlines((prevKlines) => [...prevKlines, { x: new Date(kline.t), y: [parseFloat(kline.o), parseFloat(kline.h), parseFloat(kline.l), parseFloat(kline.c)] }]);
    };
    return () => {
      binanceSocket.close();
    };
  }, [symbol, interval]);


  const options = {
    chart: {
      type: 'candlestick',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 1,
      interpolate: true,
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    tooltip: {
      enabled: true,
    },
    animation: {
      enabled: true,
      duration: 100, 
    },
    title: {
      text: 'CandleStick Chart - Category X-axis',
      align: 'left',
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleDateString();
        },
        style: {
          colors: '#a9a9a9',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: '#a9a9a9',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#0dbd8a',
          downward: '#e74c3c',
        },
        wick: {
          useFillColor: true,
        },
      },
    },
    grid: {
      borderColor: '#2d2d2d',
      strokeDashArray: 5,
    },
  };

  return (
    <Chart options={options} series={[{ name: 'test', data: klines }]} type="candlestick" height={450} />
  );
};

export default KlineHistogram;
