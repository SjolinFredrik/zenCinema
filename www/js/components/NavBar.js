class NavBar extends Component {

  constructor() {
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Logga in', '/login'),
      new NavItem('Registrera Användare', '/register')


    ];
    this.navLogins = new NavLogin();

    this.addEvents({
      'click .loginUser-btn': 'newLogin'
    });
  }
  newLogin() {
    let email = this.baseEl.find('.email-login-input').val();
    let password = this.baseEl.find('.password-login-input').val();;
    Login.loginUser(email, password);

  }
}