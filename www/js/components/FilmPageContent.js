class FilmPageContent extends Component {
  constructor(filmId) {
    super();
    this.filmId = filmId;
    console.log('I am filmpage!', this.filmId);
    this.showingsPopulatedFilms(this.filmId).then((data) => {
      this.filmShowings = data;
      console.log(this.filmShowings);
      this.render();
    });
  }

  async showingsPopulatedFilms(filmId) {
    let showings = await Showing.find(`.find().populate('film').populate('saloon').exec()`);
    console.log(showings);

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
}
