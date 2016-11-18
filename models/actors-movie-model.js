/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

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
    
});
