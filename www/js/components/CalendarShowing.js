class CalendarShowing extends Component {
  constructor() {
    super();
    this.showingData = [];
    this.loadShowingData();
  }

  async loadShowingData() {
    this.showingData = await Showing.find(`.find().populate('film').exec()`);
    this.render();
  }
}