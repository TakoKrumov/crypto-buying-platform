import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const KlineHistogram = ({ symbol, interval }) => {
  const [klines, setKlines] = useState([]);
  const binanceSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);

  useEffect(()=>{
    axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=${100}`)
    .then(response => {
      setKlines(response.data.map(kline => ({ x: new Date(kline[0]), y: [parseFloat(kline[1]), parseFloat(kline[2]), parseFloat(kline[3]), parseFloat(kline[4])] })));
    })
    .catch(error => {
      console.error(error);
    });
  },[]);
  

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
  console.log(klines);
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
    <Chart options={options} series={[{ name: 'test', data: klines }]} type="candlestick" height={650} />
  );
};

export default KlineHistogram;
