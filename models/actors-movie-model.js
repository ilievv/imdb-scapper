/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let MovieSchema = new Schema({
    nameOfMovie: {
        type: String,
        required: true
    },
    imdbId: {
        type: String,
        required: true
    },
    nameOfCharacter: {
        type: String,
        required: true
    }
});

let ActorsSchema = new Schema({
    profileImage: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    movies: [MovieSchema]
});

let Actors;
ActorsSchema.statics.getActors =
    function() {
        return new Actors(profileImage, name, biography, movies);
    };

mongoose.model("Actors", ActorsSchema);
Actors = mongoose.model("Actors");
module.exports = Actors;