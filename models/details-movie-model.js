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

//`http://www.imdb.com/title/${this.imdbId}/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=2495768522&pf_rd_r=1CS87QBS7W60MRC6JFS0&pf_rd_s=right-7&pf_rd_t=15061&pf_rd_i=homepage&ref_=hm_cht_t0`

mongoose.model("MovieDetails", MovieDetailsSchema);
MovieDetails = mongoose.model("MovieDetails");
module.exports = MovieDetails;