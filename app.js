const simpleMovieScrapper = require("./utils/simple-movie-scrapper");
const detailedMovieScrapper = require("./utils/detailed-movie-scrapper");
const actorsMovieScrapper = require("./utils/actors-movie-scrapper")
const constants = require("./config/constants");
// const queuesFactory = require("./data-structures/queue");

require("./config/mongoose")(constants.connectionString({ collection: "simplemovies" }));

// let urlsQueue = queuesFactory.getQueue();

// constants.genres.forEach(genre => {
//     for (let i = 0; i < constants.pagesCount; i += 1) {
//         let url = constants.searchUrl({ genre: genre, page: i + 1 });
//         urlsQueue.push(url);
//     }
// });

// for (let i = 0; i < constants.asyncPagesCount; i++) {
//     simpleMovieScrapper.getMoviesFromUrl(urlsQueue.pop());
// }

// let SimpleMovie = require('./models/simple-movie-model');
// SimpleMovie.find({})
//     .then(x => {
//         console.log(x[0].imdbUrl);
//         console.log(x[0].name);
//     })
//     .catch(console.log());

// detailedMovieScrapper.getMovieDetailsFromUrl("http://www.imdb.com/title/tt0094226/");

// detailedMovieScrapper.getMovieDetailsFromUrl("http://www.imdb.com/title/tt1878870");
actorsMovieScrapper.getMovieActorsFromUrl("http://www.imdb.com/name/nm0000375");