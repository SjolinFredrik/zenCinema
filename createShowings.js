const mongoose = require('mongoose');

// Connect to db
let dbName = 'db_zenCinema'
mongoose.connect(`mongodb://localhost/${dbName}`);
global.db = mongoose.connection;
db.on('error', () => console.log('Could not connect to DB'));
db.once('open', () => {
  console.log('Connected to DB');
  createAndAddShowingsTo();
});

let Saloon = require('./models/Saloon');
let Film = require('./models/Film');
let Showing = require('./models/Showing');


let shuffleArr = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

async function createAndAddShowingsTo() {
  let showingsCount = await Showing.count();

  if (showingsCount > 0) {
    console.log('Deleted showings: ', await Showing.remove({}));
  }

  let date = new Date();

  let movies = await Film.find();
  let saloons = await Saloon.find();

  for (let i = 0; i < 84; i++) {

    if (i % 3 == 0) {
      date.setDate(date.getDate() + 1);
    }

    let showtime = new Showing({
      "salon": saloons.pop(),
      /* auditorium.splice(Math.floor(Math.random() * auditorium.length), 1) */
      "film": shuffleArr(movies).pop(),
      /* movies.splice(Math.floor(Math.random() * movies.length), 1) */
      "date": date.toString().split(' ').slice(0, 4).join(' '),
      "time": 17 + Math.floor(Math.random() * 3) + ':' + (Math.round(Math.random() < 0.5 ? 15 : 45))
    });
    console.log(await showtime.save());
  }

  showingsCount = await Showing.count();


  console.log(`Added ${showingsCount} showings to the database`);

  process.exit();

}
