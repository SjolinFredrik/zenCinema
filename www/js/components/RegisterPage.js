class RegisterPage extends Component {

  constructor() {
    super();
    this.addRoute('/register', 'Register');
    this.addEvents({
      'click .saveNewUser-btn': 'saveUser'
    });
  }
  saveUser() {
    console.log('test 1');
    
    User.createUser();

    console.log('test 2');
    
  };
}