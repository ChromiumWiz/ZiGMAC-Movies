import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from "@material-ui/core/styles";
import "./searchpage.css";
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

function SearchPage() {
  const [searchParam, setSearchParam] = useState("");

  // const type2 = type.type;

  const type2 = "movie";

  const [data, setData] = useState([]);

  const [offset, setOff] = useState(0);

  const [mCount, setCount] = useState([]);

  const classes = useStyles();

  let { sp } = useParams();

  // useEffect(() => {
  //   setSearchParam(sp);
  //   console.log("search page : " + searchParam);
  // });

  console.log(sp);
  function spFetch() {
    fetch("http://169.254.212.69:3001/search/" + sp + "/offset/0")
      .then((response) => response.json())
      .then((json) => setData(json))
      .then(setOff(10))
      .then(setSearchParam(sp));
  }
  useEffect(() => {
    spFetch();
  }, []);

  function spChage() {
    if (sp != searchParam) {
      spFetch();
    }
  }

  spChage();

  useEffect(() => {
    fetch("http://169.254.212.69:3001/searchCount/" + sp)
      .then((response) => response.json())
      .then((json) => setCount(json));
  }, []);

  function nextPage(offS) {
    var url =
      "http://169.254.212.69:3001/search/" + sp + "/offset/" + offS + "";
    // console.log(offS);
    var ofs = offS + 10;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .then(setOff(ofs));
  }

  function prevPage(offS) {
    var ofp = offset - 20;
    var ofn = offset - 10;
    var url = "http://169.254.212.69:3001/search/" + sp + "/offset/" + ofp + "";
    // console.log(offS);
    // console.log(offset);
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .then(setOff(ofn));
  }

  return (
    <Container fluid className="bodyCont">
      <Row className="cardRow">
        {data.map((item, index) => (
          <MovieCard key={index} {...item} />
        ))}
      </Row>

      <div className="movSpace"></div>

      <Row>
        <Col>
          {offset > 10 && (
            <ArrowLeftCircleFill
              size="36"
              onClick={(e) => prevPage(offset)}
              className="pageArrows"
            />
          )}
          {/* {console.log(mCount.searchCount)} */}
          {/* {console.log(offset)} */}
          {mCount.searchCount > offset && (
            <ArrowRightCircleFill
              size="36"
              onClick={(e) => nextPage(offset)}
              className="pageArrows"
            />
          )}
        </Col>
      </Row>
      <div className="movSpace"></div>
    </Container>
  );
}

export default SearchPage;
