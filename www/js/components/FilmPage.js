class FilmPage extends Component {

  constructor(filmId) {
    super();
    this.addRoute(`/film/${filmId}`);
    this.filmId = filmId;
  }

  async showingsPopulatedFilms() {
    let showings = await Showing.find();
    console.log(showings);
    // for (let i = 0; i < showings.length; i++) {
    //   let showing = showings[i];
    //   let showingObj = new Showing(showing);
    //   console.log(showingObj, 'I am showing');
    //   console.log(showingObj.film);
    // }
    this.filmShowings = [];
    for (let i = 0; i < showings.length; i++) {
      let showing = showings[i];
      if (showing.film === '5c4af4448c106c1bac7b3df4') {
        let showingObj = new Showing(showing);
        this.filmShowings.push(showingObj);
      }
      else {
        continue;
      }
      console.log(this.filmShowings);
    }
  }

}