import React from 'react';
import millify from 'millify';
import {Typography,Row,Col,Statistic} from 'antd';
import {Link} from 'react-router-dom';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import CryptoCurrencies from '../CryptoCurrencies/CryptoCurrencies'
import News from '../News/News'

const {Title} = Typography;


const Homepage = () => {

  const {data ,isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data.stats;

  if(isFetching) return "loading...";

  return (
    <div className='homeContainer'>
      <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row className='light-theme'>
        <Col span={12}><Statistic title="Total Cryptocurrencies" className='statistic-title' value={globalStats.total}/></Col>
        <Col span={12}><Statistic title="Total Exchanges" className='statistic-title' value={millify(globalStats.totalExchanges)}/></Col>
        <Col span={12}><Statistic title="Total Market Cap" className='statistic-title' value={millify(globalStats.totalMarketCap)}/></Col>
        <Col span={12}><Statistic title="Total 24h Volume" className='statistic-title' value={millify(globalStats.total24hVolume)}/></Col>
        <Col span={12}><Statistic title="Total Markets" className='statistic-title' value={millify(globalStats.totalMarkets)}/></Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className='show-more'><Link to="/coins">Show More</Link></Title>
      </div>
      <CryptoCurrencies simplified></CryptoCurrencies>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Latest Crypto News</Title>
        <Title level={3} className='show-more'><Link to="/news">Show More</Link></Title>
      </div>
      <News simplified></News>
    </div>
  );
};

export default Homepage;
