const { v4: uuidv4 } = require("uuid");
// const fetch = require("node-fetch");
const http = require("http");

const bcrypt = require("bcrypt");

require("es6-promise").polyfill();
require("isomorphic-fetch");

const AuthUser = require("../models/authuser.model.js");

exports.createUser = (req, res) => {
  AuthUser.duplicateUser(req.body, (err, data) => {
    var msg;
    if (err) {
      console.log("error: " + err.code);
      msg = JSON.stringify({ status: 1, code: err.code, data: "" });
      res.send(msg);
    } else {
      if (data) {
        msg = JSON.stringify({ status: 1, code: "USER_EXIST", data: "" });

        msg = JSON.parse(msg);
        console.log(msg);
        res.send(msg);
      } else {
        AuthUser.create(req.body, (err, data) => {
          if (err) {
            console.log("error: " + err.code);
            msg = JSON.stringify({ status: 1, code: err.code, data: "" });
            res.send(msg);
          } else {
            console.log("data: " + data);
            msg = JSON.stringify({ status: 0, code: "USER_CREATED", data: "" });
            res.send(msg);
          }
        });
      }
    }
  });
};

exports.loginCreate = (req, res) => {
  //   console.log(req.body);
  var msg;
  var session = uuidv4();
  AuthUser.userCheck(req.body, session, (err, data) => {
    if (err) {
      msg = JSON.stringify({ status: 1, code: err.code, data: "" });
      res.send(msg);
    } else {
      console.log("msg: " + data);
      if (data) {
        msg = JSON.stringify({ status: 1, code: "WRONG_USER", data: "" });
        res.send(msg);
      } else {
        msg = JSON.stringify({
          status: 0,
          code: "LOGIN_SUCCESS",
          data: { session: session },
        });
        res.send(msg);
      }
      //   res.send("" + data);
      //   bcrypt.compare(password, hash).then(function (result) {
      //     // result == true
      //   });
    }
  });
};

exports.loginSession = (req, res) => {
  console.log(req.body);
  var msg;
  AuthUser.sessionCount(req.body.session, (err, data) => {
    // console.log("Session count: " + data);
    if (data) {
      msg = JSON.stringify({ status: 0, code: "COOKIE_OK", data: "" });
      res.send(msg);
    } else {
      msg = JSON.stringify({ status: 1, code: "NO_COOKIE", data: "" });
      res.send(msg);
    }
  });
};

exports.profile = (req, res) => {
  var msg;
  AuthUser.getProfile(req.body.session, (err, data) => {
    console.log(data.email);
    msg = JSON.stringify({
      status: 0,
      code: "PROFILE_OK",
      data: {
        id: data.id,
        email: data.email,
        balance: data.balance,
      },
    });

    res.send(msg);
  });
};

exports.logout = (req, res) => {
  var msg;
  AuthUser.logout(req.body.session, (err, data) => {
    msg = JSON.stringify({
      status: 0,
      code: "COOKIE_DELETE",
      data: "",
    });
    res.send(msg);
  });
};
