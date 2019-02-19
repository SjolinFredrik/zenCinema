class Message extends Component {
  constructor(type, data) {
    super();
    this.type = type;
    this.data = data;
    this.chooseHeadingAndText;
    this.addEvents( {
      'click .close-message': 'removeMe'
    });
    
  }

  get chooseHeadingAndText() {
    if (this.type === 'newBooking') {
      this.heading = 'Tack för din bokning!';
      this.text = "Se info nedan för din bokning:";
      this.showInfo().then(data => {
        this.filmTitle = data[0].film.title;
        this.time = data[0].time;
        this.date = new Date(data[0].date).toLocaleString('sv-SE', {month: 'long', day: 'numeric', year: 'numeric'});
        this.saloon = data[0].saloon.name;
        this.render();
      });
    }
    if (this.type === 'newUser') {
      this.heading = 'User har skapat';
      this.text = 'Hitta på någon text, var snälla!'
    }
    if(this.type === 'mustLogIn') {
      this.heading = 'User utloggad!';
      this.text = 'Du måste logga in innan bokning!';
    }
    if(this.type === 'chooseSeats') {
      this.heading = 'Fel';
      this.text = 'Vänligen välj platser.';
    }
    if(this.type === 'chooseTickets') {
      this.heading = 'Fel';
      this.text = 'Vänligen välj biljetter.';
    }
  }

  async showInfo() {
    let show = this.data.show;
    let showData = await Showing.find(`.find({_id: '${show}'}).populate('film').populate('saloon').exec()`);
    return showData;
  }

  removeMe() {
    this.baseEl.remove();
    // window.location.assign('/');
    this.render();
  }
}