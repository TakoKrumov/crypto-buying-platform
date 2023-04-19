import React from 'react';
import { useGetCryptoHistoryQuery } from '../../../services/cryptoApi';
import SimplifiedHistogram from '../../../components/Histogram/SimplifiedHistogram/SimplifiedHistogram';

const CoinHistogram = ({ coinId }) => {
  const timeperiod = '7d'; // or any other time period you want to use
  const { data: coinHistory } = useGetCryptoHistoryQuery(coinId, timeperiod);

  return coinHistory ? <SimplifiedHistogram coinHistory={coinHistory} /> : null;
};

export default CoinHistogram;
