import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Nav from "./components/navigation/Nav";
import Recent from "./components/recent/Recent";
import Movie from "./components/movie/Movie";
import Smovie from "./components/smovie/Smovie";
import DownloadMovie from "./components/downloadMovie/DownloadMovie";
import Tv from "./components/tv/Tv";
import SearchPage from "./components/searchPage/SearchPage";
import Login from "./components/login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
 

function App() {
  // const backgroundImage = require("./assets/images/4L75tkWVDgKtGe7kfoEGP6.jpg");
  
  return (
    <Router>
      <Login />
      <div
        className="App"
        style={{
          backgroundImage:
            "url(/images/4L75tkWVDgKtGe7kfoEGP6.jpg)",
        }}
      >
        <Nav />

        {/* <SearchF /> */}
        <div className="clearfix marginTop"></div>
        <Switch>
          <Route path="/" exact component={withRouter(Recent)} />
          <Route path="/movies" exact component={withRouter(Movie)} />
          <Route path="/tv" exact component={withRouter(Tv)} />
          <Route path="/movies/:id" exact component={withRouter(Smovie)} />
          <Route
            path="/download/:id"
            exact
            component={withRouter(DownloadMovie)}
          />
          <Route path="/search/:sp" exact component={withRouter(SearchPage)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
