const Movie = require("../models/movie.model.js");
const fetch = require("node-fetch");
var axios = require("axios").default;
var fs = require('fs'),
    request = require('request');

// const con_db = require('./connect');
const imdbUrl = "https://www.imdb.com";
const searchurl = "https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=";
const movieUrl = "https://www.imdb.com/title/";

const serachCache = {};
const movieCache = {};

function searchMovies(searchTerm) {
  
}

getMovie = async (imdbId) => {

var movie = await fetchMovie(imdbId);

// console.log(rd);
return movie;

}


function fetchMovie(imdbId)
{
    var options = {
  method: 'GET',
  url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
  params: {i: imdbId, type: 'movie', r: 'json', plot: 'full'},
  headers: {
    'x-rapidapi-key': '8c87de996dmsh4992e22e75bc613p17709ajsn731dd34b2932',
    'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
  }
};

return axios.request(options).then(function (response) {
  // console.log(response.data);
  var m = response.data;
  var r = m.Released;
  var rd = "";
  var released = r.split(" ")[1];
  released = month(released);

  released = r.split(" ")[2]+"-"+released+"-"+r.split(" ")[0];

  var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);
  
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

  download(m.Poster, 'images/posters/'+m.imdbID+'.jpg', function(){
// console.log('done');
});

  const movie = new Movie({
  imdb_id: m.imdbID,
  title: m.Title,
  runtime: m.Runtime,
  date_published: released,
  genre: m.Genre,
  img_url: m.Poster,
  img_path: m.imdbID+'.jpg',
  summary: m.Plot,
  actors: m.Actors,
  rating: m.imdbRating,
  type:m.Type,
  localpath: ""
});

// Save Movie in the database

var rd ="";

Movie.create(movie, (err, data) => {
  if (err)
  {
    rd = err.sqlMessage;
  }
  else
  {
    rd =  data;
  } 

});

   return movie;


}).catch(function (error) {
  console.error(error);
});

}

function month(month){
  var m ="";
    if(month == "Jan")
    {
      m = "01";
    }
    else if(month == "Feb")
    {
      m = "02";
    }
    else if(month == "Mar")
    {
      m = "03";
    }
    else if(month == "Apr")
    {
      m = "04";
    }
    else if(month == "May")
    {
      m = "05";
    }
    else if(month == "Jun")
    {
      m = "06";
    }
    else if(month == "Jul")
    {
      m = "07";
    }
    else if(month == "Aug")
    {
      m = "08";
    }
    else if(month == "Sep")
    {
      m = "09";
    }
    else if(month == "Oct")
    {
      m = "10";
    }
    else if(month == "Nov")
    {
      m = "11";
    }
    else if(month == "Dec")
    {
      m = "12";
    }
  
    return m;
  
  }

module.exports = {
  searchMovies,
  getMovie,
};
