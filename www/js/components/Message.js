class Message extends Component {
  constructor(type, data) {
    super();
    this.type = type;
    this.data = data;
    this.chooseHeadingAndText;
  }

  get chooseHeadingAndText() {
    if (this.type === 'newBooking') {
      this.heading = 'Tack för din bokning!';
      this.text = "Se info sin bokning nedan:";
    }
    if (this.type === 'newUser') {
      this.heading = 'User har skapat';
      this.text = 'Hitta på någon text, var snälla!'
    }
  }
}