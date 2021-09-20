const sql = require("./db.js");
const jetpack = require("fs-jetpack");
// constructor
const Movie = function (movie) {
  this.imdb_id = movie.imdb_id;
  this.title = movie.title;
  this.runtime = movie.runtime;
  this.date_published = movie.date_published;
  this.genre = movie.genre;
  this.img_url = movie.img_url;
  this.img_path = movie.img_path;
  this.summary = movie.summary;
  this.actors = movie.actors;
  this.rating = movie.rating;
  this.local_path = movie.local_path;
  this.type = movie.type;
};

Movie.create = (newMovie, result) => {
  //   console.log(movie);
  //  var newMovie = movie;
  console.log(newMovie);
  sql.query("INSERT INTO movie_data SET ?", newMovie, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newMovie });
    result(null, { id: res.insertId, ...newMovie });
  });
};

Movie.addLocal = (entry, basePath, rootPath) => {
  var query =
    "INSERT INTO movie_data (local_title, local_path) VALUES ('" +
    entry[0].name +
    "', '" +
    rootPath +
    "')";
  var filename = entry[0].name;
  var pref = filename.split("]");

  var name2 = "";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
    } else {
      console.log("insert id: " + res.insertId);
      var file_path = pref[0] + "-" + res.insertId + "]" + pref[1];
      jetpack.rename(basePath, file_path);

      var query2 =
        "UPDATE `movie_data` SET `local_title`='" +
        file_path +
        "' WHERE id = '" +
        res.insertId +
        "'";
      sql.query(query2, (err, res) => {
        if (err) {
          console.log("error: ", err);
        } else {
          console.log("Record added");
        }
      });
    }
  });

  // console.log("database entry: " + file_path);
};

Movie.update = (newMovie, localId, result) => {
  console.log("update: " + newMovie);
  console.log("local_id: " + localId);
  sql.query(
    "UPDATE `movie_data` SET `imdb_id`='" +
      newMovie.imdb_id +
      "',`title`='" +
      newMovie.title +
      "',`runtime`='" +
      newMovie.runtime +
      "',`date_published`='" +
      newMovie.date_published +
      "',`genre`='" +
      newMovie.genre +
      "',`img_url`='" +
      newMovie.img_url +
      "',`img_path`='" +
      newMovie.img_path +
      "',`summary`='" +
      newMovie.summary +
      "',`actors`='" +
      newMovie.actors +
      "',`rating`='" +
      newMovie.rating +
      "',`type`='" +
      newMovie.type +
      "',`imdb_fetch`='1' WHERE id = " +
      localId,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("data fetched: ", res);
        result(null, res);
        return;
      }

      // result({ kind: "not_found" }, null);
    }
  );
};

Movie.findById = (id, result) => {
  sql.query(`SELECT * FROM movie_data WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found movie data: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Movie.getAll = (result) => {
  sql.query("SELECT * FROM movie_data", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("movies: ", res);
    result(null, res);
  });
};

Movie.findImage = (id, result) => {
  sql.query(
    `SELECT img_path FROM movie_data WHERE imdb_id = '${id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found image: ", res[0]);
        result(null, res[0]);
        //result()
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Movie.imdbFetch = (result) => {
  sql.query(
    `SELECT id, local_title FROM movie_data WHERE imdb_fetch = 0 LIMIT 10`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
      }
    }
  );
};

module.exports = Movie;
