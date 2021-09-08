const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { response, text } = require("express");
const request = require("request");
const fs = require("fs");

// const con_db = require('./connect');
const imdbUrl = "https://www.imdb.com";
const searchurl = "https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=";
const movieUrl = "https://www.imdb.com/title/";

const serachCache = {};
const movieCache = {};

function searchMovies(searchTerm) {
  return fetch(`${searchurl}${searchTerm}`)
    .then((response) => response.text())
    .then((body) => {
      const movies = [];
      const $ = cheerio.load(body);
      $(".findResult").each(function (i, element) {
        const $element = $(element);

        const $image = $element.find("td a img");

        const $title = $element.find("td.result_text a");

        const $title2 = $element.find("td.result_text");

        const $title3 = $title2.text();

        const imdbID = $title.attr("href").match(/title\/(.*)\//)[1];
        const year = $title3.match(/\([^)]*\)/g);

        const movie = {
          image: $image.attr("src"),
          title: $title.text(),
          imdbID,
          year,
        };
        movies.push(movie);
      });
      serachCache[searchTerm] = movies;
      return movies;
    });
}

function getMovie(imdb_id) {
  return fetch(`${movieUrl}${imdb_id}`)
    .then((response) => response.text())
    .then((body) => {
      const $ = cheerio.load(body);
      const title = $(".title_wrapper h1").text().trim();

      const runtime = $("time")
        .first()
        .contents()
        .filter(function () {
          return this.type === "text";
        })
        .text()
        .trim();

        const genreA = [];
      // const genreA = $("#titleStoryLine > div:nth-child(10)")
      // .find("a")
      // .text()
      // .trim()
      // .split(" ");

      // const $genre = $(".subtext").text().trim().split("|")[2];
      // console.log($genre);
      
      // if($genre.includes(",")){
      //   const genres = $genre.split(",");
      //   genres.forEach(function (obj) {
      //     obj = obj.trim();
      //     genreA.push(obj);
      //   });
      // }
      // else{
      //   genreA.push(obj);
      // }

      // $(".subtext a").each(function (i, element){
      //   const $element = $(element);
      //   const gen = $element.attr("href").match(/\/search\/title\?genres=/)[1];
      //   console.log(gen);
      // });

      $(".subtext a").each(function (i, element){
        const $element = $(element);
        const gen = $element.attr("href", "/search/title?genres=*").text();
        // console.log(gen);
        genreA.push(gen);
      });
        
      genreA.pop();
      // console.log(genreA);

      const $genres = JSON.stringify(Object.assign({}, genreA)); // convert array to string
      // var genre = JSON.parse($genres);

      var genre = $genres;
      // var genre = genreA;


      // console.log($genre);

      var date_published = $(".subtext a[title]").text().trim();
      
      var d_p = date_published.split("(");
      d_p = d_p[0];
      d_p = d_p.split(" ");

      var m = d_p[1];

      var month = "";

      if(m = "January")
      {
        month = "01"
      }
      else if(m = "February")
      {
        month = "02"
      }
      else if(m = "March")
      {
        month = "03"
      }
      else if(m = "April")
      {
        month = "04"
      }
      else if(m = "May")
      {
        month = "05"
      }
      else if(m = "June")
      {
        month = "06"
      }
      else if(m = "July")
      {
        month = "07"
      }
      else if(m = "August")
      {
        month = "08"
      }
      else if(m = "September")
      {
        month = "09"
      }
      else if(m = "October")
      {
        month = "10"
      }
      else if(m = "November")
      {
        month = "11"
      }
      else if(m = "December")
      {
        month = "12"
      }

      date_published = d_p[2]+"-"+month+"-"+d_p[0];

      const image = $(".slate_wrapper .poster img").attr("src");

      var image_path = "";

      const image_url = image;
      if (image_url) {
        image_path = "app/images/posters/"+imdb_id+".jpg";
        const download = (image_url, image_path, callback) => {
          request.head(image_url, (err, res, body) => {
            request(image_url).pipe(fs.createWriteStream(image_path)).on("close", callback);
          });
        };
        download(image_url, image_path, () => {
          console.log("Done!");
        });
      } else {
        image_path = "";
      }

      var summary = $(".summary_text").text().trim().replace("'", "").replace(",", "");
    //   summary = encodeURI(summary);

      const director = "";
      const castAll = [];

      $(".credit_summary_item").each(function (i, element) {
        const $element = $(element)
          .text()
          .replace("Stars:", "")
          .replace("|", "")
          .replace("See full cast & crew", "")
          .trim();
        castAll.push($element);
      });

      const cast = [];
      const $cast = castAll[2];
      if ($cast) {
        const $cast2 = $cast.split(",");
        $cast2.forEach(function (obj) {
          obj = obj.replace(/[^\w\s]/gi, "").trim();
          cast.push(obj);
        });
      }
      
      var actors = cast.toString();
      const rating = $("span[itemprop=ratingValue]").text();

      const trailers = [];

      $(".video-modal").each(function (i, element) {
        const $element = $(element);
        const trailer = $element.attr("href");
        const trailer2 = `${imdbUrl}${trailer}`;
        trailers.push(trailer2);
      });


      const movie = {
        imdb_id,
        title,
        runtime,
        genre,
        date_published,
        image_url,
        summary,
        actors,
        rating,
        image_path,
        trailers,
      };
    //   console.log(movie);
      return movie;
    });
}

module.exports = {
  searchMovies,
  getMovie,
};
