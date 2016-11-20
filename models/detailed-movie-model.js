/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let MovieDetailsSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genres: [String],
    releaseDate: {
        type: String,
        required: true
    },
    actors: [Object]
});

let MovieDetails;
MovieDetailsSchema.statics.getDetailedMovie =
    function(image, trailer, title, description, genres, releaseDate, actors) {
        let movie = new MovieDetails(image, trailer, title, description, genres, releaseDate, actors);
        return movie;
    };

mongoose.model("MovieDetails", MovieDetailsSchema);
MovieDetails = mongoose.model("MovieDetails");
module.exports = MovieDetails;