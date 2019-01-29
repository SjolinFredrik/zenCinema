const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let showingSchema = new Schema({
"saloon": { type: Schema.Types.ObjectId, ref: 'Saloon'},
"film": { type: Schema.Types.ObjectId, ref: 'Film'},
"date": Number,
"time": String
});

// [{ type: Schema.Types.ObjectId, ref: 'Salon' }],
// [{ type: Schema.Type.ObjectId, ref: 'Film'}]

module.exports = db.model('Showing', showingSchema);