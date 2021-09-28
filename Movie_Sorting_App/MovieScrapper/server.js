const express = require("express");

// const bodyParser = require("body-parser");

const app = express();
const movies = require("./app/controllers/movie.controller.js");
// parse requests of content-type: application/json
// app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get("/sym", function (req, res) {
  res.sendFile("views/sym.html", { root: "./app" });
});

app.post("/sym/create", (req, res) => {
  var result = movies.checkDir(req);
  console.log(req.body.file_dest);
  var result = movies.symCreate(req.body);
  res.json(result);
  // res.json({ msg: "success" });
  // return "success";
});

require("./app/routes/movie.routes.js")(app);

// set port, listen for requests
app.listen(3002, () => {
  console.log("Server is running on port 3002.");
});
