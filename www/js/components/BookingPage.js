class BookingPage extends Component {
  constructor() {
    super();
    this.addRoute('/booking', 'Booking');
    this.bookingSystem = new BookingSystem();
  }
}