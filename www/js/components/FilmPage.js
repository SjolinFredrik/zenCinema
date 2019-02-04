class FilmPage extends Component {

  constructor() {
    super();
    this.addRoute(`/film`);
  }

  mount() {
    if (App.filmId) {
      this.filmId = App.filmId;
      this.content = new FilmPageContent(this.filmId);
      this.render();
    }
    else {
      return;
    }
  }

}