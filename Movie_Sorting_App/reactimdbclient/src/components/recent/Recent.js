import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MovieCard from "./../moviecard/MovieCard";
import { Film, Tv } from "react-bootstrap-icons";
import "./recent.css";
import  {API_HOST, CLIENT_HOST} from "../../constants/HOSTS_CONSTANT";

function Recent() {
  useEffect(() => {
    fetchItemsMovies();
    fetchItemsTv();
  }, []);

  const [movieItems, setMovieItems] = useState([]);

  const [tvItems, settvItems] = useState([]);

  const fetchItemsMovies = async () => {
    const data = await fetch(
      API_HOST+"/movies?sort=recent&limit=18&offset=0&type=movie"
    );
    const items = await data.json();
    // console.log(items);
    setMovieItems(items);
  };

  const fetchItemsTv = async () => {
    const data = await fetch(
      API_HOST+"/movies?sort=recent&limit=18&offset=0&type=series"
    );
    const items = await data.json();
    // console.log(items);
    settvItems(items);
  };

  // console.log(items);

  return (
    <Container fluid className="bodyCont">
      <Row>
        <h2 className="materialHeading">
          <Film size="26" /> Movies
        </h2>
      </Row>

      <Row className="cardRow">
        {movieItems.map((item, index) => (
          <MovieCard key={index} {...item} />
        ))}
      </Row>

      <Row>
        <h2 className="materialHeading">
          <Tv size="26" /> TV
        </h2>
      </Row>

      <Row className="cardRow">
        {tvItems.map((item, index) => (
          <MovieCard key={index} {...item} />
        ))}
      </Row>
    </Container>
  );
}

export default Recent;
