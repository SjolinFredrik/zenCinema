class Showing extends Component {
  constructor(data) {
    super();
    this.getMyData;
    this._id = data._id;
    this.film = data.film;
    this.time = data.time;
    this.date = data.date;
    this.saloon = data.saloon;
    this.getPrices().then(data =>{
      this.prices = data;
      this.render();
    });

    this.addEvents({
      'click .book-film': 'catchShowingId'
    });
  }

  get dateToString() {
    return new Date(this.date).toString().slice(0,10);
  }

  
  catchShowingId() {
    App.showingId = this._id;
    return App.showingId;
  }

  async getPrices() {
    let prices = await TicketPrice.find();
    return prices;
  }
}