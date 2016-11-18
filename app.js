const simpleMovieScrapper = require("./utils/simple-movie-scrapper");
const constants = require("./config/constants");
const queuesFactory = require("./data-structures/queue");

require("./config/mongoose")(constants.connectionString);

let urlsQueue = queuesFactory.getQueue();

constants.genres.forEach(genre => {
    for (let i = 0; i < constants.pagesCount; i += 1) {
        let url = constants.searchUrl({ genre: genre, page: i + 1 });
        urlsQueue.push(url);
    }
});

Array.from({ length: constants.asyncPagesCount })
    .forEach(() => simpleMovieScrapper.getMoviesFromUrl(urlsQueue.pop()))