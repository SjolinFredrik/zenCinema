class Booking extends Component {

  constructor(data) {
    super();
    this.customer = data.customer;
    this.show = data.show;
    this.seats = data.seats;
    this.bookingNumber = data.bookingNumber
  }

  static async saveBooking(customer, showing, seats, bookingNumber) {
    let booking = new Booking({
      "customer": customer,
      "show": showing,
      "seats": seats,
      "bookingNumber": bookingNumber
    });
    return await booking.save();
  }
}