class Booking extends Component {

  constructor(data) {
    super();
    this.customer = data.customer;
    this.show = data.show;
    this.seats = data.seats;
  }

  static async saveBooking(customer, showing, seats) {
    let booking = new Booking({
      "customer": customer,
      "show": showing,
      "seats": seats
    });

    return (await booking.save());

  }
}