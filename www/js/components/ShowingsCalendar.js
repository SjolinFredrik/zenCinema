class ShowingsCalendar extends Component {
  
    constructor() {
      super();
      this.showList().then(data => {
        this.showings = data;
        this.render();
      });
    }


  async showList() {
    return await Showing.find(`.find().populate('saloon').populate('film').exec()`);
  }

}