"use strict";

const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");

const getMovieActorsFromUrl = function(url) {
    httpRequester
        .get(url)
        .then(result => {
            const actorsSelector = "#name-overview-widget-layout";
            const moviesSelector = ".filmo-category-section";
            const body = result.body;

            htmlParser.parseActorsMovie(actorsSelector, moviesSelector, body);
        })
}

module.exports.getMovieActorsFromUrl = getMovieActorsFromUrl;