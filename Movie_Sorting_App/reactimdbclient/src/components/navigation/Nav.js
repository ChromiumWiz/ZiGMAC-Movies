import React from "react";
import { Button } from "react-bootstrap";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../../App.css";
import "./../search/SearchF";
import { Lightning, Film, Tv, Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import SearchF from "./../search/SearchF";
function Nav() {
  return (
    <nav className="mainNav">
      <ul>
        <Link to="/">
          <li className="active">
            <Lightning size="20" />
            <span className="navText">Featured</span>
          </li>
        </Link>

        <Link to="/movies/0">
          <li>
            <Film size="20" />
            <span className="navText">Movies</span>
          </li>
        </Link>

        <Link to="/tv">
          <li>
            <Tv size="20" />
            <span className="navText">TV</span>
          </li>
        </Link>

        <li>
          <SearchF />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
