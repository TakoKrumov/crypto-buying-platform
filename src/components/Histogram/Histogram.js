import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const Histogram = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = []; // change to use state hook 
  const coinTimestamp = [];// change to use state hook 
 
  // useEffect(()=> {
    for (let i = coinHistory?.data?.history?.length-1; i > 0; i -= 1) {
      // setCoinPrice(...coinPrice,coinHistory?.data?.history[i].price );
      coinPrice.push(coinHistory?.data?.history[i].price);
    }
  
    for (let i = coinHistory?.data?.history?.length-1; i > 0; i -= 1) {
      // console.log('Raw timestamp:', coinHistory?.data?.history[i].timestamp);
    
      const timestamp = coinHistory?.data?.history[i].timestamp * 1000; // Multiply by 1000
      coinTimestamp.push(new Date(timestamp).toLocaleDateString());
    }
  
  // }, [coinHistory])
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
      xAxes: [
        {
          type: 'category',
          labels: coinTimestamp,
        },
      ],
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return 'Price: $' + tooltipItem.yLabel;
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Bar data={data} options={options} />
    </>
  );
};

export default Histogram;
