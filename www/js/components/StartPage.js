class StartPage extends Component {

  constructor() {
    super();
    this.addRoute('/', 'Start');
    this.calendarShowing = new CalendarShowing();
  }
}