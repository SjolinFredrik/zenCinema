class FilmPageContent extends Component {
  constructor(filmId) {
    super();
    this.filmId = filmId;
    this.showFilmInfo(this.filmId).then(film => {
      this.film = film;
      this.trailer = new Trailer(film);
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
    return await Showing.find(`.find({date: {$gte: ${today}}, film: '${filmId}' }).populate('saloon').populate('film').exec()`);    
  }

  async showFilmInfo(filmId) {
    return await Film.find(filmId);
  }
}
