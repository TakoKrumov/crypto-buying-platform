import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Histogram = ({ symbol }) => {
  const chartRef = useRef();
  let isMounted = true; // Add this flag
  // debugger;

  useEffect(() => {
    // debugger;
    fetchDataAndRenderChart();
  
    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
      if (window.histogramChart) {
        window.histogramChart.destroy(); // Destroy the previous instance if it exists
      }
    };
  }, [symbol]);

  async function fetchDataAndRenderChart() {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`
      );
      const data = response.data;
        console.log(data);
      const prices = data.map((item) => parseFloat(item[4])); // Closing prices
      const labels = data.map((item) => new Date(item[0]).toLocaleString()); // Timestamps
  
      if (isMounted && chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        console.log("ne e gre6ka")
        if (window.histogramChart) window.histogramChart.destroy(); // Destroy the previous instance if it exists
  
        window.histogramChart = new Chart(ctx, {
          type: Bar,
          data: {
            labels: labels,
            datasets: [
              {
                label: `${symbol} Closing Prices (24h)`,
                data: prices,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: { ticks: { autoSkip: true, maxRotation: 90, minRotation: 90 } },
              y: { beginAtZero: true },
            },
          },
        });
      }
    } catch (error) {
      console.log('Error fetching data:', error); // Log the error to the console
    }
  }
  
  

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Histogram;

