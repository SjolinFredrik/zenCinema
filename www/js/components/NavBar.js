class NavBar extends Component {

  constructor(){
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Logga in', '/login'),
      new NavItem('Boka', '/booking')
     
    ];
  }

}