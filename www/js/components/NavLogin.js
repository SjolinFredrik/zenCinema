class NavLogin extends Component {

  constructor() {
    super();
    this.addEvents({
      'click .login-btn': 'login',
      'click .logout-btn': 'logout'
    });
    this.loggedIn = false;
    this.checkLogin();
  }

  async checkLogin(){
    let result = await Login.find();
    if (result.loggedIn) {
      this.loggedIn = true;
      this.loggedInUser = result.user;
      this.render();
    }
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
      this.loggedInUser = result.user;
      this.render();
    }
  }

  async logout(){
    let loginObj = new Login();
    await loginObj.delete();
    this.loggedIn = false;
    window.location.href = 'http://localhost:3005/'
    this.render();
  }

}