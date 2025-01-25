import "./App.css";
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

// import Navbar from "./components/Navbar";
import {
  Navbar,
  Exchanges,
  HomePage,
  Cryptocurrencies,
  NewsPage,
  CryptoDetails,
} from "./components";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:uuid" element={<CryptoDetails />} />
              <Route path="/news" element={<NewsPage />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={4}
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "2rem",
            }}
          >
            Cryptoverse <br />
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "0rem",
                fontWeight: "lighter",
                fontSize: "1rem",
                fontFamily: "inherit",
              }}
            >
              All rights reserved
            </div>
          </Typography.Title>
          <Space
            style={{
              marginTop: "0rem",
              paddingTop: "0rem",
              fontSize: "1rem",
              fontFamily: "monospace",
            }}
          >
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
