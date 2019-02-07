const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema ({
  "firstName": {type: String, required: true},
  "lastName": {type: String, required: true},
  "email": {type: String, required: true, unique: true},
  "password": {type: String, required: true},
  //"bookings": [{type: Schema.Types.ObjectId, ref:"Booking", required: true}],
  "admin": {type: Boolean, default: "false"}
}, { toJSON: { virtuals: true } });

userSchema.virtual('bookings',  {
  ref: 'Booking',
  localField: '_id', 
  foreignField: 'customer',
  justOne: false
});


// UNCOMMENT once bcrypt up n running
userSchema.pre('save', async function(){
  console.log("yo");
  this.password = await bcrypt.hash(this.password + passwordSalt, 10);
  console.log("yo2");
});

module.exports = db.model('User', userSchema);