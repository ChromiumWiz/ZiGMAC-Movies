module.exports = (app) => {
  const movies = require("../controllers/movie.controller.js");
  const authUser = require("../controllers/authuser.controller.js");
  const card = require("../controllers/crad.controller.js");

  // // Create a new Customer
  // app.post("/customers", customers.create);

  // Retrieve all Customers
  app.get("/movies", movies.findAll);

  // Retrieve a single Customer with customerId
  app.get("/movies/:id", movies.findOne);

  //retrive an image
  app.get("/image/:id", movies.image);

  app.get("/countmovie", movies.countMovie);

  app.get("/search/:sp/offset/:ofs", movies.searchMovie);

  app.get("/searchcount/:sp", movies.searchCount);

  app.post("/createtoken", movies.createToken);

  app.post("/authregister", authUser.createUser);

  app.post("/authlogin", authUser.loginCreate);

  app.post("/authsession", authUser.loginSession);

  app.post("/authprofile", authUser.profile);

  app.post("/authlogout", authUser.logout);

  app.post("/topup", card.topup);

  // // Update a Customer with customerId
  // app.put("/customers/:customerId", customers.update);

  // // Delete a Customer with customerId
  // app.delete("/customers/:customerId", customers.delete);

  // // Create a new Customer
  // app.delete("/customers", customers.deleteAll);
};
