class StartPage extends Component {

  constructor() {
    super();
    this.addRoute('/', 'Start');
    this.calendarShowing = new CalendarShowing();
    this.filmCarousel = new FilmCarousel();
    this.zenCoin = new ZenCoin();
  }
}