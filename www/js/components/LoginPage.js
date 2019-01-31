class LoginPage extends Component {

  constructor() {
    super();
    this.addRoute('/login', 'Login');
    this.addEvents({
      'click .login-btn ': 'saveLogin'
    });
  }

  saveLogin() {
    let email = this.baseEl.find('.email-login-input').val();
    let password = this.baseEl.find('.password-login-input').val();;
    Login.loginUser(email, password);
  }
}