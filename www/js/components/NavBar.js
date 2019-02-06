class NavBar extends Component {

  constructor() {
    super();
    this.navItems = [
      new NavItem('Start', '/')
      //new NavItem('Boka', '/booking'),
      //new NavItem('Registrera Användare', '/register')
    ];
    this.navLogins = new NavLogin();
  }

}