const http = require("http");

const bcrypt = require("bcrypt");

require("es6-promise").polyfill();
require("isomorphic-fetch");

const AuthUser = require("../models/authuser.model.js");

const CardM = require("../models/card.model.js");

exports.topup = (req, res) => {
  //   console.log(req.body);
  var card = req.body.scratchCard;
  var session = req.body.session;
  AuthUser.sessionCount(session, (err, data) => {
    if (err) {
      console.log(err);
      msg = JSON.stringify({ status: 1, code: "NO_USER", data: "" });
      res.send(msg);
    } else {
      if (!data) {
        msg = JSON.stringify({ status: 1, code: "NO_USER", data: "" });
        res.send(msg);
      } else {
        AuthUser.getProfile(session, (err, profile) => {
          if (err) {
            console.log(err);
            msg = JSON.stringify({
              status: 1,
              code: "TOPUP_ERR",
              data: { err: err.code },
            });
            res.send(msg);
          } else {
            // console.log("email");
            // console.log(profile.email);
            CardM.topupUser(card, profile.id, (err, res1) => {
              if (err) {
                msg = JSON.stringify({
                  status: 1,
                  code: "TOPUP_ERR",
                  data: { err: err.code },
                });
                res.send(msg);
              } else {
                // console.log(res);
                if (!res1.status) {
                  msg = JSON.stringify({
                    status: 0,
                    code: "TOPUP_SUCCESS",
                    data: "",
                  });
                  res.send(msg);
                } else {
                  msg = JSON.stringify({
                    status: 1,
                    code: "TOPUP_ERROR",
                    data: { error: res1.code },
                  });
                  res.send(msg);
                }
              }
            });
          }
        });
      }
    }
  });
};
