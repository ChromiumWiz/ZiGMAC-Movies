const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/movie.routes.js")(app);

// app.use('/api/chirps', apiRouter);

// set port, listen for requests
app.listen(3001, "0.0.0.0", () => {
  console.log("Server is running on port 3001.");
});
