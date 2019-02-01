class FilmPage extends Component {

  constructor() {
    super();
    this.addRoute(`/film-to-book`);
  }

  mount() {
    this.filmId = App.filmId;
    this.content = new FilmPageContent(this.filmId);
    this.render();
  }

}