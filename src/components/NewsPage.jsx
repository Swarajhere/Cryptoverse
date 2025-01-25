// import React from "react";
// import { Select, Row, Col, Card, Avatar, Typography } from "antd";
// import moment from "moment";
// import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

// const { Title, Text } = Typography;
// const { Option } = Select;

// const NewsPage = ({ simplified }) => {
//   const {
//     data: cryptoNewsApi,
//     isFetching,
//     error,
//   } = useGetCryptoNewsQuery({
//     newsCategory: "Cryptocurrency",
//     count: simplified ? 10 : 100,
//   });
//   console.log(cryptoNewsApi);
//   return <div>NewsPage</div>;
// };

// export default NewsPage;

import React from "react";
import { Row, Col, Card, Typography, Spin } from "antd";
import moment from "moment";
import { useGetNewsByCategoryQuery } from "../services/cryptoNewsApi";

const { Title, Text } = Typography;

const NewsPage = ({ simplified }) => {
  const count = simplified ? 6 : 50; // Control the number of news articles
  const { data: businessNews, isFetching } = useGetNewsByCategoryQuery({
    category: "business",
    languageRegion: "en-US",
  });

  // console.log(businessNews?.items); // Debugging the response structure //429 limit exceed

  if (isFetching) return <Spin tip="Loading Business News..." />;
  if (!businessNews?.items || businessNews.items.length === 0)
    return (
      <div>
        No news available.{" "}
        <p style={{ color: "red" }}>(Request Limit Exceeded)</p>
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: simplified ? "#fff" : "rgb(0, 21, 41)",
        borderColor: simplified ? "#fff" : "rgb(0,21,41)",
      }}
    >
      <Row gutter={[24, 24]}>
        {businessNews.items.slice(0, count).map((news, index) => {
          // Proxy the image URL to avoid SameSite issues
          const imageUrl = news.images?.thumbnail
            ? `https://img.devisty.store/newsimage/${news.images.thumbnail
                .split("/")
                .pop()}`
            : null;

          return (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card hoverable>
                <a href={news.newsUrl} target="_blank" rel="noreferrer">
                  <div>
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="News thumbnail"
                        style={{ width: "100%", marginBottom: "10px" }}
                      />
                    )}
                    <Title level={4}>{news.title}</Title>
                    <Text>{news.snippet}</Text>
                    <Text type="secondary">
                      {moment(parseInt(news.timestamp, 10)).fromNow()}
                    </Text>
                  </div>
                </a>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default NewsPage;
