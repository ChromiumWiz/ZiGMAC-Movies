const { v4: uuidv4 } = require("uuid");
// const fetch = require("node-fetch");
const http = require("http");

require("es6-promise").polyfill();
require("isomorphic-fetch");

const Movie = require("../models/movie.model.js");

// Create and Save a new movie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Movie
  const movie = new Movie({
    imdb_id: req.body.imdb_id,
    title: req.body.title,
    runtime: req.body.runtime,
    date_published: req.body.date_published,
    genre: req.body.genre,
    img_url: req.body.img_url,
    img_path: req.body.img_path,
    summary: req.body.summary,
    actors: req.body.actors,
    rating: req.body.rating,
    localpath: req.body.localpath,
    l,
  });

  // Save Movie in the database
  Movie.create(movie, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Movie.",
      });
    else res.send(data);
  });
};

// Retrieve all movies from the database.
exports.findAll = (req, res) => {
  Movie.getAll(req, (err, data) => {
    // var re = res.json(data);
    // console.log(re);
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving movies.",
      });
    else res.json(data);
  });
};

// Find a single movie with a movieId
exports.findOne = (req, res) => {
  Movie.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found movie with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving movie with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.image = (req, res) => {
  console.log(req.params.id);
  Movie.findImage(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found movie with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving image with id " + req.params.id,
        });
      }
    } else {
      // res.sendFile(req.get('host')+'/'+data.img_path);
      res.sendFile(
        "F:\\Zigmac\\Web\\MovieDB\\App\\GITHUB\\ZiGMAC-Movies\\Movie_Sorting_App\\MovieScrapper\\images\\posters\\" +
          data.img_path
      );
    }
  });
  // console.log(imagePath);
  //res.sendFile(imagePath);
};

exports.countMovie = (req, res) => {
  // console.log(req.query.type);
  Movie.recCount(req.query.type, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Couldnt Count`,
        });
      } else {
        res.status(500).send({
          message: "Error counting ",
        });
      }
    } else {
      res.send(data);
    }
  });
  // res.json("type : " + req.query.type);
};

exports.searchMovie = (req, res) => {
  // console.log(req.params.sp);
  Movie.serach(req.params.sp, req.params.ofs, (err, data) => {
    if (err) {
      if (err.kind === "not found") {
        res.status(404).send({
          message: `Couldnt find anything`,
        });
      } else {
        res.status(500).send({
          message: "Error searching",
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.searchCount = (req, res) => {
  Movie.searchCount(req.params.sp, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Couldnt Count`,
        });
      } else {
        res.status(500).send({
          message: "Error counting ",
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.createToken = (reqest, res) => {
  console.log(reqest.body);

  var filePath = reqest.body.path;
  console.log(filePath);
  var uuid = uuidv4();
  console.log(uuid);

  var post_data = JSON.stringify({ token: uuid, path: filePath, ttl: "30" });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(post_data),
      // Host: "http://169.254.212.69:3001/",
      secret: "abcdefgh",
    },
    body: post_data,
  };
  fetch(
    "http://169.254.212.69:8888/services/files/createsession/",
    requestOptions
  ).then((response) => {
    if (response.ok) {
      var resData = JSON.stringify({
        status: response.ok,
        token: uuid,
        path: filePath,
      });
      // console.log("Token accepted");
      res.json(resData);
    } else {
      var resData = JSON.stringify({
        status: false,
        token: uuid,
        path: filePath,
      });
      res.send(resData);
    }
  });
};

// Update a movie identified by the movieId in the request
exports.update = (req, res) => {};

// Delete a movie with the specified movieId in the request
exports.delete = (req, res) => {};

// Delete all movies from the database.
exports.deleteAll = (req, res) => {};
