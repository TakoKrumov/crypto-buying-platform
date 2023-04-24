import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link, Outlet } from 'react-router-dom';
import { Card, Row, Col, Input, Button } from 'antd';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import styles from '../CryptoCurrencies/CryptoCurrencies.module.css';
import { useNavigate } from 'react-router-dom';



const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [localPrices, setLocalPrices] = useState({}); 
  // exam api key e5430093e36ef4512d9bf1ef1b0fe5432ab02e0591519c06f820f935766d8b85
  const apiKey = '946edf48f7cf6bb17cb39beadf4f04fd0b73e22b4b7061ca7c14eb33b47de779';
  const ccStreamer = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`);
  const navigate = useNavigate();


  useEffect(() => {
    ccStreamer.onopen = function onStreamOpen() {
      let subs = cryptoList?.data.coins.slice(0, 1).map((coin) => `2~Coinbase~${coin.symbol}~USD`);
      var subRequest = {
        action: 'SubAdd',
        subs: subs,
      };
      ccStreamer.send(JSON.stringify(subRequest));
    };

    ccStreamer.onmessage = function onStreamMessage(event) {
      var message = event.data;
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.TYPE === "2") {
        const symbol = parsedMessage.FROMSYMBOL;
        const price = parsedMessage.PRICE;
        setLocalPrices(prevPrices => ({ ...prevPrices, [symbol]: price }));
      }
    };
    return () => {
      ccStreamer.close();
    };
  }, []);

  const handleButtonClick = (e) => {
    e.preventDefault();
    navigate('/userInfo/wallet');

  };

  useEffect(() => {
    const filteredData = cryptoList?.data.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return "loading...";

  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input placeholder='Search Crypto' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        <Outlet />
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
            <Link to={`/coins/${currency.uuid}`}>
              <Card className='cardAntd'
                title={
                   <Link to={`/coins/${currency.uuid}`} >
                    {`${currency.rank}. ${currency.name}`}
                  </Link>
                }
                extra={<img className='crypto-image' src={currency.iconUrl} hoverable="true"></img>}
              >
                {
                  simplified ? (
                    <>
                      <p className={currency.change > 0 ? styles['glowing-green'] : styles['glowing-red']}>Price: {localPrices && localPrices[currency.symbol] ? localPrices[currency.symbol] : millify(currency.price)} $</p>
                      <p>Market Cap: {millify(currency.marketCap)} $</p>
                      <p><span className={currency.change > 0 ? styles['glowing-green'] : styles['glowing-red']}>Daily Change: {millify(currency.change)}% <span className={styles['icon-align']}>{currency.change > 0 ? <RiseOutlined /> : <FallOutlined />}</span></span></p>
                    </>
                  ) : (
                    <>
                      <p>Price: {millify(currency.price)} $</p>
                      <p>Market Cap: {millify(currency.marketCap)} $</p>
                      <p><span className={currency.change > 0 ? styles['glowing-green'] : styles['glowing-red']}>Daily Change: {millify(currency.change)}% <span className={styles['icon-align']}>{currency.change > 0 ? <RiseOutlined /> : <FallOutlined />}</span></span></p>
                    </>
                  )
                }
                <Button type="primary" className="buy-button" onClick={handleButtonClick}>Buy</Button>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
};

export default CryptoCurrencies;