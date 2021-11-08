import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Search.css";
import { Search, X, ArrowRightCircleFill } from "react-bootstrap-icons";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useHistory, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function SearchF() {
  const history = useHistory();
  const [searchParam, setSearchParam] = useState(null);
  const classes = useStyles();
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  function handleSearch(e) {
    var searchP = e.target.value;
    setSearchParam(searchP);
  }

  function sendSearch() {
    console.log(searchParam);
    var url = "/search/" + searchParam;
    history.push(url);
    setShow(false);
    setSearchParam(null);
    document.getElementById("standard-basic").value = "";
    // <Redirect to={url} />;
  }

  return (
    <>
      <span onClick={(e) => handleShow(true)} className="serach-btn">
        <Search size="26" />
      </span>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Body>
          <TextField
            id="standard-basic"
            label="Search"
            type="text"
            className="searchText"
            name="searchTerm"
            onChange={(e) => handleSearch(e)}
            autoComplete="off"
          />
          <div className="serach-btn-2">
            <ArrowRightCircleFill
              size="20"
              onClick={(e) => sendSearch()}
              className="send-btn"
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SearchF;
