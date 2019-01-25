const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
  "customer": [{type: Schema.Types.ObjectId, ref: 'User'}],
  "show": [{type: Schema.Types.ObjectId, ref: 'Showings'}],
  "seats": [],
  "bookingNumber": String

});


module.exports = db.model('Booking', bookingSchema);