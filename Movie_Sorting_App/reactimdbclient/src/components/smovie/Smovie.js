import React, { useState, useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../moviecard/moviecard.css";
import { useParams } from "react-router-dom";
import SMovCard from "./SMovCard";
require("es6-promise").polyfill();
require("isomorphic-fetch");

function Smovie() {
  const [data, setData] = useState([null]);
  // const [reqId, setId] = useState("");

  let { id } = useParams();

  // setId(id);

  useEffect(() => {
    if (!data.id) {
      fetchItems();
    }
  });

  console.log(id);

  var url = "http://169.254.212.69:3001/movies/" + id;

  var imgurl = "http://169.254.212.69:3001/image/" + data.imdb_id;

  const fetchItems = () => {
    // setData(null);
    // const data = await fetch(url);
    // const items = await data.json();
    fetch(url)
      .then((response) => response.json())
      .then((items) => {
        setData(items);
      });
    // console.log(items);
  };

  // if (id !== data.imdb_id) {
  //   fetchItems();
  // }
  if (data === null) {
    return <p>Loading data...</p>;
  }
  return (
    <Col sm="12">
      <Container className="">
        {data ? (
          <SMovCard
            id={id}
            imgurl={imgurl}
            title={data.title}
            rating={data.rating}
            published={data.date_published}
            genres={data.genre}
            summary={data.summary}
            stars={data.actors}
            type={data.type}
            local_path={data.local_path}
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
