class Showing extends Component {
  constructor(data) {
    super(data);
    this.getPrices().then(data =>{
      this.prices = data;
      this.render();
    });

    this.addEvents({
      'click .book-film': 'catchShowingId'
    });
  }

  get dateToString() {
    return new Date(this.date).toLocaleString('sv-SE', {weekday: 'short', month: 'long', day: 'numeric'});
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