module.exports = (app) => {
  const movies = require("../controllers/movie.controller.js");
  const cards = require("../controllers/scratchCards.controller.js");

  // simple route
  // app.get("/", (req, res) => {
  //   res.json({ message: "Welcome to bezkoder application." });
  // });

  app.get("/", function (req, res) {
    res.sendFile("views/index.html", { root: "./app" });
  });

  // Retrieve all Customers
  app.get("/search/:title", movies.findAll);

  // Retrieve a single Customer with imdbId
  app.get("/movies/:imdbId", movies.findOne);

  app.get("/direct", function (req, res) {
    var result = movies.getDirectoriesRecursive();
    res.send(result);
  });

  // Retrieve a single Customer with imdbTitle
  app.get("/title/:title", movies.searchTitle);

  app.get("/imdb/:title", movies.imdbIds);
  app.post("/imdb", movies.imdbIds);

  app.post("/movies", movies.create);

  // Update a Customer with customerId
  app.put("/movies/:movieId", movies.update);

  // Delete a Customer with customerId
  app.delete("/movies/:movieId", movies.delete);

  // Create a new Customer
  app.delete("/movies", movies.deleteAll);

  // app.get("/image/:id", movies.image);

  app.get("/imdbfetch", function (req, res) {
    movies.checkFetch(req, (result) => {
      res.send("Data fetched");
    });
    
  });

  app.get("/sym", function (req, res) {
    res.sendFile("views/sym.html", { root: "./app" });
  });

  app.post("/sym/create", (req, res) => {
    // var result = movies.checkDir(req);
    var { link_dest, file_dest } = "";
    link_dest = decodeURIComponent(req.body.link_dest);
    file_dest = decodeURIComponent(req.body.file_dest);
    var request = {
      link_dest: link_dest,
      file_dest: file_dest,
    };
    // console.log(request);
    var result = movies.symCreate(request);
    // res.json(result);
    res.json({ msg: "success", result: result });
    // return "success";
  });

  app.get("/scratch/", function (req, res) {
    res.sendFile("views/scratch.html", { root: "./app" });
  });

  // app.post("/cardcreate/", (req, res) => {
  //   // console.log(req.body);
  //   cards.createCard(req.body, (err, data) => {
  //     console.log(data);
  //   });
  // });
  app.post("/cardcreate/", cards.createCard);
};
