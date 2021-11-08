import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MovieTable from "./../movietable/MovieTable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Icon from "@material-ui/core/Icon";
import FilterListIcon from "@material-ui/icons/FilterList";
import Recent from "./../recent/Recent";
import { Link } from "react-router-dom";
require("es6-promise").polyfill();
require("isomorphic-fetch");

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function Fetchlist(type) {
  // console.log("aaa");

  // console.log(type.type);

  const type2 = type.type;

  const [data, setData] = useState([]);

  const [q, setQ] = useState("");

  const [checked, setChecked] = React.useState(true);

  const [g, setG] = useState([]);

  const classes = useStyles();

  function handleG(event) {
    const target = event.target;
    var val = target.value;

    // var ge = g;

    setChecked(event.target.checked);

    if (target.checked) {
      setG((g) => [...g, val]);
      // console.log(g);
    } else {
      setG(g.filter((i) => i !== val));
    }

    // alert(g);
    // console.log(g);
  }

  useEffect(() => {
    fetch("http://127.0.0.1:3001/movies?sort=id&type=" + type2)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  async function fltrData2() {
    // console.log("aaaaaaaaaa");
    // console.log(g);
    var gens = "";
    if (!g.length) {
      gens = "All";
    } else {
      gens = g.toString();
    }
    var url =
      "http://127.0.0.1:3001/movies?sort=id&type=" +
      type2 +
      "&genre=" +
      gens +
      "";
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json));
  }

  function search(rows) {
    var filterRows = rows.filter(
      (row) => row.title.toLowerCase().indexOf(q.toLowerCase()) > -1
    );

    // console.log(filterRows);
    return filterRows;
  }

  const Title = ({ title, imdb_id }) => {
    var smov = "/movies/" + imdb_id;
    return <Link to={smov}>{title}</Link>;
  };

  const Genres = ({ gens }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    gens = gens.split(",");
    return (
      <>
        {gens.map((genre, idx) => {
          return (
            <p key={idx} className="pWrapper">
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
            <p key={idx} className="pWrapper2">
              {actor}
            </p>
          );
        })}
      </>
    );
  };

  // console.log(data);

  return (
    <Container fluid className="bodyCont">
      <Row className="bg-White row-sp-1">
        <Col sm="4">
          <TextField
            id="outlined-basic"
            fullWidth
            value={q}
            onChange={(e) => setQ(e.target.value)}
            label="Search movie name"
            variant="outlined"
          />
          <br />
        </Col>

        <Col sm="8">
          <FormControl component="fieldset">
            <FormLabel component="legend">Genre(s)</FormLabel>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value=""
                label="All"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              |
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value="Action"
                label="Action"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value="Comedy"
                label="Comedy"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value="Sci-Fi"
                label="Sci-Fi"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value="Horror"
                label="Horror"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value="Romance"
                label="Romance"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value="Thriller"
                label="Thriller"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value="Drama"
                label="Drama"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value="Mystery"
                label="Mystery"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value="Crime"
                label="Crime"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value="Animation"
                label="Animation"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value="Adventure"
                label="Adventure"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value="Fantasy"
                label="Fantasy"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              <FormControlLabel
                color="primary"
                control={<Checkbox color="primary" />}
                value="Superhero"
                label="Superhero"
                labelPlacement="top"
                onChange={(e) => handleG(e)}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<FilterListIcon />}
                onClick={(e) => fltrData2()}
              >
                Filter
              </Button>
            </FormGroup>
          </FormControl>
        </Col>
      </Row>

      <Row>
        <Col sm="12">
          <div>
            <br />
          </div>
          <MovieTable
            columns={[
              {
                Header: "#",
                accessor: "id",
                width: 50,
              },
              {
                Header: "Title",
                accessor: "title",
                Cell: (e) => (
                  <Title
                    title={e.row.original.title}
                    imdb_id={e.row.original.imdb_id}
                  />
                ),
              },
              {
                Header: "Rating",
                accessor: "rating",
                width: 50,
              },
              {
                Header: "Genre(s)",
                accessor: "genre",
                Cell: ({ cell: { value } }) => <Genres gens={value} />,
              },
              {
                Header: "Released",
                accessor: "date_published",
              },
              {
                Header: "Cast",
                accessor: "actors",
                Cell: ({ cell: { value } }) => <Cast actors={value} />,
              },
              {
                Header: "Runtime",
                accessor: "runtime",
                Cell: ({ cell: { value } }) => {
                  var rt = value.split(" ");
                  rt = rt[0];
                  const m = Math.floor(rt % 60);
                  const h = Math.floor(rt / 60);
                  return <>{h + "." + m}</>;
                },
              },
            ]}
            data={search(data)}
          />
        </Col>
      </Row>

      <div className="movSpace"></div>

      {/* <Row>
    <Recent/>
</Row> */}
    </Container>
  );
}

export default Fetchlist;
