class StartPage extends Component {

  constructor(){
    super();
    this.addRoute('/', 'Start'); 
    this.today = new Date().toString().slice(0,10);
    this.getFilmsFromShowings();
  }

  async showListForSeveralDaysFromToday(days) {
    let diffTime = days * 24 * 60 * 60 * 1000;
    let lastDay = new Date().getTime() + diffTime;
    this.lastDay = new Date(lastDay).toString().slice(0,10);
    let actualShowings = await Showing.find(`.find({date: {$lte: ${lastDay}} }).populate('saloon').populate('film').exec()`);
    return actualShowings;
  }

  getFilmsFromShowings() {
    this.showListForSeveralDaysFromToday(2).then(data => {
      this.actualShowings = data;
      // for (let i = 0; i < this.actualShowings.length; i++) {
      //   let showing = this.actualShowings[i];
      //   let date = new Date(showing.date);
      //   showing.date = date.toISOString().slice(0,10);
      // }

      this.actualFilms = [];
      let actualFilm = '';
      console.log( this.actualShowings);
      for (let i = 0; i < this.actualShowings.length; i++) {
        let film = this.actualShowings[i].film;
        console.log(film);
        actualFilm = new Film(film);
        this.actualFilms.push(actualFilm);
      }

      this.actualFilms = this.actualFilms.filter((film, index, self) =>
        index === self.findIndex((t) => (
          t._id === film._id
        ))
      )      
      this.render();
    });
  }

}