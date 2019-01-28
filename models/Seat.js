const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let seatSchema = new Schema({
    "number": {type: String, required: true},
    "available": {type: String, required: true}
});

module.exports = db.model('Seat', seatSchema);