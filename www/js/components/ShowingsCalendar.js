class ShowingsCalendar extends Component {
  constructor () {
    super();
    // this.dateFrom = dateFrom;
    // this.dateTo = dateTo;
    this.showFilmsList();
  }

  async showFilmsList() {
    // let today = new Date().getDate();
    // let filtered showings = this.showings.find(`.find({date: $gte: dateFrom, $lte: dateTo})`);
    this.showings = await Showing.find();
    let renderedShowings = [];
    for (let i = 0; i < this.showings.length; i++) {
      // let renderedShowing = showings[i];
      new Showing();
    }
    this.render();
    return this.showings;
  }
}