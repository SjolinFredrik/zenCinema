class StartPage extends Component {

  constructor(){
    super();
    this.addRoute('/', 'Start');
    this.showingsCalendar = new ShowingsCalendar();
  }


}