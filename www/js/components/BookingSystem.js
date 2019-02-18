class BookingSystem extends Component {
  constructor(showingId) {
    super();
    this.showingId = showingId;
    this.ticketSelection = new TicketSelection();
    this.loggedInUser = window.localStorage.getItem('loggedInUser');
    this.showingData(this.showingId)
      .then(data => {
        this.showing = data;
        this.showingDate = new Date(this.showing.date).toLocaleString('sv-SE', { weekday: 'short', month: 'long', day: 'numeric' });
        this.saloon = this.showing.saloon;
        this.film = this.showing.film;
        this.time = this.showing.time;
      })
      .then(() => {
        return Promise.all([this.findSaloonSchema(this.saloon), this.findFilm(this.film), this.findTakenSeats()]).then(data => {
          const saloonSchemaData = data[0];
          const filmData = data[1];
          const takenSeats = data[2];

          this.saloonSchema = saloonSchemaData.seatsPerRow;
          this.film = filmData;
          this.takenSeats = takenSeats;
          this.seatsGrid = new SeatsGrid(this.saloonSchema, this.takenSeats);
          this.render();
        });
      });
    this.addEvents({
      'click .save-booking': 'saveBooking'
    });
  }

  async showingData(showingId) {
    let showing = await Showing.find(showingId);
    return showing;
  }

  async findSaloonSchema(saloonId) {
    return await Saloon.find(saloonId);
  }

  async findFilm(filmId) {
    return await Film.find(filmId);
  }

  async findTakenSeats() {
    let bookings = await Booking.find(`.find({show: '${this.showingId}'}).populate('show').exec()`);
    let takenSeats = [];
    for (let i = 0; i < bookings.length; i++) {
      let booking = bookings[i];
      let seats = booking.seats;
      takenSeats = takenSeats.concat(seats);
    }
    return takenSeats;
  }

  async generateBookingNumber() {
    let bookings = await Booking.find(`.find().limit(1).sort({$natural: -1})`);
    let saltArray = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    saltArray = saltArray.split("");
    let salt = '';
    let lastBookingNumber = '';
    for (let i = 0; i <= 3; i++) {
      let letter = saltArray[Math.floor(Math.random() * saltArray.length)];
      salt = salt + letter;
    }
    let number = 0;
    if (bookings.length === 0) {
      number = salt + 1;
    }
    if (bookings.length > 0) {
      lastBookingNumber = bookings[0].bookingNumber;
      lastBookingNumber = parseInt(lastBookingNumber.split("").splice(4));
      number = salt + (lastBookingNumber + 1);
    }
    return number;
  }

  async totalCost() {
    let totalCost = 0;
    let ticketType = '';
    let ticketsCost = 0;
    for (let i = 0; i < this.ticketSelection.tickets.length; i++) {
      ticketType = this.ticketSelection.tickets[i];
      let ticketsQuantity = ticketType.baseEl.find('input').val();
      ticketsCost = parseInt(ticketType.price) * ticketsQuantity;
      totalCost = totalCost + ticketsCost;
    }
    return totalCost;
  }

  async saveBooking() {
    if (this.loggedInUser) {
      let totalCost = await this.totalCost();
      let number = await this.generateBookingNumber();

      let customer = await Login.find();
      let customerId
      if (!customer.loggedIn) {
        customerId = '5c51a472fe47141770028de9'
      }
      else {
        customerId = customer.user._id;
      }


      this.newBooking = new Booking({
        "customer": customerId,
        "show": this.showing._id,
        "seats": Store.chosenSeats,
        "bookingNumber": number,
        "totalCost": totalCost + " SEK"
      });

      await this.newBooking.save();

      this.message = new Message('newBooking', this.newBooking);
      this.render();
      this.newBooking = '';
    }

  }

}