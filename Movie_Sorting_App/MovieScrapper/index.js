const express = require('express');
const cors = require('cors');

const scrapper = require('./app/controllers/scraper');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: 'Scrapping is fun'
    });
});

app.get('/search/:title', (req, res) => {
    scrapper
    .searchMovies(req.params.title)
    .then(movies => {
        res.json(movies);
    });
});

app.get('/movie/:imdbID', (req, res) => {
    scrapper
    .getMovie(req.params.imdbID)
    .then(movie => {
        res.json(movie);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});