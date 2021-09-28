const { resume } = require("./db.js");
const sql = require("./db.js");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const AuthUser = function (user) {
  this.id = user.id;
  this.email = user.email;
  this.password = user.password;
  this.balance = user.balance;
  this.session = user.session;
};

AuthUser.create = (user, result) => {
  const userEmail = user.user;
  const pass = user.pass;

  const saltRounds = 10;

  const storeHash = (hash) => {
    // console.log(hash);
    insertUser(userEmail, hash);
  };

  bcrypt.hash(pass, saltRounds).then(function (hash) {
    storeHash(hash);
  });
  //   console.log("hash pass:" + hashPass);

  const insertUser = (userEmail, pass) => {
    sql.query(
      "INSERT INTO `user`(`email`, `password`) VALUES ('" +
        userEmail +
        "','" +
        pass +
        "')",
      (err, res) => {
        if (err) {
          // console.log("error: ", err);
          result(err, null);
          return;
        } else {
          // console.log(res.insertId);
          result(null, res.insertId);
          return;
        }

        //   result({ kind: "not_found" }, null);
      }
    );
  };
};

AuthUser.duplicateUser = (user, result) => {
  const userEmail = user.user;

  sql.query(
    "SELECT COUNT(*) AS userCount FROM user WHERE email='" + userEmail + "'",
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, res[0].userCount);
      }
    }
  );
};

AuthUser.userCheck = (req, session, result) => {
  const useremail = req.user;
  const user = useremail;
  const pass = req.pass;
  var msg;

  AuthUser.userCount(user, (err, data) => {
    if (data) {
      //   console.log("user exist");
      sql.query(
        "SELECT password FROM user WHERE email='" + useremail + "'",
        (err, res) => {
          if (err) {
            result(err, null);
            return;
          } else {
            // result(null, res[0].password);
            var hash = res[0].password;
            bcrypt.compare(pass, hash).then(function (res) {
              // result == true
              if (!res) {
                // console.log("wrong password");
                msg = 1;
                result(null, msg);
              } else {
                // console.log("login success");
                createSession(useremail, session, (err, data) => {
                  if (data) {
                    msg = 0;
                    result(null, msg);
                  }
                });
              }
            });
          }
        }
      );
    } else {
      msg = 0;
      result(null, msg);
      //   console.log(data); //   result(null, msg);
    }

    const createSession = (user, session, result) => {
      var ttl = Date.now();
      sql.query(
        "UPDATE `user` SET `session`='" +
          session +
          "',`ttl`='" +
          ttl +
          "' WHERE `email`='" +
          user +
          "'",
        (err, res) => {
          if (err) {
            console.log(err);
            result(null, 0);
          } else {
            console.log("Session updated");
            result(null, session);
          }
        }
      );
    };
  });
};

AuthUser.userCount = (user, result) => {
  sql.query(
    "SELECT COUNT(*) AS userCount from user WHERE email='" + user + "'",
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res[0].userCount);
        result(null, res[0].userCount);
      }
    }
  );
};

AuthUser.sessionCount = (session, result) => {
  sql.query(
    "SELECT COUNT(*) AS sessionCount FROM user WHERE session='" + session + "'",
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        result(null, res[0].sessionCount);
      }
    }
  );
};

AuthUser.getProfile = (session, result) => {
  sql.query(
    "SELECT id, email, balance FROM user WHERE session='" + session + "'",
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

AuthUser.logout = (session, result) => {
  sql.query(
    "UPDATE `user` SET `session`='' WHERE session='" + session + "'",
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        result(null, 1);
      }
    }
  );
};

AuthUser.getBalance = (session, result) => {
  sql.query(
    "SELECT balance FROM user WHERE session = '" + session + "'",
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        result(null, res[0].balance);
      }
    }
  );
};

AuthUser.updateBalance = async (session, movieVal, result) => {
  await sql.query(
    "UPDATE `user` SET `balance`= balance - " +
      movieVal +
      " WHERE session = '" +
      session +
      "'",
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        var msg = { status: 0, code: "BALANCE_UPDATED", data: "" };
        // result(null, msg);
      }
    }
  );
};

module.exports = AuthUser;
