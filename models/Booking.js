const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
  "customer": {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  "show": {
    type: Schema.Types.ObjectId,
    ref: 'Showing'
  },
  "seats": [],
  "bookingNumber": String,
  "totalCost": String
});

let  checkTakenSeats = async function(booking) {

  let bookings = await booking.constructor.find({show: booking.show._id});
  console.log(bookings);
  let takenSeats = [];
  for (let i = 0; i < bookings.length; i++) {
    let booking = bookings[i];
    let seats = booking.seats;
    takenSeats = takenSeats.concat(seats);
  }
  console.log(takenSeats);
  for (let i = 0; i < booking.seats.length; i++) {
    let seat = booking.seats[i];
    if(takenSeats.includes(seat)){
      console.log(takenSeats, seat);
      return true;
    }
  }
  return false;
}

bookingSchema.pre('save', async function() {
  console.log(this);
  if(await checkTakenSeats(this)) {
    throw new Error('something went wrong');
  }
});

module.exports = db.model('Booking', bookingSchema);  