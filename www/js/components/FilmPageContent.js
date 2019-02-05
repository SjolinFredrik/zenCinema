class FilmPageContent extends Component {
  constructor(filmId) {
    super();
    this.filmId = filmId;
    this.showFilmInfo(this.filmId).then(data => {
      this.film = new Film(data);
      this.render();
    })
    .then(this.showingsPopulatedFilms(this.filmId).then((data) => {
      this.filmShowings = data;
      this.render();
    })
    );
    
  }

  async showingsPopulatedFilms(filmId) {
    let today = new Date().getTime();
    let showings = await Showing.find(`.find({date: {$gte: ${today}}, film: '${filmId}' }).populate('saloon').populate('film').exec()`);


    let filmShowings = [];
    for (let i = 0; i < showings.length; i++) {
      let showing = showings[i];
      let showingObj = new Showing(showing);
        filmShowings.push(showingObj);
    }
    return filmShowings;
  }

  async showFilmInfo(filmId) {
    let film = await Film.find(filmId);
    return film;
  }
}
