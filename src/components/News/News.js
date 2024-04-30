import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "react-bootstrap";
import { header } from "../../config/config";
import { endpointPath, endpointPathGaurdian } from "../../config/api";
import { Container, Header, card } from "./index";
import { useLocation } from "react-router-dom";
import NullImage from "../../components/Images/nullImage.jpg";

function News(props) {
  const { newscategory, country } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const category = newscategory;
  const title = capitaLize(category);
  document.title = `${capitaLize(title)} - News`;

  const updatenews = async (path) => {
    try {
      if (path === "/other/news") {
        const response = await axios.get(endpointPathGaurdian(category));
        setLoading(true);
        const parsedData = response?.data?.response?.results;
        console.log(response);
        setArticles(parsedData);
        setLoading(false);
      } else {
        const response = await axios.get(endpointPath(country, category));
        setLoading(true);
        const parsedData = response.data;
        const data = parsedData.articles?.filter(
          (item) => item?.urlToImage !== null
        );
        setArticles(data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updatenews(location.pathname);
  }, [location.pathname]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>{header(capitaLize(category))}</Header>
          <Container>
            <Row>
              {articles.map((element) => {
                return (
                  <Col sm={12} md={6} lg={4} xl={3} style={card} key={uuidv4()}>
                    <NewsItem
                      title={element.title || element.webTitle}
                      description={element.description || element.pillarName}
                      published={
                        element.publishedAt || element.webPublicationDate
                      }
                      channel={element?.source?.name || element.pillarName}
                      alt="News image"
                      publishedAt={
                        element.publishedAt || element.webPublicationDate
                      }
                      imageUrl={element.urlToImage || NullImage}
                      urlNews={element.url || element.webUrl}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

News.defaultProps = {
  country: "us",
  newscategory: "general",
};

News.propTypes = {
  country: PropTypes.string,
  newscategory: PropTypes.string,
};

export default News;
