class Booking extends Component {

  constructor(data) {
    super();
    this.customer = data.customer;
    this.show = data.show;
    this.seats = data.seats;
    this.bookingNumber = data.bookingNumber;
    console.log(this.show, 'Show for last booking');
  }

  // mount() {
  //   this.getShowInfo().then((data) => {
  //     this.filmTitle = data.title;

  //   });
  // }

  async getShowInfo(showId) {
    console.log(showId);
    let info = await Showing.find(`.find(showId)`);
    console.log(info);
    return info;
  }
}