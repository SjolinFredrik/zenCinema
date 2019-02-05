class NavLogin extends Component {

  constructor() {
    super();
    this.addEvents({
      'click .login-btn': 'login'
    });
  }

  login(e) {
    e.preventDefault();
    let email = this.baseEl.find('.email-login-input').val();
    let password = this.baseEl.find('.password-login-input').val();
  }
}