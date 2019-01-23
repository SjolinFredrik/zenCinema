const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let showingSchema = new Schema({
// "salon": [{ type: Schema.Types.ObjectId, ref: 'Salon' }],
// "film": [{ type: Schema.Type.ObjectId, ref: 'Film'}],
"date": { type: Date, default: Date.now },
"time": String
});


// Built-in Date methods are not hooked into the mongoose change tracking logic which in English means that if you use a Date in your document and modify it with a method like setMonth(), mongoose will be unaware of this change and doc.save() will not persist this modification. If you must modify Date types using built-in methods, tell mongoose about the change with doc.markModified('pathToYourDate') before saving.

// var Assignment = mongoose.model('Assignment', { dueDate: Date });
// Assignment.findOne(function (err, doc) {
//   doc.dueDate.setMonth(3);
//   doc.save(callback); // THIS DOES NOT SAVE YOUR CHANGE

//   doc.markModified('dueDate');
//   doc.save(callback); // works
// })

module.exports = db.model('Showing', showingSchema);