class BookingPage extends Component {
  constructor() {
    super();
  }

  createBookingSystem(showingId) {
    console.log(showingId);
    this.bookingSystem = new BookingSystem(showingId);
    console.log(this.bookingSystem);
    this.render();
    this.baseEl.modal('show');
  }
}