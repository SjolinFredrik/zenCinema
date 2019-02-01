class Showing extends Component {
  constructor(data) {
    super();
    this.getMyData;
    this._id = data._id;
    this.film = data.film;
    this.time = data.time;
    this.date = data.date;
    this.saloon = data.saloon;
  }

  get dateToString() {
    return new Date(this.date).toString().slice(0,10);
  }
}