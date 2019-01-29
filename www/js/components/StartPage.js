class StartPage extends Component {

  constructor(){
    super();
    this.addRoute('/', 'Start'); 
    this.getFilmsFromShowings();
  }

  async showListForSeveralDaysFromToday(days) {
    let diffTime = days * 24 * 60 * 60 * 1000;
    let dateTo = new Date(new Date().getTime() + diffTime).toString();
    let lastDay = new Date().getTime() + diffTime;
    let actualShowings = await Showing.find(`.find({date: {$lte: ${lastDay}} }).populate('saloon').populate('film').exec()`);
    return actualShowings;
  }

  async getFilmsFromShowings() {
    this.showListForSeveralDaysFromToday(2).then(data => {
      this.actualShowings = data;
      // for (let i = 0; i < this.actualShowings.length; i++) {
      //   let showing = this.actualShowings[i];
      //   let date = new Date(showing.date);
      //   showing.date = date.toISOString().slice(0,10);
      // }

      this.actualFilms = [];

      for (let i = 0; i < this.actualShowings.length; i++) {
        let film = this.actualShowings[i].film;
        this.actualFilms.push(film);
      }
      this.render();
    });
  }

}