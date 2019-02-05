class Booking extends Component {

  constructor(data) {
    super();
    this.customer = data.customer;
    this.show = data.show;
    this.seats = data.seats;
    this.bookingNumber = data.bookingNumber;
    this.totalCost = data.totalCost;
  }
}