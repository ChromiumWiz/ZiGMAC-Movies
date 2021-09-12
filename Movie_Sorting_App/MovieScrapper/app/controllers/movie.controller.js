const Movie = require("../models/movie.model.js");
const scraper = require("./scraper");
const fetch = require("node-fetch");
var axios = require("axios").default;
var fs = require("fs"),
  request = require("request");
const { json } = require("express");

const fa = require("fs");
const path = require("path");

const jetpack = require("fs-jetpack");
// const requestPromise = require('request-promise-native');

// Create and Save a new movie
exports.create = (req, res) => {};

// Retrieve all movies from the database.
exports.findAll = (req, res) => {
  scraper.searchMovies(req.params.title).then((movies) => {
    res.json(movies);
  });
};

// Find a single movie with a movieId
exports.findOne = (req, res) => {
  var options = {
    method: "GET",
    url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
    params: { i: req.params.imdbId, type: "movie", r: "json", plot: "full" },
    headers: {
      "x-rapidapi-key": "8c87de996dmsh4992e22e75bc613p17709ajsn731dd34b2932",
      "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      var m = response.data;
      var r = m.Released;

      var released = r.split(" ")[1];
      released = month(released);

      released = r.split(" ")[2] + "-" + released + "-" + r.split(" ")[0];

      var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
          console.log("content-type:", res.headers["content-type"]);
          console.log("content-length:", res.headers["content-length"]);

          request(uri)
            .pipe(fs.createWriteStream(filename))
            .on("close", callback);
        });
      };

      download(m.Poster, "images/posters/" + m.imdbID + ".jpg", function () {
        console.log("done");
      });

      const movie = new Movie({
        imdb_id: m.imdbID,
        title: m.Title,
        runtime: m.Runtime,
        date_published: released,
        genre: m.Genre,
        img_url: m.Poster,
        img_path: m.imdbID + ".jpg",
        summary: m.Plot,
        actors: m.Actors,
        rating: m.imdbRating,
        type: m.Type,
      });

      // Save Movie in the database
      Movie.create(movie, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Movie.",
          });
        } else {
          res.send(data);
        }
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};

exports.searchTitle = (req, res) => {
  var imdbTitle = req.params.title;
  var search = encodeURI(imdbTitle);
  var options = {
    method: "GET",
    url:
      "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" +
      imdbTitle,
    headers: {
      "x-rapidapi-key": "8c87de996dmsh4992e22e75bc613p17709ajsn731dd34b2932",
      "x-rapidapi-host":
        "imdb-internet-movie-database-unofficial.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

function month(month) {
  var m = "";
  if (month == "Jan") {
    m = "01";
  } else if (month == "Feb") {
    m = "02";
  } else if (month == "Mar") {
    m = "03";
  } else if (month == "Apr") {
    m = "04";
  } else if (month == "May") {
    m = "05";
  } else if (month == "Jun") {
    m = "06";
  } else if (month == "Jul") {
    m = "07";
  } else if (month == "Aug") {
    m = "08";
  } else if (month == "Sep") {
    m = "09";
  } else if (month == "Oct") {
    m = "10";
  } else if (month == "Nov") {
    m = "11";
  } else if (month == "Dec") {
    m = "12";
  }

  return m;
}

// exports.image = (req, res) => {
//   console.log(req.params.id);
//   Movie.findImage(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found movie with id ${req.params.id}.`,
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving image with id " + req.params.id,
//         });
//       }
//     } else {
//       // res.sendFile(req.get('host')+'/'+data.img_path);
//       res.sendFile(
//         "D:\\zigmac\\imdbScrapper.lahiru.senavirathne\\" + data.img_path
//       );
//     }
//   });
// };

exports.imdbIds = async (req, res) => {
  // var titles = req.body.title;
  var titles = req;
  var imdbIds = [];
  var movies = [];
  // console.log(req.body.title);
  // console.log(req);

  if (titles.indexOf(",") > -1) {
    // titles = req.body.title;
    titles = titles.split(",");

    for (var title of titles) {
      var mraw = title.split("|");

      var mtitle = mraw[0];

      var mid = mraw[1];

      mov = await fetchData(mtitle);
      mov = mov + "|" + mid;
      imdbIds.push(mov);
      // console.log(imdbId);
    }
  } else {
    console.log(titles);
    var mraw = titles.split("|");

    var mtitle = mraw[0];

    var mid = mraw[1];

    mov = await fetchData(mtitle);
    mov = mov + "|" + mid;
    imdbIds.push(mov);
  }

  for (var rawd of imdbIds) {
    var idraw = rawd.split("|");
    var imdbId = idraw[0];
    var id = idraw[1];
    var mov = await scraper.getMovie(imdbId, id);
    console.log(mov);
    movies.push(mov);
  }
  // res.send(imdbIds);
  res.send(movies);
};

function fetchData(title) {
  return fetch("http://localhost:3002/title/" + title)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      return json.id;
    });
}

exports.checkFetch = (res) => {
  Movie.imdbFetch((err, titles) => {
    // console.log(data);

    var x = [];
    for (var title of titles) {
      // console.log(local_title.local_title);
      var mraw = title.local_title + "|" + title.id;
      x.push(mraw);
    }

    var y = x.toString();
    // console.log(y);
    this.imdbIds(y);
  });
};

exports.filefetch = (res) => {};

exports.getDirectoriesRecursive = (res) => {
  var options = { symlinks: "follow" };
  var results = [];
  var basePath = "F:/sym";
  var files = jetpack.inspectTree(basePath, options);
  var rg = "[zigmacmov]";
  var rg2 = "-[zigfetched]-";
  var children = files.children;
  console.log(children);

  // for (var child in children) {
  //   console.log(child);
  // }

  Object.entries(children).forEach((entry) => {
    const [key, value] = entry;
    entry.shift();
    var str = entry[0].name;
    if (str.includes(rg)) {
      // console.log(str);
      if (!str.includes(rg2)) {
        var file_name = str.split("-");
        file_name = file_name[0] + "-[zigfetched]-" + file_name[1];

        //
        entry[0].name = file_name;
        var file_path = basePath + "/" + str;

        Movie.addLocal(entry, file_path, basePath);

        // jetpack.rename(file_path, file_name);
        // console.log(file_name);
      }
    }
    results.push(entry);
  });

  return results;
};

// Update a movie identified by the movieId in the request
exports.update = (req, res) => {};

// Delete a movie with the specified movieId in the request
exports.delete = (req, res) => {};

// Delete all movies from the database.
exports.deleteAll = (req, res) => {};
