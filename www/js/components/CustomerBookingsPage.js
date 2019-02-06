class CustomerBookingsPage extends Component {

  constructor() {
    super();
    this.addRoute('/mina-bokningar', 'Mina bokningar');
    this.appendBookings();
  }

  async appendBookings() {
    let user = await Login.find();
    if (!user.loggedIn) {
      console.log('Inte inloggad')
    }
    else {
      console.log('Inloggad')
      let userId = user.user._id;

      let test = await User.find(`.findOne({_id: '${userId}'}).populate('bookings').exec()`);
      console.log(test);
    }
    
  }
}