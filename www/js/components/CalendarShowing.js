class CalendarShowing extends Component {
  constructor() {
    super();
    this.showingData = [];
    this.loadShowingData();
  }

  async loadShowingData() {
    this.showingData = await Showing.find(`.find().populate('saloon').populate('film').exec()`);    
    this.render();
  }
}