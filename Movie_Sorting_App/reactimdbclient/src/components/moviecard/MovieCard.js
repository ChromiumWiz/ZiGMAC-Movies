import React from "react";
import { Image } from "react-bootstrap";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./moviecard.css";
import { Link } from "react-router-dom";

function MovieCard({ title, imdb_id, id, type }) {
  const url = "http://169.254.212.69:3001/image/" + imdb_id;
  var smov = "/movies/" + imdb_id;
  return (
    <div md={4} sm={6} lg={2} className="cardCont">
      <Link to={smov}>
        <div className="card_wrapper">
          <div className="card">
            <Image src={url} />
          </div>
          <div className="cardOverlay">
            <div className="nameTag">
              <div className="tag">{title}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
