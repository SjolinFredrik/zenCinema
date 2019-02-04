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
    let showings = await Showing.find(`.find().populate('film').populate('saloon').exec()`);

    let filmShowings = [];
    for (let i = 0; i < showings.length; i++) {
      let showing = showings[i];
      if (showing.film._id === filmId) {
        let showingObj = new Showing(showing);
        filmShowings.push(showingObj);
      }
      else {
        continue;
      }
    }
    return filmShowings;
  }

  async showFilmInfo(filmId) {
    let film = await Film.find(this.filmId);
    return film;
  }
}
