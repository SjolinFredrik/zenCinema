const mongoose = require('mongoose');

// Connect to db
let dbName = 'db_zenCinema'
mongoose.connect(`mongodb://localhost/${dbName}`);
global.db = mongoose.connection;
db.on('error', () => console.log('Could not connect to DB'));
db.once('open', () => {
  console.log('Connected to DB');
  updateSaloonsToDb();
});

let Saloon = require('./models/Saloon');

async function updateSaloonsToDb() {
  let saloonsCount = await Saloon.count();

  let saloons = await Saloon.find();

  let schemaOne = {
    name: 'Zenmongouse',
    schema: [8, 9, 10, 10, 10, 10, 12, 12]
  };
  let schemaTwo = {
    name: 'Zentermidiate',
    schema: [6, 8, 9, 10, 10, 12]
  };
  let schemaThree = {
    name: 'Zenpetit',
    schema: [5, 7, 9, 9, 12]
  };

  schemas = [schemaOne, schemaTwo, schemaThree];

  for (let i = 0; i < saloons.length; i++) {
    let saloon = saloons[i];
    if (saloon.name === 'Zenmongouse') {
      saloon.bestRows = [4,5];
    }
    await saloon.save();
  }

  saloonsCount = await Saloon.count();


  console.log(`Added ${saloonsCount} saloons to the database`);

  process.exit();

}
