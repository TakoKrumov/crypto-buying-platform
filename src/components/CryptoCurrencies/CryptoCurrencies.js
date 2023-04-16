import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link ,Outlet} from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd'
import { useGetCryptosQuery } from '../../services/cryptoApi';

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(cryptoList);

  useEffect(() => {

    const filteredData = cryptoList?.data.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    setCryptos(filteredData);

  }, [cryptoList, searchTerm])

  if (isFetching) return "loading...";

  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input placeholder='Search Crypto' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        <Outlet/>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
            <Link to={`/coins/${currency.uuid}`}>
              <Card title={`${currency.rank}. ${currency.name}`} extra={<img className='crypto-image' src={currency.iconUrl} hoverable="true"></img>}>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CryptoCurrencies;
