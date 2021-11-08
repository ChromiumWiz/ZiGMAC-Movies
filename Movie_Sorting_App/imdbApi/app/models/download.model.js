const { resume } = require("./db.js");
const sql = require("./db.js");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const Download = (download) => {
  this.id = download.id;
  this.token = download.token;
  this.session = download.session;
  this.ttl = download.ttl;
};

Download.create = (user, token, path, ttl, result) => {
  var msg;
  sql.query(
    "INSERT INTO `downloads`(`token`, `user`, `path`, `ttl`) VALUES ('" +
      token +
      "','" +
      user +
      "', '" +
      path +
      "', '" +
      ttl +
      "')",
    (err, res) => {
      if (err) {
        console.log(err);
        msg = {
          status: 1,
          code: "SESSION_ERROR",
          data: {
            code: err.code,
          },
        };
      } else {
        // console.log(res);
        msg = {
          status: 0,
          code: "SESSION_ADDED",
          data: { insert_id: res.insertId },
        };
        result(null, msg);
      }
    }
  );
};

Download.tokenCount = (user, path, result) => {
  var msg;
  sql.query(
    "SELECT COUNT(*) AS userCount FROM downloads WHERE user = '" +
      user +
      "' AND path ='" +
      path +
      "'",
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        result(null, data[0].userCount);
      }
    }
  );
};

Download.getToken = (user, path, result) => {
  sql.query(
    "SELECT * FROM downloads WHERE user = '" +
      user +
      "' AND path = '" +
      path +
      "'",
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, err.code);
      } else {
        if (res) {
          result(null, res[0]);
        }
      }
    }
  );
};

Download.deleteToken = (id, result) => {
  sql.query("DELETE FROM `downloads` WHERE id = '" + id + "'", (err, res) => {
    if (err) {
      console.log(err);
      result(err, err.code);
    } else {
      var msg = {
        status: 0,
        code: "RECORD_DELETED",
        data: "",
      };
      result(null, msg);
    }
  });
};

module.exports = Download;
