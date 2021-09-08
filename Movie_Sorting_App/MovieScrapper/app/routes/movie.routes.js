module.exports = app => {
    const movies = require("../controllers/movie.controller.js");
  
    // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

app.get('/',function(req,res) {
  res.sendFile('views/index.html', { root: './app' });
});

// Retrieve all Customers
app.get("/search/:title", movies.findAll);

// Retrieve a single Customer with imdbId
app.get("/movies/:imdbId", movies.findOne);

// Retrieve a single Customer with imdbTitle
app.get("/title/:title", movies.searchTitle);


// app.get("/imdb/:title",  movies.imdbIds);
app.post("/imdb",  movies.imdbIds);


app.post("/movies", movies.create);

// Update a Customer with customerId
app.put("/movies/:movieId", movies.update);

// Delete a Customer with customerId
app.delete("/movies/:movieId", movies.delete);

// Create a new Customer
app.delete("/movies", movies.deleteAll);


app.get("/image/:id", movies.image);

  };