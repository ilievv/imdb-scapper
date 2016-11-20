/* globals module require */

const SimpleMovie = require("./simple-movie-model");
const DetailedMovie = require("./detailed-movie-model");

module.exports = {
    getSimpleMovie(name, url) {
        return SimpleMovie.getSimpleMovieByNameAndUrl(name, url);
    },
    getDetailedMovie(image, trailer, title, description, genres, releaseDate, actors) {
        return DetailedMovie.getDetailedMovie(image, trailer, title, description, genres, releaseDate, actors);
    },
    insertManySimpleMovies(movies) {
        SimpleMovie.insertMany(movies);
    },
    insertDetailedMovie(movie) {
        DetailedMovie.insertMany([movie]);
    }
};