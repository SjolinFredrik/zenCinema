class PageContent extends Component {

  constructor(){
    super();
    this.startPage = new StartPage();
    this.missingPage = new MissingPage();
    this.loginPage = new LoginPage();
    this.bookingPage = new BookingPage();
    this.registerPage = new RegisterPage();
  }
  
}