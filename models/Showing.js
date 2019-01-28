const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let showingSchema = new Schema({
"salon": { type: Schema.Types.ObjectId, ref: 'Salon'},
"film": { type: Schema.Types.ObjectId, ref: 'Film'},
"date": String,
"time": String
});

// [{ type: Schema.Types.ObjectId, ref: 'Salon' }],
// [{ type: Schema.Type.ObjectId, ref: 'Film'}]

module.exports = db.model('Showing', showingSchema);