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

  static async getMyData() {
    let myData = {
      saloon: this.saloon,
      film: this.film,
      date: this.date,
      time: this.time
    }
    return myData;
  }

  // async showMe() {
  //   await this.getMyData;
  //   this.render();
  // }
}