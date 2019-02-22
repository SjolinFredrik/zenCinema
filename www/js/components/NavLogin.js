class NavLogin extends Component {

  constructor(parent) {
    super();
    this.addEvents({
      'click .login-btn': 'login',
      'click .logout-btn': 'logout',
      'click .new-account-btn': 'createRegisterForm'
    });
    this.loggedIn = false;
    this.checkLogin();
    this.parent = parent;
    console.log(this.parent);
  }
  createRegisterForm() {
this.parent.registerForm = new RegisterForm();
this.render();
this.parent.render();


  }
  async checkLogin() {
    let result = await Login.find();
    if (result.loggedIn) {
      this.loggedIn = true;
      this.loggedInUser = result.user;
      Store.loggedInUser = this.loggedInUser;
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
      Store.loggedInUser = this.loggedInUser;
      console.log(Store.loggedInUser);
      this.parent.render();
      
      this.render();
    }
  }

  async logout() {
    let loginObj = new Login();
    await loginObj.delete();
    this.loggedIn = false;
    window.location.href = 'http://localhost:3005/';
    Store.loggedInUser = undefined;
    this.render();
  }

}