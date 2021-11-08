const Card = require("../models/card.model.js");
const scraper = require("./scraper");
const fetch = require("node-fetch");
var axios = require("axios").default;
const { json } = require("express");

exports.createCard = (req, res) => {
  Card.create(req.body, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data = { numbers: data };
      console.log(data);
      res.send(data);
    }
  });
};
