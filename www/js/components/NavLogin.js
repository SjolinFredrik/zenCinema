class NavLogin extends Component {

  constructor() {
    super();
    this.addEvents({
      'click .login-btn': 'login'
    });
    this.loggedIn = false;
  }

  async login(e) {
    e.preventDefault();

    let email = this.baseEl.find('.email-login-input').val();
    let password = this.baseEl.find('.password-login-input').val();

    let login = new Login({
      email: email,
      password: password
    });

    let result = await login.save();

    if (result.loggedIn) {
      this.loggedIn = true;
      this.render();
    }
  }

}