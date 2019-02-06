class FilmPage extends Component {

  constructor() {
    super();
    this.addRoute(`/film`);
  }

  mount() {
    let filmId = window.localStorage.getItem('filmId');
    this.content = new FilmPageContent(filmId);
    this.render();
  }

}