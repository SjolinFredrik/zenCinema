class PageContent extends Component {

  constructor() {
    super();
    this.startPage = new StartPage();
    this.missingPage = new MissingPage();
    this.bookingPage = new BookingPage();
    this.registerPage = new RegisterPage();
    this.filmPage = new FilmPage();
    this.customerBookingsPage = new CustomerBookingsPage();
  }

}