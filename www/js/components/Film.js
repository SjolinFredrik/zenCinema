class Film extends Component {
  constructor(data) {
    super();
    this.title = data.title;
    this.productionCountries = data.productionCountries;
    this.productionYear = data.productionYear;
    this.length = data.length;
    this.genre = data.genre;
    this.distributor = data.distributor;
    this.language = data.language;
    this.subtitles = data.subtitles;
    this.directors= data.directors;
    this.actors = data.actors;
    this.description = data.description;
    this.images = data.images;
    this.youtubeTrailers = data.youtubeTrailers;
    this.reviews = data.reviews;
    this._id = data._id;

    this.addEvents({
      'click .a-over': 'catchFilmId'
    });
  }

  catchFilmId() {
    App.filmId = this._id;
    return App.filmId;
  }




}