/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let ActorSchema = new Schema({
    nameOfRole: {
        type: String,
        required: true
    },
     name: {
        type: String,
        required: true
    },
     profileImage: {
        type: String,
        required: true
    },
    imdbId: {
        type: String,
        required: true
    }
});

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
    genres: [String]
    ,
     releaseDate: {
         type: Date,
        required: true
    },
    actors: 
        [ActorSchema]
});

let MovieDetails;
MovieDetailsSchema.statics.getMovieDetails  =
    function(image, trailer, title, description, genres, releaseDate, actors) {
        return new MovieDetails(image, trailer, title, description, genres, releaseDate, actors);
    };

mongoose.model("MovieDetails", MovieDetailsSchema);
MovieDetails = mongoose.model("MovieDetails");
module.exports = MovieDetails;