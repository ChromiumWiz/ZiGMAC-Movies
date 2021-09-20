import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../moviecard/moviecard.css";
import { Film, Tv } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function dMovCard({
  imgurl,
  title,
  rating,
  published,
  genres,
  summary,
  stars,
  type,
}) {
  const Genres = ({ gens }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    gens = gens.split(",");
    return (
      <>
        {gens.map((genre, idx) => {
          return (
            <p key={idx} className="smovWrapper">
              {genre}
            </p>
          );
        })}
      </>
    );
  };

  const Cast = ({ actors }) => {
    actors = actors.split(",");
    return (
      <>
        {actors.map((actor, idx) => {
          return (
            <p key={idx} className="smovWrapper">
              {actor}
            </p>
          );
        })}
      </>
    );
  };

  const Type = ({ rType }) => {
    var typeIco = "";
    if (rType == "movie") {
      typeIco = (
        <Link to="/movies">
          <Film size="20" />
          <span className="navText">Movies</span>
        </Link>
      );
    } else if (rType == "series") {
      typeIco = (
        <Link to="/tv">
          <Tv size="20" />
          <span className="navText">TV Series</span>
        </Link>
      );
    }

    return typeIco;
  };

  return (
    <Row>
      <Col sm="4">
        <Image className="posterImg" src={imgurl} />
      </Col>
      <Col className="smovCard">
        <div className=""></div>
        <h2 className="movie-title">
          <span>{title}</span>
          <Type rType={type} />
        </h2>
        <p className="floatLeft">
          <span className="movLbl">Rating : </span>
          <span className="movDtl yellow">
            {rating}
            <small>/10</small>
          </span>
        </p>
        <p className="floatRight">
          <span className="movLbl">Released : </span>
          <span className="movDtl yellow">{published}</span>
        </p>
        <div className="clearfix"></div>
        <p>
          <span className="movLbl">Genre(s) : </span>
        </p>
        <p>{genres ? <Genres gens={genres} /> : ""}</p>

        <div className="movSpace"></div>
        <div className="hrLine"></div>
        {/* <Genres gens={genres} /> */}
        <p>{summary}</p>
        <div className="movSpace"></div>
        <div className="hrLine"></div>
        <p>
          <span className="movLbl">Cast : </span>
        </p>
        <div className="movSpace"></div>
        {stars ? <Cast actors={stars} /> : ""}
      </Col>
    </Row>
  );
}

export default dMovCard;
