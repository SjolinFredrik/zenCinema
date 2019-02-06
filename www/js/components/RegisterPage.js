class RegisterPage extends Component {

  constructor() {
    super();
    this.addRoute('/register', 'Register');
    this.addEvents({
      'click .saveNewUser-btn': 'saveUser'
    });
  }
  saveUser() {    
    User.createUser();
  };
}