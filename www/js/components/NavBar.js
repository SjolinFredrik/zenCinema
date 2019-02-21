class NavBar extends Component {

  constructor() {
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Filmer', '/films')

    ];
    this.navLogins = new NavLogin();
  }

}