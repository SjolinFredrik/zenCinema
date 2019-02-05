class NavLogin extends Component {

  constructor() {
    super();
    this.addEvents({
      'click .login-btn': 'login'
    });
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

    console.log(result.loggedIn);
  }
}