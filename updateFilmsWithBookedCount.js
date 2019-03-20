const mongoose = require('mongoose');

// Connect to db
let dbName = 'db_zenCinema'
mongoose.connect(`mongodb://localhost/${dbName}`);
global.db = mongoose.connection;
db.on('error', () => console.log('Could not connect to DB'));
db.once('open', () => {
  console.log('Connected to DB');
  updateFilmsToDb();
});

let Film = require('./models/Film');

async function updateFilmsToDb() {
  let filmsCount = await Film.count();

  let films = await Film.find();

  for (let i = 0; i < films.length; i++) {
    let film = films[i];
    film.bookedCount = 0;
    await film.save();
  }

  saloonsCount = await Film.count();


  console.log(`Updated ${filmsCount} films to the database`);

  process.exit();

}
