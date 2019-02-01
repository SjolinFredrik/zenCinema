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

  static get dateToString() {
    return this.date = new Date(this.date).toDateString();
  }
}