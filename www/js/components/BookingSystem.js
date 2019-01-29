class BookingSystem extends Component {
  constructor() {
    super();
    this.showingId = '5c50420eeff29e2278cf0e30';
    this.showingData(this.showingId)
      .then(data => {
        this.showing = data;
        console.log(this.showing);
        this.showingDate = new Date(this.showing.date).toString().slice(0,10);
        this.saloon = this.showing.saloon;
        this.film = this.showing.film;
        console.log(this.saloon);
      })
      .then(() => {
        return Promise.all([this.findSaloonSchema(this.saloon), this.findFilm(this.film)]).then(data => {
          const saloonSchemaData = data[0];
          const filmData = data[1];

          this.saloonSchema = saloonSchemaData.seatsPerRow;
          this.film = filmData;

          console.log(this.saloonSchema);
          console.log(this.film);
          this.render();
        });
      });
    
  }

  async showingData(showingId) {
    let showing = await Showing.find(showingId);
    return showing;
  }
 
  async findSaloonSchema(saloonId) {
    return await Saloon.find(saloonId);
  }

  async findFilm(filmId) {
    return await Film.find(filmId);
  }
}