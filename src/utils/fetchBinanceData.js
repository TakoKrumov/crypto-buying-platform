// utils/fetchBinanceData.js
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

const fetchMultipleSymbols = async (limit, fiatCurrency = 'USDT') => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
    const coinSymbols = response.data
      .filter((symbolInfo) => symbolInfo.symbol.endsWith(fiatCurrency))
      .slice(0, limit)
      .map((symbolInfo) => symbolInfo.symbol);
    const symbolDataPromises = coinSymbols.map((symbol) => fetchBinanceData(symbol));
    const symbolData = await Promise.all(symbolDataPromises);

    return symbolData;
  } catch (error) {
    console.error('Error fetching multiple symbols:', error);
    return [];
  }
};

export { fetchBinanceData, fetchMultipleSymbols };
