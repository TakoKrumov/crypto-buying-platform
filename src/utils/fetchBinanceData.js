import axios from 'axios';

const fetchBinanceData = async (symbol) => {
  try {
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Binance data:', error);
    return null;
  }
};

export default fetchBinanceData;
