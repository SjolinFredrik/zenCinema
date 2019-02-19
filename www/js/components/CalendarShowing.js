class CalendarShowing extends Component {
  constructor() {
    super();
    this.showingData = [];
    this.loadShowingData();
  }

  async loadShowingData() {
    this.showingData = await Showing.find(`.find().limit(9).sort({$natural: 1}).populate('film').exec()`);
    this.render();
  }
}