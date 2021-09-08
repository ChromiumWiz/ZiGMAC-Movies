const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { response, text } = require('express');
const request = require('request');
const fs = require('fs');

const con_db = require('./connect'); 
const imdbUrl = "https://www.imdb.com";
const searchurl = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';
const movieUrl = 'https://www.imdb.com/title/';

const serachCache = {};
const movieCache = {};

function searchMovies(searchTerm){

    if(serachCache[searchTerm]){
        console.log('serving from cache:', searchTerm);
        return Promise.resolve(serachCache[searchTerm]);
    }

    return fetch(`${searchurl}${searchTerm}`)
    .then(response => response.text())
    .then( body => {
        const movies = [];
        const  $ = cheerio.load(body);
        $('.findResult').each(function(i, element){
            const $element = $(element);
            // console.log($element.text());
            const $image = $element.find('td a img');

            const $title = $element.find('td.result_text a');

            const $title2 = $element.find('td.result_text');

            const $title3 = $title2.text();

            const imdbID = $title.attr('href').match(/title\/(.*)\//)[1];
            const year = $title3.match(/\([^)]*\)/g);
            // const year2 = year[0];

            const movie = {
                image: $image.attr('src'),
                title: $title.text(),
                imdbID,
                year

            };
            movies.push(movie);
        });
        serachCache[searchTerm] = movies;
        return movies;
    });
}

function getMovie(imdbID){

    // if(movieCache[imdbID]){
    //     console.log('serving from cache:', imdbID);
    //     return Promise.resolve(movieCache[imdbID]);
    // }

    return fetch(`${movieUrl}${imdbID}`)
    .then(response => response.text())
    .then(body => {
        // console.log(body);
        
        const $ = cheerio.load(body);
        const $title1 =$(".title_wrapper h1").text().trim();

        

        const runTime = $('time').first().contents().filter(function() {
            return this.type === 'text';
        }).text().trim();

        const genres = [];
        

        const $genre = $('.subtext').text().trim().split('|')[2];
        const genre = $genre.split(',');
        genre.forEach(function(obj){
            obj = obj.trim();
            genres.push(obj);
      });
        

        const $genres = JSON.stringify(Object.assign({}, genres));  // convert array to string
        const $genres2 = JSON.parse($genres);

        const datePublished = $('.subtext a[title]').text().trim();
        const image = $('.slate_wrapper .poster img').attr('src');

        var path = "";

        const url = image;
        if(url){
            path = "images/posters/"+imdbID+".jpg";
            const download = (url, path, callback) => {
                request.head(url, (err, res, body) => {
                  request(url)
                    .pipe(fs.createWriteStream(path))
                    .on('close', callback)
                })
              }
              download(url, path, () => {
                console.log('Done!')
              })
        }
        else{
            path = "";
        }
        

          

        var summary = $('.summary_text').text().trim();
        summary = encodeURI(summary);

        const director = "";
        const castAll = [];

        $('.credit_summary_item').each(function(i, element) {
            const $element = $(element).text().replace('Stars:','').replace('|','').replace('See full cast & crew','').trim();
            //director = i;
            castAll.push($element);
        });

        const cast =[];
        const $cast = castAll[2];
        if($cast)
        {
            const $cast2 = $cast.split(',');
        $cast2.forEach(function(obj){
            obj = obj.replace(/[^\w\s]/gi, '').trim();
            cast.push(obj);
      });
        }

      const rating = $('span[itemprop=ratingValue]').text();

      const trailers = [];

        $('.video-modal').each(function(i, element){
            const $element = $(element);
            const trailer = $element.attr('href');
            const trailer2 = `${imdbUrl}${trailer}`;
            trailers.push(trailer2);
        });

        const movie = {
            imdbID,
            $title1,
            runTime,
            $genres2,
            datePublished,
            image,
            summary,
            cast,
            rating,
            path,
            trailers
        }

        movieCache[imdbID] = movie;
        var movieRaw = JSON.stringify(movie);

        var values = [imdbID, $title1, summary, rating, genres, image, path, runTime, cast, datePublished, "", "Movie"];
        con_db.insertDb("movie_data", values);

        return movie;

    });
}


module.exports = {
    searchMovies,
    getMovie
}