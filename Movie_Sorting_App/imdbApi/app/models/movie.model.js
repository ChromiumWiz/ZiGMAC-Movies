const { resume } = require("./db.js");
const sql = require("./db.js");

// constructor
const Movie = function (movie) {
  this.id = movie.id;
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
};

Movie.findById = (id, result) => {
  sql.query(`SELECT * FROM movie_data WHERE imdb_id = '${id}'`, (err, res) => {
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

    result({ kind: "not_found" }, null);
  });
};

Movie.getAll = (req, result) => {
  // console.log(req.query.sort);
  // console.log(req.query.limit);

  var q = "SELECT * FROM movie_data ";
  var sq = "";
  var lq = "";
  var oq = "";
  // var tq = " WHERE type = 'movie'";
  var tq = "";

  var sort = "";
  var limit = "";
  var offset = "";

  if (req.query.type) {
    tq = " WHERE type = '" + req.query.type + "' ";
  }
  console.log(q);

  q = q + tq;

  if (req.query.genre) {
    var gq = "";
    var genre = req.query.genre;
    if (genre !== "All") {
      var g = req.query.genre.split(",");
      // console.log(g);
      g.forEach((ge, i) => {
        if (i < 1) {
          gq = "AND ( genre LIKE '%" + ge + "%' ";
        } else {
          gq = gq + " OR genre LIKE '%" + ge + "%' ";
        }
        if (i == g.length - 1) {
          gq = gq + ") ";
        }
      });
    } else {
      gq = " AND genre LIKE '%%' ";
    }

    q = q + gq;
  }

  if (req.query.sort) {
    sort = req.query.sort;
    if (sort == "recent") {
      sq = "ORDER BY id DESC ";
    } else if (sort == "id") {
      sq = "ORDER BY id ";
    }
    else if (sort == 'title') 
    {
      sq = "ORDER BY title ";
    }

    q = q + sq;

    // console.log(sort);
  }

  if (req.query.limit) {
    limit = req.query.limit;
    lq = "LIMIT " + limit + " ";

    q = q + lq;
  }

  if (req.query.offset) {
    offset = req.query.offset;
    lq = "OFFSET " + offset + " ";
    q = q + lq;
  }

  sql.query(q, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    // else
    // {
    //   console.log("aaaaaa");
    // }

    result(null, res);
  });
};

Movie.findImage1 = (id, result) => {
  sql.query(`SELECT * FROM movie_data WHERE imdb_id = '${id}'`, (err, res) => {
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
        console.log("found image: ", JSON.parse(JSON.stringify(res[0])));
        result(null, res[0]);
        //result()
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Movie.recCount = (type, genre, result) => {
  // var type = req.query.type;
  if(genre !== 'All')
  {
    console.log('genre', genre);
    sql.query(
      `SELECT COUNT(*) AS mcount FROM movie_data WHERE type = '${type}' AND genre LIKE '%${genre}%'`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log(type + "count : ", res[0].mcount);
          result(null, res[0]);
          return;
        }
      }
    );
  }
  else{
    sql.query(
      `SELECT COUNT(*) AS mcount FROM movie_data WHERE type = '${type}'`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log(type + "count : ", res[0].mcount);
          result(null, res[0]);
          return;
        }
      }
    );
  }
  
};

Movie.serach = (sp, ofs, result) => {
  var searchParam = sp.replace(" ", "|");
  console.log("ofs: " + ofs);
  // var serach;
  // console.log(searchParam);
  // result(null, searchParam);
  var q =
    "SELECT * FROM movie_data WHERE title REGEXP '" +
    searchParam +
    "' LIMIT 10 ";
  var sq = " OFFSET " + ofs;
  q = q + sq;
  sql.query(q, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }
  });
};

Movie.searchCount = (sp, result) => {
  var searchParam = sp.replace(" ", "|");
  sql.query(
    `SELECT COUNT(*) AS searchCount FROM movie_data WHERE title REGEXP '${searchParam}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        console.log(res[0]);
        return;
      }
    }
  );
};

// Customer.updateById = (id, customer, result) => {
//   sql.query(
//     "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
//     [customer.email, customer.name, customer.active, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Customer with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated customer: ", { id: id, ...customer });
//       result(null, { id: id, ...customer });
//     }
//   );
// };

// Customer.remove = (id, result) => {
//   sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Customer with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted customer with id: ", id);
//     result(null, res);
//   });
// };

// Customer.removeAll = result => {
//   sql.query("DELETE FROM customers", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} customers`);
//     result(null, res);
//   });
// };

module.exports = Movie;
