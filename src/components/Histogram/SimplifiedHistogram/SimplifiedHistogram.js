import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const SimplifiedHistogram = ({ coinHistoriesData }) => {
  const generateChartData = (coinHistory) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = coinHistory?.data?.history?.length - 1; i > 0; i -= 1) {
      coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = coinHistory?.data?.history?.length - 1; i > 0; i -= 1) {
      const timestamp = coinHistory?.data?.history[i].timestamp * 1000;
      coinTimestamp.push(new Date(timestamp).toLocaleDateString());
    }

    return {
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
      {coinHistoriesData.map((coinHistory, index) => (
        <React.Fragment key={index}>
          <Row className="chart-header">
            <Col className="price-container">
              <Title level={5} className="price-change">
                {coinHistory?.data?.change}%
              </Title>
            </Col>
          </Row>
          <Bar data={generateChartData(coinHistory)} options={options} />
        </React.Fragment>
      ))}
    </>
  );
};

export default SimplifiedHistogram;
