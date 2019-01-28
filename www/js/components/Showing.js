class Showing extends Component {
  constructor() {
    super();
    this.getMyData;
  }

  static async getMyData() {
    let myData = {
      salon: this.salon,
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