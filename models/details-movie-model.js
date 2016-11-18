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
    genres: {
         type: String,
        required: true
    },
     releaseDate: {
         type: Date,
        required: true
    },
    actors: 
        [ActorSchema]
});

// ActorSchema.virtual.imdbUrl = function() {
//     return `http://www.imdb.com/name/${this.imdbUrl}/?ref_=tt_ov_st_sm`;
// };

mongoose.model("MovieDetails", MovieDetailsSchema);
MovieDetails = mongoose.model("MovieDetails");
module.exports = MovieDetails;