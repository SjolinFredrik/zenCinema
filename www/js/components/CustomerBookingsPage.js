class CustomerBookingsPage extends Component {

  constructor() {
    super();
    this.addRoute('/mina-bokningar', 'Mina bokningar');
    this.films = [];
    this.findBookings();
    
  }

  async findBookings() {
    let user = await Login.find();
    if (!user.loggedIn) {
      console.log('Inte inloggad')
    }
    else {
      console.log('Inloggad')
      let userId = user.user._id;

      let customer = await User.find(`.findOne({_id: '${userId}'}).populate('bookings').exec()`);
      let customerBookings = customer.bookings;

      for (let booking of customerBookings) {
        let showId = booking.show;
        let showing = await Showing.find(`.findOne({_id: '${showId}'}).populate('film').exec()`);

        let filmTitle = showing.film.title;
        this.films.push(filmTitle);
        console.log(this.films);
      }
      this.appendBookings();
    }
    
  }
  appendBookings() {
    for(let film of this.films) {
      this.baseEl.find('.film-title').append(`<div> ${film}</div>`);
    }

  }


}