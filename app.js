/* globals console require setTimeout Promise */
'use strict';

const httpRequester = require("./utils/http-requester");
const htmlParser = require("./utils/html-parser");
const queuesFactory = require("./data-structures/queue");
const modelsFactory = require("./models");
const constants = require("./config/constants");
const utils = require("./utils/utilities");

require("./config/mongoose")(constants.connectionString);

let urlsQueue = queuesFactory.getQueue();

constants.genres.forEach(genre => {
    for (let i = 0; i < constants.pagesCount; i += 1) {
        let url = constants.searchUrl({ genre: genre, page: i + 1 });
        urlsQueue.push(url);
    }
});

function getMoviesFromUrl(url) {
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

            return utils.wait(1000);
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
}

Array.from({ length: constants.asyncPagesCount })
    .forEach(() => getMoviesFromUrl(urlsQueue.pop()));