class BookingPage extends Component {
  constructor() {
    super();
    this.addRoute('/booking', 'Booking');
  }

  mount() {
    if (App.showingId) {
      this.showingId = App.showingId;
      this.bookingSystem = new BookingSystem(this.showingId);
      this.render();
    }
  }
}