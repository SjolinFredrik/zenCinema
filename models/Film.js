const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let filmSchema = new Schema ({
    "title": {type: String, required: true},
    "productionCountries": [],
    "productionYear": {type: Number, required:true},
    "length": Number,
    "genre": String,
    "distributor": String,
    "language": String,
    "subtitles": String,
    "director": {type: String, required: true},
    "actors": [],
    "description": String,
    "images": [],
    "youtubeTrailers": [],
    "reviews": []
});

module.exports = db.model('Film', filmSchema);