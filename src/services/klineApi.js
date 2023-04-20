import axios from 'axios';

export const fetchKlines = async (symbol, interval,limit) => {
  try {
    const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
    return response.data.map(kline => ({
      x: new Date(kline[0]),
      y: [parseFloat(kline[1]), parseFloat(kline[2]), parseFloat(kline[3]), parseFloat(kline[4])],
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};