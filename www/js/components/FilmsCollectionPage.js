class FilmsCollectionPage extends Component {

  constructor(){
    super();
    this.addRoute('/films', 'Filmer'); 
    this.loadInFilms().then(filmPosters => {
      this.filmPosters = filmPosters;
      this.render();
    });
    
  }
  async loadInFilms(){
    let allFilms = await Film.find();
    let allFilmPosters = [];
    for(let i = 0; i < allFilms.length; i++){
      let film = allFilms[i];
      let filmPoster = new FilmPoster(film._props);
      // Object.assign({}, film);

      allFilmPosters.push(filmPoster);
      // console.log(allFilmPosters, 'filmposter');
      
    }
    return allFilmPosters;
  }
}