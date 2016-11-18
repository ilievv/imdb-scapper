/* globals console require setTimeout Promise */
"use strict";

const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");
const queuesFactory = require("../data-structures/queue");
const modelsFactory = require("../models");
const utilities = require("./utilities");

const getMoviesFromUrl = function(url) {
    console.log(`Working with ${url}`);

    httpRequester.get(url)
        .then((result) => {
            const selector = ".col-title span[title] a";
            const html = result.body;
            return htmlParser.parseSimpleMovie(selector, html);
        })
        .then(movies => {
            let dbMovies = movies.map(movie => {
                return modelsFactory.getSimpleMovie(movie.title, movie.url);
            });

            modelsFactory.insertManySimpleMovies(dbMovies);

            return utilities.wait(1000);
        })
        .then(() => {
            if (urlsQueue.isEmpty()) {
                return;
            }

            getMoviesFromUrl(urlsQueue.pop());
        })
        .catch((err) => {
            console.dir(err, { colors: true });
        });
};

module.exports.getMoviesFromUrl = getMoviesFromUrl;