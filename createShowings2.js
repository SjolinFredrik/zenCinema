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

function randomItem(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

async function createAndAddShowingsTo() {
  let showingsCount = await Showing.count();

  if (showingsCount > 0) {
    console.log('Deleted showings: ', await Showing.remove({}));
  }

  let date = new Date();

  let movies = await Film.find();
  let saloons = await Saloon.find();

  for (let i = 0; i < saloons.length; i++) {
    let saloon = saloons[i];
    for (let j = 0; j < 28; j++) {
      if (i % 3 == 0) {
        date.setDate(date.getDate() + 1);
      }
        let film = randomItem(movies);
        let showtime = new Showing({
          "saloon": saloon,
          "film": film,
          "date": date.getTime(),
          "time": 17 + Math.floor(Math.random() * 4) + ':' + (Math.round(Math.random() < 0.5 ? 15 : 45))
        });
        await showtime.save();

      }
    }

  showingsCount = await Showing.count();


  console.log(`Added ${showingsCount} showings to the database`);

  process.exit();

}
