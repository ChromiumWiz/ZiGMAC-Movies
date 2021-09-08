import React, { useState, useEffect } from "react";
import { Col, Image, Container, Row } from "react-bootstrap";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../moviecard/moviecard.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import Recent from "./../recent/Recent";
import SMovCard from "./SMovCard";
require("es6-promise").polyfill();
require("isomorphic-fetch");

function Smovie() {
  const [data, setData] = useState([null]);
  const [reqId, setId] = useState("");

  let { id } = useParams();

  // setId(id);

  useEffect(() => {
    fetchItems();
  }, []);

  console.log(id);

  var url = "http://localhost:3001/movies/" + id;

  var imgurl = "http://localhost:3001/image/" + data.imdb_id;

  var genres = data.genre;
  // genres = genres.split(',');
  // console.log(data.genre);
  // console.log(url);

  const fetchItems = async () => {
    // setData(null);
    const data = await fetch(url);
    const items = await data.json();
    console.log(items);
    setData(items);
  };

  if (id !== data.imdb_id) {
    fetchItems();
  }
  //   console.log(data);

  // console.log(useState.data);
  if (data === null) {
    return <p>Loading data...</p>;
  }
  return (
    <Col sm="12">
      <Container className="">
        {data ? (
          <SMovCard
            imgurl={imgurl}
            title={data.title}
            rating={data.rating}
            published={data.date_published}
            genres={data.genre}
            summary={data.summary}
            stars={data.actors}
            type={data.type}
          />
        ) : (
          ""
        )}
      </Container>

      <div className="movSpace"></div>

      {/* <Container fluid>
                <Row>
                    <Recent/>
                </Row>
            </Container> */}
    </Col>
  );
}

export default Smovie;
