import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select, Button } from "antd";
import { MoneyCollectOutlined, TrophyOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, ThunderboltOutlined, NumberOutlined, CheckOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../../services/cryptoApi"
import HTMLReactParser from "html-react-parser";
import Histogram from "../Histogram/Histogram";
import KlineHistogram from "../Histogram/KlineHistogram";
import { fetchKlines } from "../../services/klineApi";




const { Text, Title } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const navigate = useNavigate();
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const cryptoDetails = data?.data?.coin;
  const symbol = cryptoDetails?.symbol + "USDT";
  const [klines, setKlines] = useState([])

  const handleButtonClick = (e) => {
    e.preventDefault();
    navigate('/userInfo/wallet');

  };

  useEffect(() => {
    fetchKlines(symbol, "1h", 100).then(setKlines);
  }, [symbol]);

  if (isFetching) return "Loading";

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    ...(cryptoDetails?.supply?.total !== null
      ? [{ title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> }]
      : []),
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name}({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in USD.
          View value statistics,market cap and supply.
        </p>
      </Col>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Time Period"
        onChange={(value) => setTimeperiod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <Histogram coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />
      {klines && klines.length > 0 && <KlineHistogram symbol={symbol} interval="1h" />}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value statistics
              <p>
                An overview showing the stats of {cryptoDetails.name}
              </p>
            </Title>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={`${value}+${title}`}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
          <h3>{`Do you want to buy ${cryptoDetails?.name || "crypto"}?`}</h3>
          <Button type="primary" className="buy-button" onClick={handleButtonClick}>{`Buy ${cryptoDetails?.name || "crypto"}?`}</Button>
        </div>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Other Statistics
              <p>
                An overview showing the stats of all Crypto Currencies
              </p>
            </Title>
          </Col>

          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={`${title}+${value}`}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>

  )
}

export default CryptoDetails;