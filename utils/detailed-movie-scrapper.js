"use strict";

const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");

const getMovieDetailsFromUrl = function(url) {
    httpRequester
        .get(url)
        .then(result => {
            const detailsSelector = "#title-overview-widget";
            const actorsSelector = "#titleCast .cast_list tbody";
            const body = result.body;

            htmlParser.parseDetailedMovie(detailsSelector, actorsSelector, body);
        })
}

module.exports.getMovieDetailsFromUrl = getMovieDetailsFromUrl;