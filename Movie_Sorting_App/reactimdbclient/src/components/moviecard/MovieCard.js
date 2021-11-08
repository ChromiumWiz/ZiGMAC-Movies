import React from "react";
import { Image } from "react-bootstrap";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./moviecard.css";
import { Link } from "react-router-dom";
import  {API_HOST} from "../../constants/HOSTS_CONSTANT";

function MovieCard({ title, imdb_id, id, type, img_path }) {
  const url = API_HOST+"/image/" + imdb_id;
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
