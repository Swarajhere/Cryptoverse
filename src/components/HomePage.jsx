import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, NewsPage } from "../components";

const { Title } = Typography;

const HomePage = () => {
  const { data, isFetching, error } = useGetCryptosQuery(10);
  if (isFetching) return <p style={{ fontSize: "1rem" }}>Loading...</p>;
  if (error) console.error("Error fetching data:", error);
  // console.log("API Response:", data);

  const globalStats = data?.data?.stats;
  // console.log(globalStats);

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(globalStats.totalCoins)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            // value={millify(globalStats.totalMarketCap)}
            value={millify(3300000000000)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={2} className="show-more" style={{ fontSize: "large" }}>
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Business News
        </Title>
        <Title level={2} className="show-more" style={{ fontSize: "large" }}>
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <NewsPage simplified />
    </>
  );
};

export default HomePage;
