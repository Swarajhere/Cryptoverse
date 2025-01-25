import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi"; // imp

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching, error } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  // console.log(cryptos);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // setCryptos(cryptosList?.data?.coins); // unnecessary

    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <p style={{ fontSize: "10px" }}>Loading Data...</p>;
  if (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data";
  }

  return (
    <>
      {!simplified && (
        <div
          className="search-crypto"
          style={{
            display: "flex",
            alignItems: "center",
            alignItems: "flex-start",
          }}
        >
          <input
            type="text"
            placeholder="search cryptos"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <button
            onClick={() => setSearchTerm(searchTerm)}
            style={{ padding: "5px 10px", cursor: "pointer" }}
          >
            Search
          </button>
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map(
          (
            crypto // sometimes cryptos can be empty hence we have put a question mark
          ) => (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={crypto.uuid}
            >
              <Link to={`/crypto/${crypto.uuid}`}>
                <Card
                  title={`${crypto.rank}.${crypto.name}`}
                  extra={<img className="crypto-image" src={crypto.iconUrl} />}
                  hoverable
                  // style={{ color: `${crypto.color}` }}
                >
                  <p>Price : {millify(crypto.price)}</p>
                  <p>Market Cap : {millify(crypto.marketCap)}</p>
                  <p>Daily Change : {crypto.change}%</p>
                </Card>
              </Link>
            </Col>
          )
        )}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
