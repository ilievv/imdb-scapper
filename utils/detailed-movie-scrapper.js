"use strict";

const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");
const modelsFactory = require("../models");

const getMovieDetailsFromUrl = function(url) {
    httpRequester
        .get(url)
        .then(result => {
            const detailsSelector = "#title-overview-widget";
            const actorsSelector = "#titleCast .cast_list tbody";
            const body = result.body;

            return htmlParser.parseDetailedMovie(detailsSelector, actorsSelector, body);
        })
        .then(movie => {
            let detailedMovie = modelsFactory.getDetailedMovie(
                movie.imageUrl,
                movie.trailerUrl,
                movie.title,
                movie.description,
                movie.genres,
                movie.releaseDate,
                movie.actors);

            modelsFactory.insertDetailedMovie(detailedMovie);
        })
        .catch(console.log);
}

module.exports.getMovieDetailsFromUrl = getMovieDetailsFromUrl;