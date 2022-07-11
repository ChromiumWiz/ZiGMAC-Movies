import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, useParams, useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from "@material-ui/core/styles";
import "./../searchPage/searchpage.css";
import { API_HOST } from "../../constants/HOSTS_CONSTANT";
import {
  ArrowLeftCircleFill,
  ArrowRightCircleFill,
} from "react-bootstrap-icons";
import MovieCard from "./../moviecard/MovieCard";
require("es6-promise").polyfill();
require("isomorphic-fetch");

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function FetchlistAlt(type) {
  const type2 = type.type;

  const [data, setData] = useState([]);

  const [offset, setOff] = useState(0);

  const [mCount, setCount] = useState([]);

  const [pageCount, setPageCount] = useState(0);

  const [uPage, setPage] = useState(0);

  const [genre, setGenre] = useState("All");

  const [sort, setSort] = useState("recent");
  // let {page} = useParams();
  const classes = useStyles();

  let history = useHistory();

  // var sort = "recent";
  var limit = 5;
  var stOff = 0;

  let { page } = useParams("page");

  useEffect(() => {
    fetch(API_HOST + "/countmovie?type=movie&genre=" + genre)
      .then((response) => response.json())
      .then((json) => {
        setCount(json);
      })
      .then(() => {});
  }, [genre]);

  useEffect(() => {
    console.log("mCount", mCount);
    var mc = mCount.mcount;
    var pCount = mc / limit;
    pCount = Math.floor(pCount);
    // console.log('page count', mc);
    setPageCount(pCount);
    setPage(page);
  }, [mCount]);

  // useEffect(() => {
  //   if(page)
  //   {
  //     const newOffset = (page * limit) % mCount.mcount;
  //     setPage(page);
  //   setOff(newOffset);
  //   }
  // },[]);

  useEffect(() => {
    var url =
      API_HOST +
      "/movies?sort=" +
      sort +
      "&type=" +
      type2 +
      "&limit=" +
      limit +
      "&offset=" +
      offset +
      "&genre=" +
      genre;
    console.log("********", url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .then(() => {
        history.push("/movies/" + page);
      });
  }, [offset, genre, sort]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * limit) % mCount.mcount;
    setPage(event.selected);
    setOff(newOffset);
  };

  const genreHandle = (e) => {
    const genreSelected = e.target.value;
    // console.log("genre-",genreSelected);
    setGenre(genreSelected);
  };

  const sortHandle = (e) => {
    const sortH = e.target.value;

    setSort(sortH);
  };

  return (
    <Container fluid className="bodyCont">
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Genre</InputGroup.Text>
            <select
              aria-label="Default select example"
              onChange={(e) => {
                genreHandle(e);
              }}
              className="inputSelect"
            >
              <option value="All">All</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Animation">Animation</option>
              <option value="Biography">Biography</option>
              <option value="Comedy">Comedy</option>
              <option value="Crime">Crime</option>
              <option value="Documentary">Documentary</option>
              <option value="Drama">Drama</option>
              <option value="Family">Family</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Film-Noir">Film-Noir</option>
              <option value="Game-Show">Game-Show</option>
              <option value="History">History</option>
              <option value="Horror">Horror</option>
              <option value="Musical">Musical</option>
              <option value="Music">Music</option>
              <option value="Mystery">Mystery</option>
              <option value="News">News</option>
              <option value="Reality-TV">Reality-TV</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Short">Short</option>
              <option value="Sport">Sport</option>
              <option value="Talk-Show">Talk-Show</option>
              <option value="Thriller">Thriller</option>
              <option value="War">War</option>
              <option value="Western">Western</option>
            </select>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Sort</InputGroup.Text>
            <select
              onChange={(e) => {
                sortHandle(e);
              }}
              className="inputSelect"
            >
              <option value="recent">Recent</option>
              <option value="rating">Rating</option>
              <option value="title">A-Z</option>
            </select>
          </InputGroup>
        </Col>
      </Row>
      <Row className="cardRow">
        {data.map((item, index) => (
          <MovieCard key={index} {...item} />
        ))}
      </Row>

      <div className="movSpace"></div>

      <Row>
        <Col>
          {/* {uPage} */}
          {mCount ? (
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              // initialPage={1}
            />
          ) : (
            ""
          )}
        </Col>
        <div id="container"></div>
      </Row>
      <div className="movSpace"></div>
    </Container>
  );
}

export default FetchlistAlt;
