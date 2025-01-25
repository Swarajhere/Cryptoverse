import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography, Spin } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

// Register necessary chart components for Chart.js v3+
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const { Title: AntTitle, Text } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  console.log(coinHistory);
  // Loading state handling
  if (!coinHistory) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  const coinPrice = [];
  const coinTimestamp = [];

  // Safely extract price and timestamp data
  if (coinHistory?.data?.history) {
    coinHistory.data.history.forEach((entry) => {
      if (entry.price && !isNaN(parseFloat(entry.price))) {
        coinPrice.push(parseFloat(entry.price));
      }
      if (entry.timestamp) {
        coinTimestamp.push(
          new Date(entry.timestamp * 1000).toLocaleDateString()
        );
      }
    });
  }

  // Check if we have data
  if (coinPrice.length === 0 || coinTimestamp.length === 0) {
    return <Text>No valid data available to render the chart.</Text>;
  }

  // Chart data structure
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
        tension: 0.1, // Added slight curve to the line
      },
    ],
  };

  // Chart options with updated scale configuration for Chart.js v3+
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${coinName} Price Chart`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <AntTitle level={2} className="chart-title">
          {coinName} Price Chart
        </AntTitle>
        <Col className="price-container">
          <AntTitle level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </AntTitle>
          <AntTitle level={5} className="current-price">
            Current {coinName} Price: ${currentPrice}
          </AntTitle>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
